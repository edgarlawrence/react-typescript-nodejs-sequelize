const Cart = require("../model/cart");
const History = require("../model/history");
const Product = require("../model/product");
const User = require("../model/user");

History.belongsTo(Cart),
  {
    foreignKey: {
      name: "cartId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };

Cart.hasMany(History, {
  foreignKey: {
    name: "cartId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

History.belongsTo(Product),
  {
    foreignKey: {
      name: "historyId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };

Product.hasMany(History, {
  foreignKey: {
    name: "historyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

const addHistory = async (req, res) => {
  await History.findByPk(req.body.cartId, {
    include: [{ model: Cart, include: [Product] }],
  }).then((data) => {
    console.log(data);
    History.create({ data: data, usersId: 2 });
    res.status(200).json({ data: data });
  });
};

const getHistory = async (req, res) => {
  const history = await History.findAll({
    include: [{ model: Cart, include: [Product] }],
    where: { usersId: 1 },
  });

  for (const item of history) {
    item.cart.totalPrice += item.cart.product.price * item.cart.quantity;
  }

  res.json({ history: history });
};

const postHistory = async (req, res) => {
  await History.update({ paymentStatus: true }, { where: { id: req.body.id } })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error("Terjadi kesalahan:", err);
    });
  // datas.save();
  // res.status(200).json({ data123: datas });
};

const removeHistory = async (req, res) => {
  const { id } = req.params;

  const history = await History.findByPk(id);

  if (!history) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  await history.destroy();

  res.sendStatus(204);
};

module.exports = { getHistory, addHistory, postHistory, removeHistory };
