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
    getProducts: async (req, res) => {
        try {
            const { offset, sortBy, order, special } = req.query;

            // Xử lý các tham số và áp dụng vào truy vấn
            const query = Product.find();
            if (offset) {
                query.skip(Number(offset));
            }
            if (sortBy) {
                query.sort({ [sortBy]: order === "asc" ? 1 : -1 });
            }
            if (special) {
                query.where({ special: true });
            }

            // Thực hiện truy vấn và trả về kết quả
            const products = await query.exec();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price, image, description, special, category } = req.body;

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, price, image, description, special, category },
                { new: true }
            );

            if (!updatedProduct) {
                throw new Error("Product not found");
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                throw new Error("Product not found");
            }

            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};


module.exports = productController;
