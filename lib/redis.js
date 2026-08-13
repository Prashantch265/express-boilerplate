// redis.js

/**
 * Redis Client Setup
 * This module initializes a Redis client connection to be used throughout the Express app.
 *
 * Dependencies:
 * - redis (v4): the official Redis client for Node.js.
 */

const { createClient } = require("redis");
const { redisConfig } = require("../configs/config");
const { logger } = require("../utils"); // Custom logger for structured logging

// Create Redis client instance with configuration options
const redis = createClient({
  socket: {
    host: redisConfig.host || "127.0.0.1", // Default Redis host
    port: redisConfig.port || 6379, // Default Redis port
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000), // Retry connection after delay
  },
  password: redisConfig.password || undefined, // Set password if Redis auth is enabled
  database: redisConfig.db || 0, // Select specific Redis database (default is 0)
});

// Event listeners for monitoring connection status
redis.on("connect", () => logger.info("Redis client connected"));
redis.on("ready", () => logger.info("Redis client ready for use"));
redis.on("error", (err) => logger.error("Redis client error:", err));
redis.on("end", () => logger.warn("Redis client connection closed"));
redis.on("reconnecting", () => logger.info("Reconnecting to Redis..."));

// redis v4 doesn't auto-connect like ioredis/redis v3 did.
redis.connect();

// Graceful shutdown for Redis client during application termination
process.on("SIGINT", async () => {
  await redis.quit();
  logger.info("Redis client disconnected through app termination");
  process.exit(0);
});

module.exports = redis;
