const supabaseClient = require("../config/supabaseConfig");
const redisClient = require("../config/redisConfig");

const getCrimes = async (lat, lng, radius) => {
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLng = Math.round(lng * 100) / 100;
  const cacheKey = `crimes:${roundedLat}:${roundedLng}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("cache hit");
    return JSON.parse(cached);
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

  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 * 15 });
  return data;
};

module.exports = getCrimes;
