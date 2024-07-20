import sequelize from "./database.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import Members from "../models/member.model.js";

User.hasMany(Message, { foreignKey: "UserId" });
Message.belongsTo(User, { foreignKey: "UserId" });

Chat.hasMany(Message, { foreignKey: "ChatId" });
Message.belongsTo(Chat, { foreignKey: "ChatId" });

User.belongsToMany(Chat, { through: Members, foreignKey: "UserId" });
Chat.belongsToMany(User, { through: Members, foreignKey: "ChatId" });

await sequelize.sync({ force: true });
