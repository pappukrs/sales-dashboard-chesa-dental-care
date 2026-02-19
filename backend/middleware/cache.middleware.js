const redisClient = require('../config/redis');

const cacheMiddleware = async (req, res, next) => {
    if (!redisClient.isOpen || !redisClient.isReady) {
        console.log('Redis not ready, skipping cache-aside check');
        return next();
    }

    const sortedQuery = Object.keys(req.query)
        .sort()
        .map(key => {
            let val = req.query[key];
            if (key === 'search' && val) val = val.toLowerCase().trim();
            return `${key}=${val}`;
        })
        .join('&');

    const key = `orders:${sortedQuery || 'default'}`;

    try {
        const cachedData = await redisClient.get(key);
        if (cachedData) {
            console.log('Cache Hit (Aside):', key);
            return res.json(JSON.parse(cachedData));
        }

        console.log('Cache Miss (Aside):', key);

        res.originalJson = res.json;
        res.json = (body) => {
            redisClient.setEx(key, 300, JSON.stringify(body)).catch(err => console.error('Redis SetEx Error:', err));
            res.originalJson(body);
        };
        next();
    } catch (err) {
        console.error('Cache middleware error:', err);
        next();
    }
};

module.exports = cacheMiddleware;
