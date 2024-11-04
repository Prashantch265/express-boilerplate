// redis.js

/**
 * Redis Client Setup
 * This module initializes a Redis client connection to be used throughout the Express app.
 *
 * Dependencies:
 * - ioredis: A Redis client library for Node.js that supports Redis Cluster and Sentinel.
 */

const Redis = require("ioredis");
const { redisConfig } = require("../config/config");
const { logger } = require("../utils"); // Custom logger for structured logging

// Create Redis client instance with configuration options
const redis = new Redis({
  port: redisConfig.port || 6379, // Default Redis port
  host: redisConfig.host || "127.0.0.1", // Default Redis host
  password: redisConfig.password || null, // Set password if Redis auth is enabled
  db: redisConfig.db || 0, // Select specific Redis database (default is 0)
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay; // Retry connection after delay
  },
  reconnectOnError(err) {
    const targetError = "READONLY";
    if (err.message.includes(targetError)) {
      return true; // Retry on read-only errors in Redis Cluster setup
    }
  },
});

// Event listeners for monitoring connection status
redis.on("connect", () => logger.info("Redis client connected"));
redis.on("ready", () => logger.info("Redis client ready for use"));
redis.on("error", (err) => logger.error("Redis client error:", err));
redis.on("end", () => logger.warn("Redis client connection closed"));
redis.on("reconnecting", (delay) =>
  logger.info(`Reconnecting to Redis in ${delay} ms`)
);

// Graceful shutdown for Redis client during application termination
process.on("SIGINT", () => {
  redis.quit(() => {
    logger.info("Redis client disconnected through app termination");
    process.exit(0);
  });
});

module.exports = redis;
