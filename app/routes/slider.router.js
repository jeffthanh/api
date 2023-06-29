const express = require("express");
const router = express.Router();

const sliderController = require("../controllers/slider.controller")

router.post("/", sliderController.addSlider);
router.get("/", sliderController.getAllSlider);
// Định nghĩa endpoint PUT để sửa slider dựa trên ID
router.put("/:id", sliderController.updateSlider);
router.delete("/:id", sliderController.deleteSlider);

module.exports = router;