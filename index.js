const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const sliderRoute = require("./app/routes/slider.router");
const categoriesRoute = require("./app/routes/category.router");
const productRouter = require("./app/routes/product.router");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });

app.use(express.json()); // Sử dụng middleware để parse dữ liệu JSON

app.use(cors());
app.use(morgan("common"));

app.use("/api/categories", categoriesRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/categories", productRouter);
app.use("/api/products", productRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
