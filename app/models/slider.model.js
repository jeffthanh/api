const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
});

const slider = mongoose.model("slider", sliderSchema);

module.exports = slider;