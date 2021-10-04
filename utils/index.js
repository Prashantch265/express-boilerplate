const { SuccessResponse, ErrorResponse } = require("./response");

const successResponse = (status, data, message, source, description) => {
  if (!data) throw new Error(`Data required to send response to client`);
  if (!status) throw new Error(`http code not found`);

  const SUCCESS = new SuccessResponse();
  SUCCESS.source = source;
  SUCCESS.data = data;
  SUCCESS.message = message;
  SUCCESS.description = description;

  return SUCCESS;
};

const errorResponse = (status, message, description) => {
  if (!status) throw new Error(`http code not found`);
  if (!message) throw new Error(`Message Required to send to client`);

  const ERROR = new ErrorResponse();
  ERROR.status = status;
  ERROR.message = message;
  ERROR.description = description;

  return ERROR;
};

const isEmpty = (value) => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

const isIterable = (value) => {
  return Symbol.iterator in Object(value);
};

module.exports = { successResponse, errorResponse, isEmpty, isIterable };
