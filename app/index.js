const glob = require("glob"); // Import glob for file pattern matching
const { logger } = require("../utils"); // Import logger utility for logging
const express = require("express"); // Import express framework

// Function to initialize routes
module.exports = function (app) {
  // Use glob to find all route files in the current directory and subdirectories
  const routers = glob.sync(__dirname + `/**/*.route.js`);

  // Iterate over each route file found
  routers.forEach((route) => {
    // Log the route in development mode
    if (process.env.NODE_ENV !== "production") {
      logger.info(`Loading route: ${route}`);
    }

    // Create a new router instance for each route file
    const router = express.Router();

    try {
      // Require the route file and pass the router to it
      require(route)(router);

      // Attach the router to the /api prefix
      // This means each route will be prefixed with /api
      app.use("/api", router);
    } catch (error) {
      // Log an error if route loading fails
      logger.error(`Failed to load route ${route}: ${error.message}`);
    }
  });

  // Optional: Log the total number of routes loaded
  logger.info(`Total routes loaded: ${routers.length}`);
};
