const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Định nghĩa endpoint POST
router.post("/:categoryId/products", productController.createProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
