const { getCallsToPoliceService } = require("../services/callsToPoliceService");

const callsController = async (req, res) => {
  try {

    const since = req.query.since || new Date(Date.now() - (3 + 5) * 1000 * 60 * 60);
    console.log(since)
    const crimes = await getCallsToPoliceService(since);
    res.json(crimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = callsController;
