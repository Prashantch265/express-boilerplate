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
const { sessionConfig } = require("./configs/config");

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
 * Session store: MemoryStore by default (no external dependency - not
 * every project needs Redis just to boot). Set SESSION_STORE=redis to
 * opt into a Redis-backed store instead (survives restarts, works
 * across multiple processes/instances - recommended once you're
 * already running Redis and care about that). Only requires the Redis
 * client when explicitly opted into, so the default path never tries
 * to connect to Redis at all.
 */
let sessionStore = new session.MemoryStore();

if ((process.env.SESSION_STORE || "memory").toLowerCase() === "redis") {
  const { RedisStore } = require("connect-redis");
  const redisClient = require("./lib/redis");
  sessionStore = new RedisStore({ client: redisClient, prefix: "session:" });
}

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
    // db.sequelize.sync({ alter: true });
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
// require("./lib/rabbitmq");

/**
 * Express App Setup: Middleware
 */
app.set("trust proxy", true); // Trusting the Proxy (Cloudflare or Load Balancer)
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
 */
app.use(
  session({
    secret: sessionConfig.secret, // Secret for signing session IDs
    resave: false, // Do not save session if it hasn't been modified
    saveUninitialized: true, // Save session even if uninitialized
    store: sessionStore,
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
