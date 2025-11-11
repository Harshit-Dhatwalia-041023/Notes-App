const rateLimit = require("../config/upstash");

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ mssg: "Too many requests, please try again later" });
        }
        next();
    } catch (err) {
        console.log("Rate limit error", err);
        next(err);
    }
};

module.exports = rateLimiter;

