const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const sliderRoute = require("./app/routes/slider.router");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });


app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));


app.use("/api/slider", sliderRoute);


app.listen(3000, () => {
    console.log("Sever is running...");
});