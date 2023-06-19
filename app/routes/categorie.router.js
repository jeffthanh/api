const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories.controller");

router.post("/", categoriesController.addCategories);
router.get("/", categoriesController.getAllCategories);
router.get("/:id/products", categoriesController.getCategoryProducts);


module.exports = router;
