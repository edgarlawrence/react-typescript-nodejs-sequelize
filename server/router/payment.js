const express = require("express");

const { addPayment, getPayment } = require("../controller/payment");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/", verifyToken, addPayment);
router.get("/", verifyToken, getPayment);

module.exports = router;
