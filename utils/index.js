// Import and batch-export from each subdirectory in the `utils` folder

// Helpers
const paginationHelpers = require("./helpers/pagination");
const cookieExtractor = require("./helpers/cookie-extractor");
const deleteFile = require("./helpers/delete-file");
const formattedMsg = require("./helpers/formatted-msg");

// Logging
const { logger, write } = require("./logging/logger");

// Mail
const nodeMailer = require("./mail/node-mailer");

// Responses
const successResponse = require("./responses/success-response");
const errorResponse = require("./responses/error-response");

// Validation
const isEmpty = require("./validation/is-empty");
const isIterable = require("./validation/is-iterable");

// Export everything in a single object
module.exports = {
  ...paginationHelpers, // includes getPaginationParams, formatPaginatedResponse
  ...{ logger, write }, // individual exports from logging
  cookieExtractor,
  deleteFile,
  formattedMsg,
  nodeMailer,
  successResponse,
  errorResponse,
  isEmpty,
  isIterable,
};
