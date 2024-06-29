import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: console.log,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export default sequelize;
