const express = require("express");

const { addToCart, getCart, removeFromCart } = require("../controller/cart");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;
