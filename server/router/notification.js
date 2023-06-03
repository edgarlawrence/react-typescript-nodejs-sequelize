const express = require("express");

const notifications = require("../controller/notification");

const io = require("socket.io");
const socket = io();

const router = express.Router();

// router.post("/", notifications);
router.get("/", function (req, res, next) {
  socket.emit("message", { type: "new-message", text: "Hello, World!" });
});

module.exports = router;
