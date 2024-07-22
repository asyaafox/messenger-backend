import { DataTypes, Model } from "sequelize";
import sequelize from "../core/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
  },
  {
    modelName: "User",
    timestamps: true,
    freezeTableName: true,
  }
);

export default User;
