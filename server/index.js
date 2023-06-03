const express = require("express");
const db = require("./config/config");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const product = require("./router/product");
const cart = require("./router/cart");
const history = require("./router/history");
const payment = require("./router/payment");
const auths = require("./router/auth");

const { Server } = require("socket.io");
const http = require("http");
const notification = require("./router/notification");

const server = http.createServer(express);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
dotenv.config();

try {
  db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(auths);
app.use("/notification", notification);
app.use("/product", product);
app.use("/history", history);
app.use("/cart", cart);
app.use("/payment", payment);
app.use("/Images", express.static(path.join(__dirname, "./Images")));

app.listen(5000, () => console.log("Server running at port 5000"));
