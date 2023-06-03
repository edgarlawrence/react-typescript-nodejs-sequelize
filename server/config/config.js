const sequelize = require("sequelize");

const db = new sequelize("ecommerce_apps", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
