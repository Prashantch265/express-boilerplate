// rabbitmq.js

/**
 * RabbitMQ Connection Module
 * This module establishes a connection to a RabbitMQ server using the amqplib library.
 * It provides a reusable and resilient connection with error handling and automatic reconnection.
 *
 * Dependencies:
 * - amqplib: Library for connecting to RabbitMQ.
 * - config: Configuration file that includes RabbitMQ connection details.
 * - logger: Custom logger for structured logging.
 */

const amqp = require("amqplib");
const { rabbitMq } = require("../config/config");
const { logger } = require("../utils");

let connection;

/**
 * Establish a RabbitMQ connection with retry mechanism.
 * This function connects to RabbitMQ and provides automatic reconnection
 * on failure. It is wrapped in a Promise for asynchronous use.
 *
 * @returns {Promise<amqp.Connection>} Resolves with an active RabbitMQ connection.
 */
const connectToRabbitMQ = async () => {
  try {
    connection = await amqp.connect(rabbitMq.host);
    logger.info("RabbitMQ connected successfully");

    // Setup event listeners for the connection to handle connection issues
    connection.on("error", (err) => {
      logger.error("RabbitMQ connection error:", err);
      // Attempt to reconnect on error
      if (err.message !== "Connection closing") {
        setTimeout(connectToRabbitMQ, 5000);
      }
    });

    connection.on("close", () => {
      logger.warn("RabbitMQ connection closed. Reconnecting...");
      setTimeout(connectToRabbitMQ, 5000); // Retry connection on unexpected close
    });

    return connection;
  } catch (err) {
    logger.error("Failed to connect to RabbitMQ:", err);
    setTimeout(connectToRabbitMQ, 5000); // Retry after delay on initial failure
    throw err; // Re-throw error for handling in higher scope if needed
  }
};

// Automatically connect on module load
connectToRabbitMQ();

module.exports = connectToRabbitMQ;
