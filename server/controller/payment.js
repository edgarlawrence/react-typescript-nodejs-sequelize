const Cart = require("../model/cart");
const Product = require("../model/product");
const Payment = require("../model/payment");

Payment.belongsTo(Cart),
  {
    foreignKey: {
      name: "cartId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };

Cart.hasMany(Payment, {
  foreignKey: {
    name: "cartId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Payment.belongsTo(Product),
  {
    foreignKey: {
      name: "productId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };

Product.hasMany(Payment, {
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

const addPayment = (req, res) => {
  req._id;
  let data = {
    cartId: 1,
    productId: 1,
    userId: req._id,
  };
  Payment.create(data);
  res.json(data);
};

const getPayment = async (req, res) => {
  req._id;
  const payments = await Payment.findAll({
    where: { userId: req._id },
    include: [{ model: Cart }, { model: Product }],
  });

  res.json(payments);
};

module.exports = { addPayment, getPayment };
