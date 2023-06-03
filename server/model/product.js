const db = require("../config/config");
const Sequelize = require("sequelize");
const Cart = require("./cart");

const Datatypes = Sequelize;

const Product = db.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    category: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    price: {
      type: Datatypes.INTEGER,
    },
    images: {
      type: Datatypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Cart.associate = (models) => {
//   Product.hasMany(Cart, {
//     foreignKey: {
//       name: "productId",
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//   });
// };

db.sync();

module.exports = Product;
