const mongoose = require("mongoose");
const config = require("../config/config");
const { logger } = require("../utils/logger");

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => logger.error(err));

mongoose.connection.on("connected", () => logger.info("mongodb connected"));
mongoose.connection.on("error", (err) => logger.error(err));
mongoose.connection.on("disconnected", () =>
  logger.warn("mongodb disconnected")
);

// const models = glob.sync(
//   __dirname + `/../database/models/internal-user/*.model.js`
// );

// models.forEach((modelFile) => {
//   if (process.env.NODE_ENV === "development")
//     logger.info("Model :: " + modelFile);

//   require(modelFile)(mongoose);
// });

module.exports = mongoose;
