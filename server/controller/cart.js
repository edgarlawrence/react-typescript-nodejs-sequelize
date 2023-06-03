const Cart = require("../model/cart");
const Product = require("../model/product");

Cart.belongsTo(Product),
  {
    foreignKey: {
      name: "productId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };

Product.hasMany(Cart, {
  foreignKey: {
    name: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

const addToCart = async (req, res, next) => {
  const { productId, quantity, totalPrice } = req.body;

  Product.findByPk(productId)
    .then((product) => {
      console.log(product);
      if (product) {
        return Cart.findOne({ where: { productId } }).then((cartItem) => {
          if (cartItem) {
            cartItem.quantity += quantity * cartItem.price;
            cartItem.quantity += quantity;
            return cartItem.save();
          } else {
            return Cart.create({
              productId,
              quantity,
              totalPrice,
              userId: req._id,
            });
          }
        });
      } else {
        throw new Error(`Product with ID ${productId} not found`);
      }
    })
    .catch((error) => {
      console.error(error);
      // res
      //   .status(500)
      //   .send("An error occurred while adding the product to the cart");
    });

  res.status(200).send("Product added to cart successfully");
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req._id },
      include: [{ model: Product }],
    });

    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.totalPrice += item.product.price * item.quantity;
      item.totalPrice = totalPrice;
      item.save();
    }

    res.json({ cart, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.findByPk(id);

  if (!cart) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  await cart.destroy();

  res.sendStatus(204);
};

module.exports = { getCart, addToCart, removeFromCart };
