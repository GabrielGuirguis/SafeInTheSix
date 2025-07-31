const supabaseClient = require("../config/supabaseConfig");
const {redisClient, redisAvailable} = require("../config/redisConfig");

const getCrimes = async (lat, lng, radius) => {
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLng = Math.round(lng * 100) / 100;
  const cacheKey = `crimes:${roundedLat}:${roundedLng}`;

  if (redisAvailable) {
    try {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("cache hit");
        return JSON.parse(cached);
      }
    } catch (err) {
      console.error("redis get failed", err);
    }
  }

  const { data, error } = await supabaseClient.rpc("get_crimes_nearby", {
    lat: lat,
    lng: lng,
    radius: radius,
  });

  if (error) {
    console.error("Error calling get_crimes_nearby:", error);
    return null;
  }

  if (redisAvailable) {
    try {
      await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 * 15 });
    } catch (err) {
      console.error("Redis set failed", err)
    }
  }
  
  return data;
};

const getCrimesHeatmap = async (since) => {
  const { data, error } = await supabaseClient.rpc("get_crimes_density_since", {
    since
  });

  if (error) {
    console.error("Error calling get_crimes_density_since:", error);
    return null;
  }

  return data;
};

module.exports = { getCrimes: getCrimes, getCrimesHeatmap: getCrimesHeatmap }
