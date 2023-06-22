const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: Number,

    },
    name: {
        type: String,

    },
    price: {
        type: Number,

    },
    image: {
        type: String,

    },
    description: {
        type: String,

    },
    category: {
        type: Number,
        ref: "Category",
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
