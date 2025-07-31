const { createClient } = require("redis");

const redisClient = createClient();
let redisAvailable = false;

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
  redisAvailable = false;
});

redisClient.on("connect", () => {
  console.log("Redis connected");
  redisAvailable = true;
});

redisClient.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
  redisAvailable = false;
});

module.exports = {
  redisClient,
  redisAvailable: () => redisAvailable
};