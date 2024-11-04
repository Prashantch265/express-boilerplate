// utils/successResponse.js

const { SuccessResponse } = require("./response");
const util = require("util");
const { successMsg } = require("../messages/message.json");

/**
 * Sends a standardized success response to the client.
 *
 * @param {object} res - The response object from Express.
 * @param {object|array} result - The response data, optionally with pagination info.
 * @param {string} message - The message key for success messages in successMsg.
 * @param {string} source - The source of the response, for message formatting.
 *
 * @throws {Error} Throws an error if essential data is missing.
 * @returns {object} The JSON response sent to the client.
 *
 * @example
 * // Basic success response for a single item or array of items
 * const data = { id: 1, name: "Item" };
 * successResponse(res, data, "fetchSuccess", "Item");
 *
 * @example
 * // Success response with pagination
 * const paginatedResult = {
 *   data: [{ id: 1, name: "Item1" }, { id: 2, name: "Item2" }],
 *   pagination: {
 *     currentPage: 1,
 *     totalPages: 5,
 *     totalRecords: 50,
 *     hasNext: true
 *   }
 * };
 * successResponse(res, paginatedResult, "fetchSuccess", "Items");
 */
const successResponse = (res, result, message, source) => {
  if (!result)
    throw new Error("Result data is required to send response to client");
  if (!message) throw new Error("Message key is required");

  const success = new SuccessResponse();
  success.source = source;
  success.message = util.format(successMsg[message], source);
  success.status = 200;

  // Check if result includes pagination details
  if (result.pagination) {
    const { data, pagination } = result;
    success.data = data;
    success.pagination = {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalRecords: pagination.totalRecords,
      hasNext: pagination.hasNext,
    };
  } else {
    success.data = result;
  }

  return res.json(success);
};

module.exports = successResponse;
