const express = require("express");
const {
  upload,
  getAllData,
  createData,
  findDataBySearch,
  getDataById,
} = require("../controller/product");

const { verifyToken } = require("../middleware/VerifyToken");

const router = express.Router();

router.get("/", verifyToken, getAllData);
router.get("/:id", getDataById);
router.get("/product/search", findDataBySearch);
router.post("/", upload, createData);

module.exports = router;
