var express = require("express");
var router = express.Router();

/* GET crimes listing. */
router.get("/", function (req, res, next) {
  res.json({
    type: "Break and Enter",
    date: "2024-07-06T22:18:00Z",
    lat: 43.65123,
    lon: -79.38123,
  });
});

module.exports = router;
