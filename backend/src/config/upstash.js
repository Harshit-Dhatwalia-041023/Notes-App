const {Ratelimit }= require("@upstash/ratelimit");
const {Redis} = require("@upstash/redis");

require("dotenv").config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
  redis:redis,
  limiter : Ratelimit.slidingWindow(20,"10 s"),
});


module.exports = rateLimit;