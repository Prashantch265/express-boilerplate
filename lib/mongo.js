// mongo.js

/**
 * MongoDB Connection Module
 * This module establishes a connection to the MongoDB database using Mongoose.
 * It also manages connection lifecycle events and handles error logging.
 *
 * Dependencies:
 * - mongoose: ODM library for MongoDB.
 * - config: Configuration file with MongoDB URI.
 * - logger: Custom logging utility for structured logging.
 */

const mongoose = require("mongoose");
const config = require("../config/config");
const { logger } = require("../utils");

// Use native promises
mongoose.Promise = global.Promise;

/**
 * Connect to MongoDB with retry logic.
 * Establishes a MongoDB connection with configurable options and sets up
 * event listeners for connection status and error handling.
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    logger.info("MongoDB connected successfully");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    setTimeout(connectToDatabase, 5000); // Retry after 5 seconds if connection fails
  }
};

// Initialize connection
connectToDatabase();

// Event listeners for connection status
mongoose.connection.on("connected", () =>
  logger.info("MongoDB connection established")
);

mongoose.connection.on("error", (err) =>
  logger.error("MongoDB encountered an error:", err)
);

mongoose.connection.on("disconnected", () =>
  logger.warn("MongoDB connection lost. Retrying...")
);

mongoose.connection.on("reconnected", () =>
  logger.info("MongoDB connection reestablished")
);

/**
 * Uncomment and adjust the following code if you need to load models dynamically
 * from specific folders for internal database models.
 *
 * Example:
 * const models = glob.sync(__dirname + `/../database/models/internal-user/*.model.js`);
 * models.forEach((modelFile) => {
 *   if (process.env.NODE_ENV === "development") {
 *     logger.info("Loading Model:", modelFile);
 *   }
 *   require(modelFile)(mongoose);
 * });
 */

module.exports = mongoose;
