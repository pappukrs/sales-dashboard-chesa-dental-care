const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Connected'));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Could not connect to Redis, caching will be disabled.', err.message);
    }
})();

module.exports = redisClient;
