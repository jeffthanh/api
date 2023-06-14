const slider = require("../models/slider.model");

const sliderController = {
    //add 
    async addSlider(req, res) {
        try {
            const newSlider = new slider(req.body);
            // Kiểm tra xem ID đã tồn tại hay chưa
            const existingSlider = await slider.findOne({ name: newSlider.name });
            if (existingSlider) {
                throw new Error("Slider with the same name already exists");
            }
            const savedSlider = await newSlider.save();
            res.status(200).json(savedSlider);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getAllSlider(req, res) {
        try {
            const sliders = await slider.find();
            res.status(200).json(sliders);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


module.exports = sliderController;