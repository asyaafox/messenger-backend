import sequelize from "./database.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import Members from "../models/member.model.js";

User.hasMany(Members, { foreignKey: "UserId" });
Chat.hasMany(Members, { foreignKey: "ChatId" });
Members.belongsTo(User, { foreignKey: "UserId" });
Members.belongsTo(Chat, { foreignKey: "ChatId" });

Chat.hasMany(Message, { foreignKey: "ChatId" });
User.hasMany(Message, { foreignKey: "UserId" });
Message.belongsTo(Chat, { foreignKey: "ChatId" });
Message.belongsTo(User, { foreignKey: "UserId" });

await sequelize.sync({ force: true });
