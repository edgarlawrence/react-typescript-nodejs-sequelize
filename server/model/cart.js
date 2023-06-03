const db = require("../config/config");
const User = require("./user");
const Product = require("./product");
const Sequelize = require("sequelize");

const DataTypes = Sequelize;

const Cart = db.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

db.sync();

module.exports = Cart;
