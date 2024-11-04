// Import the Express app instance from the app.js file
const app = require("./app");

// Import the port configuration from the config file
const { port } = require("./config/config");

// Import the custom logger utility for structured logging
const { logger } = require("./utils");

/**
 * Start the Express server on the specified port.
 * The port is either configured through an environment variable or defaults to 3000.
 */
app.listen(port, () => {
  // Log the environment and server start details
  logger.info(`=================================`);
  logger.info(`======= ENV: ${process.env.NODE_ENV} =======`); // Logs the current environment (development, production, etc.)
  logger.info(`🚀 App listening on the port ${port}`); // Logs the port number where the server is running
  logger.info(`=================================`);
});
