// redisClient.js
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  // tls: process.env.REDIS_TLS === "true" ? {} : undefined, // Enable TLS if specified
  maxRetriesPerRequest: 3, // avoid infinite retries
  enableReadyCheck: true, // ensure the server is ready before accepting commands
});

redis.on("connect", () => console.log("✅ Connected to Redis"));
redis.on("ready", () => console.log("🚀 Redis is ready"));
redis.on("error", (err) => console.error("❌ Redis error:", err));
redis.on("close", () => console.warn("⚠️ Redis connection closed"));
redis.on("reconnecting", () => console.log("🔄 Reconnecting to Redis..."));

process.on("SIGINT", async () => {
  console.log("🔌 Closing Redis connection...");
  await redis.quit();
  process.exit(0);
});

async function checkRedisHealth() {
  try {
    return (await redis.ping()) === "PONG";
  } catch {
    return false;
  }
}

module.exports = { redis, checkRedisHealth };
