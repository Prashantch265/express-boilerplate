// socket-io.js

/**
 * Socket.IO Server Setup
 * This module initializes a Socket.IO server on top of an HTTP server.
 * It listens for client connections and handles events as defined.
 *
 * Dependencies:
 * - http: Node's HTTP module for creating the server.
 * - socket.io: Real-time bidirectional event-based communication library.
 */

const { createServer } = require("http");
const { Server } = require("socket.io");
const { logger } = require("../utils"); // Custom logger for structured logging

/**
 * Initializes and configures the Socket.IO server.
 * @param {Express.Application} app - The Express application instance.
 * @returns {http.Server} The HTTP server with attached Socket.IO.
 */
module.exports = function initializeSocket(app) {
  // Create the HTTP server and initialize Socket.IO
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust CORS settings as needed
      methods: ["GET", "POST"],
    },
  });

  // Log when a client connects
  io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    // Event emitted when client sends "connected" event
    socket.on("connected", () => {
      logger.info(`Client ${socket.id} confirmed connection`);
    });

    // Event for disconnection
    socket.on("disconnect", (reason) => {
      logger.info(`Client ${socket.id} disconnected: ${reason}`);
    });

    // Additional custom events can be added here
  });

  // Error handling for Socket.IO
  io.on("error", (error) => {
    logger.error("Socket.IO Error:", error);
  });

  return httpServer; // Return the HTTP server with Socket.IO attached
};
