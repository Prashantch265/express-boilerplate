const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const { corsOption } = require("./utils/cors");
const hpp = require("hpp");
const { stream, logger } = require("./utils/logger");
const morgan = require("morgan");
const session = require("express-session");
const { initKeycloak } = require("./lib/keycloak");
const errorHandler = require("./middlewares/error.middleware");
const sequelize = require("./lib/sequelize");
const mongoose = require("./lib/mongo");

const app = new express();

const memoryStore = new session.MemoryStore();

// const keycloak = initKeycloak(memoryStore);

if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "*", credentials: true })); //before routes
  app.use(morgan("dev", { stream }));
} else {
  app.use(morgan("combined", { stream }));
  app.use(cors(corsOption));
}

/**
 * for sequelize
 */
sequelize
  .sync({ force: true })
  .then(() => logger.info("DB connected"))
  .catch((err) => logger.error(err.stack));


/**
 * for mongoose
 */
mongoose.connection.on("error", (err) => {
  logger.error(err.stack);
});

app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// app.use(keycloak.middleware({ logout: "/logout", admin: "/" }));

app.use((req, res, next) => {
  const err = new Error();
  err.status(404);
  err.message("Not Found");
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  logger.error(
    `[${req.method}] ${req.path} >> StatusCode : ${status}, Message : ${message} "\n" Stack : ${err.stack}`
  );
  const formattedMsg = err.source
    ? util.format(errorMsg[message], err.source)
    : errorMsg[message];
  let errorObj = errorResponse(status, formattedMsg || message, null);
  return res.status(errorObj.status).json(errorObj);
});

module.exports = app;
