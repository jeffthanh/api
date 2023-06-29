const slider = require("../models/slider.model");

const sliderController = {
    //add 
    async addSlider(req, res) {
        try {
            const newSlider = new slider(req.body);
            // Kiểm tra xem ID đã tồn tại hay chưa
            const existingSlider = await slider.findOne({ id: newSlider.id });
            if (existingSlider) {
                throw new Error("slider with the same name already exists");
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
    },

    updateSlider: async (req, res) => {
        try {
            const sliderId = req.params.id; // Lấy giá trị id từ URL
            const updatedData = req.body; // Lấy dữ liệu cập nhật từ body request

            // Tìm slider theo id và cập nhật dữ liệu
            const Slider = await slider.findByIdAndUpdate(
                sliderId,
                { $set: updatedData },
                { new: true }
            );

            if (!Slider) {
                throw new Error("Slider not found");
            }

            res.status(200).json(Slider);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteSlider: async (req, res) => {
        try {
            const { id } = req.params;

            // Tìm slider theo ID và xóa
            const deletedSlider = await slider.findByIdAndRemove(id);

            if (!deletedSlider) {
                throw new Error("Slider not found");
            }

            res.status(200).json({ message: "Slider deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};



module.exports = sliderController;