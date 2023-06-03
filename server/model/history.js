const db = require("../config/config");
const Sequelize = require("sequelize");

const DataTypes = Sequelize;

const History = db.define("history", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  paymentStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  usersId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

db.sync();

module.exports = History;
