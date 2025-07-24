const express = require("express");
const getCrimesController = require("../controllers/crimeController");

const router = express.Router();

router.get("/nearby", getCrimesController);

module.exports = router;
