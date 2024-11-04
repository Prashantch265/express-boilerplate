const {
  getPaginationParams,
  formatPaginatedResponse,
} = require("./helpers/pagination");
const { logger, write } = require("./logging/logger");

module.exports = {
  cookieExtractor: require("./helpers/cookie-extractor"),
  deleteFile: require("./helpers/delete-file"),
  formattedMsg: require("./helpers/formatted-msg"),
  getPaginationParams: getPaginationParams,
  formatPaginatedResponse: formatPaginatedResponse,
  logger: logger,
  write: write,
  nodeMailer: require("./mail/node-mailer"),
  successResponse: require("./responses/success-response"),
  errorResponse: require("./responses/error-response"),
  isEmpty: require("./validation/is-empty"),
  isIterable: require("./validation/is-iterable"),
};
