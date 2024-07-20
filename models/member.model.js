import { DataTypes, Model } from "sequelize";
import sequelize from "../core/database.js";
import User from "./user.model.js";
import Chat from "./chat.model.js";

class Members extends Model {}
Members.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'Movies' would also wor
        key: "id",
      },
    },
    ChatId: {
      type: DataTypes.INTEGER,
      references: {
        model: Chat, // 'Actors' would also work
        key: "id",
      },
    },
  },
  { sequelize, timestamps: true }
);

export default Members;
