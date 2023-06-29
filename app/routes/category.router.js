const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/category.controller");

router.post("/", categoriesController.addCategories);
router.get("/", categoriesController.getAllCategories);
router.get("/:id/products", categoriesController.getCategoryProducts);
router.delete("/:id", categoriesController.deleteCategory);

router.put("/:id", categoriesController.updateCategory);

module.exports = router;
