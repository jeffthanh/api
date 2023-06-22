const Product = require("../models/product.model");
const Category = require("../models/category.model");

const productController = {
    createProduct: async (req, res) => {
        try {
            // Lấy thông tin sản phẩm từ body request
            const { id, name, price, image, description, categoryId } = req.body;

            // Kiểm tra xem danh mục tồn tại hay không
            const category = await Category.findOne({ id: categoryId });
            if (!category) {
                throw new Error("Category not found");
            }

            // Tạo một sản phẩm mới
            const newProduct = new Product({
                id,
                name,
                price,
                image,
                description,
                category: categoryId,
            });

            // Lưu sản phẩm vào cơ sở dữ liệu
            const savedProduct = await newProduct.save();

            // Liên kết sản phẩm với danh mục
            category.products.push(savedProduct._id);
            await category.save();

            res.status(200).json(savedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = productController;
