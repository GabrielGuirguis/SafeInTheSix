const { getCrimes } = require("../services/crimesService");

const crimesController = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const crimes = await getCrimes(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(radius)
    );
    res.json(crimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = crimesController;
