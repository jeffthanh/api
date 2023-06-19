const categories = require("../models/categorie.model");
const categoriesController = {
    //add 
    async addCategories(req, res) {
        try {
            const newCategories = new categories(req.body);
            // Kiểm tra xem ID đã tồn tại hay chưa
            const existingCategories = await categories.findOne({ name: newCategories.name });
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
            const category = await categories.findById(categoryId).populate("products");
            if (!category) {
                throw new Error("Category not found");
            }
            res.status(200).json(category.products);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};



module.exports = categoriesController;