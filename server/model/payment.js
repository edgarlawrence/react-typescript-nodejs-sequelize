const db = require("../config/config");
const Sequelize = require("sequelize");

const DataTypes = Sequelize;

const Payment = db.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

db.sync();

module.exports = Payment;
