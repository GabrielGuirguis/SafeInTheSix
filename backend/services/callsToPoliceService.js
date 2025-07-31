const supabaseClient = require("../config/supabaseConfig");
const { redisClient, redisAvailable } = require("../config/redisConfig");

const getCallsToPoliceService = async (since) => {
  const cacheKey = `calls`;

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

  const { data, error } = await supabaseClient.rpc("get_recent_calls", {
    since: since,
  });

  if (error) {
    console.error("Error calling get_recent_calls", error);
    return null;
  }

  if (redisAvailable) {
    try {
      await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 * 30 });
    } catch (err) {
      console.error("Redis set failed", err);
    }
  }

  return data;
};

module.exports = { getCallsToPoliceService };
