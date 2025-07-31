const express = require("express");
const callsController = require("../controllers/callsController")

const router = express.Router();

router.get("/recent", callsController);


module.exports = router;
