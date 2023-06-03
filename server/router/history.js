const express = require("express");

const {
  addHistory,
  getHistory,
  postHistory,
  removeHistory,
} = require("../controller/history");
const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/", addHistory);
router.post("/postHistory", postHistory);
router.get("/", getHistory);
router.delete("/:id", removeHistory);

module.exports = router;
