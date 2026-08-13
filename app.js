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
const path = require("path");
const { write } = require("./utils/");
const passport = require("passport");
const httpContext = require("express-http-context");
const { authMiddleware } = require("./middlewares/auth.middleware");
const errorHandler = require("./middlewares/error.middleware");
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
  app.use(morgan("dev", { stream: { write } })); // Dev logging format
} else {
  app.use(morgan("combined", { stream: { write } })); // More detailed logging for production
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
app.use(errorHandler);

module.exports = app;
