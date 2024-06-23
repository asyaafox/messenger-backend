// const { DataTypes } = require("sequelize");
// const sequelize = require("../database.js");

// const User = sequelize.define("User", {});

import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js";

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "User" }
);

await sequelize.sync({ force: false });

export default User;
