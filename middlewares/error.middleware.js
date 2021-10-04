const { errorResponse } = require("../utils");
const { logger } = require("../utils/logger");
const util = require("util");
const { errorMsg } = require("../utils/messages/message.json");

const errorHandler = (err, req, res, next) => {
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
};

module.exports = errorHandler;
