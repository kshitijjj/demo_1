// config/cache.js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) {
      console.error('⚠️ Redis down after 3 retries — falling back to DB');
      return null;
    }
    const delay = times * 200;
    console.log(`🔄 Retrying Redis... attempt ${times} (${delay}ms)`);
    return delay;
  }
});

redis.on("connect", () => console.log("📦 Redis connected"));
redis.on("error", (error) => console.log("⚠️ Redis Error", error.message));

export const getCache = async (key) => {
  try {
    const cache = await redis.get(key);
    if (!cache) return null;
    console.log(`✅ Cache HIT — ${key}`);
    return JSON.parse(cache);
  } catch (error) {
    console.error("⚠️ Redis unavailable, fetching from DB");
    return null;
  }
};

export const setCache = async (key, data, ttl) => {
  try {
    await redis.set(key, JSON.stringify(data), "EX", ttl);
    console.log(`✅ Cache SET — ${key} | TTL: ${ttl}s`);
  } catch (error) {
    console.error("⚠️ Redis unavailable, skipping cache set");
  }
};

export const deleteCache = async (key) => {
  try {
    await redis.del(key);
    console.log(`🗑️ Cache DELETED — ${key}`);
  } catch (error) {
    console.log("⚠️ Error deleting cache", error.message);
  }
};

export default redis;