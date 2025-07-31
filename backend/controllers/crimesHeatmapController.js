const { getCrimesHeatmap } = require("../services/crimesService");

const crimesHeatmapController = async (req, res) => {

    const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7
    const since = req.query.since || new Date(Date.now() - millisecondsInWeek)

    try {
        const heatmapData = await getCrimesHeatmap(since);
        res.json(heatmapData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = crimesHeatmapController