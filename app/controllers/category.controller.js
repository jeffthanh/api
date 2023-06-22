const categories = require("../models/category.model");
const product = require("../models/product.model")
const categoriesController = {
    //add 
    async addCategories(req, res) {
        try {
            const newCategories = new categories(req.body);
            // Kiểm tra xem ID đã tồn tại hay chưa
            const existingCategories = await categories.findOne({ id: newCategories.id });
            if (existingCategories) {
                throw new Error("slider with the same name already exists");
            }
            const savedCategories = await newCategories.save();
            res.status(200).json(savedCategories);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getAllCategories(req, res) {
        try {
            const categorie = await categories.find();
            res.status(200).json(categorie);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getCategoryProducts: async (req, res) => {
        try {
            const categoryId = req.params.id;

            // Tìm danh mục theo categoryId
            const category = await categories.findOne({ id: categoryId });

            if (!category) {
                throw new Error("Category not found");
            }

            // Tìm sản phẩm trong danh mục
            const products = await product.find({ category: category.id });

            // Trả về thông tin các sản phẩm trong danh mục
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};



module.exports = categoriesController;