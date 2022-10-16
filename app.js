const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const { corsOption } = require("./utils/cors");
const hpp = require("hpp");
const { logger } = require("./utils/logger");
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

/**
 * Initialize Passport
 */
require("./lib/passport-jwt")(passport);

/**
 * Initialize Express
 */
const app = new express();

const memoryStore = new session.MemoryStore();

if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  ); //before routes
  app.use(morgan("dev", { stream: stream }));
} else {
  app.use(morgan("combined", { stream: stream }));
  app.use(cors(corsOption));
}

/**
 * Connect to Database With Sequelize
 */
db.sequelize
  .authenticate()
  .then(() => {
    // db.sequelize.sync({ force: true });
    logger.info("DB connected");
  })
  .catch((err) => logger.error(err.stack));

/**
 * Connect to MongoDB
 */
// require("./lib/mongo");

/**
 * Initialize Socket
 */
require("./lib/socket-io")(app);

/**
 * Initialize Middlewares
 */
app.set("view engine", "ejs");
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(httpContext.middleware);
app.use(express.static(path.join(__dirname, "./public/frontend")));
app.use(authMiddleware);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

/**
 * Initialize Routes
 */
require("./routes/")(app);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

/**
 * Resource Not Found Error Handler
 */
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Not Found";
  next(err);
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  try {
    let errorObj;
    const { errorMsg } = require("./utils/messages/message.json");
    const status = err.status || 500;
    const message = err.message || "something went wrong";
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
      logger.error(
        `[${req.method}] ${req.path} >> StatusCode : ${status}, Message : ${message} "\n" Stack : ${err.stack}`
      );
      errorObj = errorResponse(
        status,
        formattedMsg(err, errorMsg) || message,
        `[${req.method}] ${req.path}`
      );
    }
    return res.status(errorObj.status).json(errorObj);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
