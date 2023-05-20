const { errorResponse, formattedMsg } = require("../utils");
const { logger } = require("../utils/logger");
const { HttpException, AuthException } = require("../exceptions/index");

const errorHandler = (err, req, res, next) => {
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
};

module.exports = errorHandler;
