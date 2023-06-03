const express = require("express");

const { getUsers, Register, Login, Logout } = require("../controller/user");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);

module.exports = router;
