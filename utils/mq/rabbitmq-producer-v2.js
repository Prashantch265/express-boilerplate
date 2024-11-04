const messageQueue = require("../../lib/rabbitmq");
const { logger } = require("../logging/logger");
const { rabbitMq } = require("../../config/config");

/**
 * Sleeps for a given duration to create a delay.
 * @param {number} ms - The duration to wait in milliseconds.
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends a message to a specified RabbitMQ queue with retry logic.
 * @param {string} queueName - The name of the RabbitMQ queue to send the message to.
 * @param {string|Buffer} message - The message to be sent to the queue.
 * @param {number} maxRetries - The maximum number of retry attempts.
 * @param {number} retryDelay - The delay between retries in milliseconds.
 */
const sendMessageToQueue = async (
  queueName = rabbitMq.queue,
  message = "Hello World",
  maxRetries = 3,
  retryDelay = 1000
) => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const connection = await messageQueue();
      logger.info("Connected to RabbitMQ");

      const channel = await connection.createChannel();
      logger.info("Channel created successfully");

      // Declare the queue before sending a message to ensure it exists
      await channel.assertQueue(queueName, { durable: true });
      logger.info(`Queue "${queueName}" declared`);

      // Send the message to the queue
      channel.sendToQueue(queueName, Buffer.from(message));
      logger.info(`Message sent to queue "${queueName}": ${message}`);

      // Close the channel and connection after sending the message
      await channel.close();
      logger.info("Channel closed successfully");
      await connection.close();
      logger.info("Connection closed successfully");

      // Exit the loop on success
      return;
    } catch (err) {
      attempts++;
      logger.error(`Attempt ${attempts} failed: ${err.message}`);

      if (attempts < maxRetries) {
        logger.warn(
          `Retrying in ${retryDelay}ms... (Attempt ${
            attempts + 1
          } of ${maxRetries})`
        );
        await sleep(retryDelay); // Wait before retrying
      } else {
        logger.error("Max retry attempts reached. Message not sent.");
      }
    }
  }
};

// Example usage: Send a custom message with retry logic
sendMessageToQueue(rabbitMq.queue, "Test message with retry logic", 3, 1000);

module.exports = sendMessageToQueue;
