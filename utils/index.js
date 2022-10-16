const { SuccessResponse, ErrorResponse } = require("./response");
const { logger } = require("./logger");
const util = require("util");
const fs = require("fs");
const { successMsg } = require("../utils/messages/message.json");

const successResponse = (res, data, message, source) => {
  if (!data) throw new Error(`Data required to send response to client`);

  const success = new SuccessResponse();
  success.source = source;
  success.data = data;
  success.message = util.format(successMsg[message], source);
  success.status = 200;

  return res.json(success);
};

const errorResponse = (status, message, source) => {
  if (!status) throw new Error(`http code not found`);
  if (!message) throw new Error(`Message Required to send to client`);

  const error = new ErrorResponse();
  error.status = status;
  error.message = message;
  error.source = source;

  return error;
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

const write = (message) => {
  logger.info(message.substring(0, message.lastIndexOf("\n")));
};

const formattedMsg = (err, errorMsg) => {
  return err.source
    ? util.format(
        errorMsg[err.message],
        ...(typeof err.source === "string" ? [err.source] : err.source)
      )
    : errorMsg[err.message];
};

const deleteFile = async (path) => {
  await fs.unlink(path, function (err) {
    if (err) console.log(err);
  });
  return;
};

const cookieExtractor = function (req) {
  let token;
  if (req && req.cookies) token = req.cookies["AuthToken"];
  return token;
};

const parseFilter = (pageNo, size, sort) => {
  const page = pageNo ? Math.abs(pageNo) : 1;
  const limit = size ? Math.abs(size) : 10;
  const sortVal = sort ? (sort === "desc" ? "DESC" : "ASC") : "DESC";
  const offset = (page - 1) * limit;
  return { limit, page, sortVal, offset };
};

const paginatedResponse = (count, data, limit, offset, escapePg = false) => {
  const total = !isNaN(count)
    ? count
    : count?.length
    ? parseInt(count[0].count)
    : 0;
  let totalPages = Math.ceil(total / limit);
  let hasNext = total - offset > limit;
  if (escapePg) {
    totalPages = 1;
    hasNext = false;
  }
  return {
    records: data,
    totalRecords: total,
    totalPages: totalPages,
    hasNext,
  };
};

module.exports = {
  successResponse,
  errorResponse,
  isEmpty,
  isIterable,
  write,
  formattedMsg,
  deleteFile,
  cookieExtractor,
  parseFilter,
  paginatedResponse,
};
