import { DataTypes, Model } from "sequelize";
import sequelize from "../core/database.js";
import { v4 as uuid } from "uuid";
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: true }
);

export default User;
