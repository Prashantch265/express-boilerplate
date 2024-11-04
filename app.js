const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const hpp = require("hpp");
const { logger } = require("./utils");
const morgan = require("morgan");
const session = require("express-session");
const db = require("./lib/sequelize");
const { errorResponse } = require("./utils/");
const path = require("path");
const { stream, formattedMsg } = require("./utils/");
const passport = require("passport");
const httpContext = require("express-http-context");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { HttpException, AuthException } = require("./exceptions/index");
const { sessionConfig } = require("./config/config");

/**
 * Initialize Passport Strategies
 */
// require("./passport/jwt.passport")(passport);  // Uncomment when JWT strategy is used
// require("./passport/google.passport")(passport);  // Uncomment for Google OAuth
// require("./passport/facebook.passport")(passport);  // Uncomment for Facebook OAuth

/**
 * Initialize Express App
 */
const app = new express();

/**
 * Initialize in-memory session store
 * This could be replaced by a more scalable option (like Redis) in production.
 */
const memoryStore = new session.MemoryStore();

/**
 * Middleware for Different Environments
 */
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "*", // Allow all origins during development
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );
  app.use(morgan("dev", { stream: stream })); // Dev logging format
} else {
  app.use(morgan("combined", { stream: stream })); // More detailed logging for production
  app.use(cors({})); // Use CORS options defined in utils for production
}

/**
 * Connect to the SQL Database using Sequelize
 */
db.sequelize
  .authenticate()
  .then(() => {
    // Optionally force-sync DB schema for development
    // db.sequelize.sync({ force: true });
    logger.info("DB connected");
  })
  .catch((err) => logger.error(err.stack));

/**
 * Optional: MongoDB connection initialization
 * Uncomment if using MongoDB alongside SQL database
 */
// require("./lib/mongo");

/**
 * Initialize WebSocket Communication
 * If your project requires WebSocket, this should initialize Socket.io
 */
// require("./lib/socket-io")(app);

/**
 * Initialize RabbitMQ for message queuing
 */
require("./lib/rabbitmq");

/**
 * Express App Setup: Middleware
 */
app.set("view engine", "ejs"); // EJS as templating engine for rendering views
app.use(hpp()); // Prevent HTTP parameter pollution attacks
app.use(helmet()); // Add security-related HTTP headers
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies from HTTP requests
app.use(compression()); // Enable response compression for faster API responses
app.use(httpContext.middleware); // Attach request-scoped data (context)
app.use(express.static(path.join(__dirname, "./public/frontend"))); // Serve static frontend files
// app.use(authMiddleware);  // Uncomment to enable global authentication middleware

/**
 * Session Management
 * Memory store should be replaced with Redis or other persistent stores in production.
 */
app.use(
  session({
    secret: sessionConfig.secret, // Secret for signing session IDs
    resave: false, // Do not save session if it hasn't been modified
    saveUninitialized: true, // Save session even if uninitialized
    store: memoryStore, // Store sessions in memory (for development)
  })
);

/**
 * Initialize Application Routes
 * This should contain your main API routes
 */
require("./app/")(app);

/**
 * Simple GET route for testing
 */
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

/**
 * 404 Error Handler
 * If no route matches, respond with a 404 error.
 */
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Not Found";
  next(err);
});

/**
 * Global Error Handling Middleware
 * Handles all errors thrown in the app.
 */
app.use((err, req, res, next) => {
  try {
    let errorObj;
    const { errorMsg } = require("./utils/messages/message.json");
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    // Custom error handling based on the exception type
    if (err instanceof HttpException) {
      errorObj = errorResponse(
        status,
        err?.message ? formattedMsg(err, errorMsg) : errorMsg["invalidBody"],
        err.source
      );
    } else if (err instanceof AuthException) {
      errorObj = errorResponse(
        status,
        err?.message,
        status !== 403 ? null : `[${req.method}] ${req.path}`
      );
    } else {
      // Generic error logging
      logger.error(
        `[${req.method}] ${req.path} >> StatusCode : ${status}, Message : ${message} "\n" Stack : ${err.stack}`
      );
      errorObj = errorResponse(
        status,
        formattedMsg(err, errorMsg) || message,
        `[${req.method}] ${req.path}`
      );
    }

    return res.status(errorObj.status).json(errorObj); // Send the error response as JSON
  } catch (error) {
    next(error); // In case of error in the error handler itself, call next middleware
  }
});

module.exports = app;
