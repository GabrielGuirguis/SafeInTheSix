const { createClient } = require("redis");

let redisAvailable = false;
let redisClient = null;

module.exports = {
  redisAvailable: () => redisAvailable
};