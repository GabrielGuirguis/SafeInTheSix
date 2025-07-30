const express = require("express");
const crimesController = require("../controllers/crimeController");
const crimesHeatmapController = require("../controllers/crimesHeatmapController");

const router = express.Router();

router.get("/nearby", crimesController);
router.get("/heatmap", crimesHeatmapController);

module.exports = router;
