const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(express);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

function notifications() {
  // io.on("notification", (socket) => {
  //   socket.emit("new_notification", {
  //     title: "hellow world",
  //   });
  // });
  io.emit("message", { type: "new-message", text: "Hello, World!" });
}

module.exports = notifications;
