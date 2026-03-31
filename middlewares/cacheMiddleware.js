import { getCache, setCache } from "../config/cache.js";

export const cacheMiddleware = (ttl) => {
  return async (req, res, next) => {
    try {
      const key = req.originalUrl;

      const cached = await getCache(key);
      if (cached) {
        console.log(`✅ CACHE HIT — ${key}`);
        return res.json(cached);
      }

      const originalJson = res.json.bind(res);
      res.json = async (data) => {
        await setCache(key, data, ttl);
        console.log(`❌ CACHE MISS — ${key} | cached for ${ttl}s`);
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error("⚠️ Cache middleware error:", error.message);
      next();
    }
  };
};