import { DataTypes, Model } from "sequelize";
import sequelize from "../core/database.js";

class Chat extends Model {}
Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Chatname: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: true }
);

export default Chat;
