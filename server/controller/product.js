const Product = require("../model/product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "10000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("please insert your file");
  },
}).single("images");

const getAllData = async (req, res) => {
  try {
    console.log(req._id);
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 5;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 5) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }

    const tables = await Product.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.json({
      data: tables.rows,
      totalPage: Math.ceil(tables.count / 5),
    });
  } catch (err) {
    console.log(err);
  }
};

const createData = (req, res) => {
  let data = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    images: req.file.path,
  };
  if (!req.file) {
    return res.status(422).json({
      msg: "Please select an image to upload",
    });
  }
  Product.create(data);
  res.json(data);
};

const findDataBySearch = (req, res) => {
  Product.findAll({
    where: {
      [Op.and]: [
        {
          name: {
            [Op.like]: `%${req.query.name}`,
          },
        },
        {
          name: {
            [Op.like]: `%${req.query.name}`,
          },
        },
      ],
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDataById = async (req, res) => {
  try {
    const data = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  upload,
  getAllData,
  createData,
  findDataBySearch,
  getDataById,
};
