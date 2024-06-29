import sequelize from "./database.js";
import User from "../models/model.user.js";
await sequelize.sync({ force: true });
