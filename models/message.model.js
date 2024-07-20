import { DataTypes, Model } from "sequelize";
import sequelize from "../core/database.js";

class Message extends Model {}
Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    Text: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: true }
);

export default Message;
