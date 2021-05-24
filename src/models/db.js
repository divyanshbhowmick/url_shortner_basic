var { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
  dialect: "mysql",
  username: "root",
  password: "root",
  database: "url_shortner",
  host: "localhost",
  logging: true,
  port: 3306,
});

const URLs = db.define("urls", {
  id: {
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  code: {
    type: DataTypes.STRING(7),
    unique: true,
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  db,
  URLs,
};
