const express = require("express");
const router = express.Router();

const sliderController = require("../controllers/slider.controller")

router.post("/", sliderController.addSlider);
router.get("/", sliderController.getAllSlider);

module.exports = router;