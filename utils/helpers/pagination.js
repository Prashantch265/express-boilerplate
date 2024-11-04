// utils/pagination.js

/**
 * Helper function to generate pagination details.
 * @param {number} pageNo - The current page number.
 * @param {number} size - Number of items per page.
 * @param {string} sort - Sorting order, 'asc' or 'desc'.
 * @param {string} sortBy - The field to sort by, defaults to 'createdAt'.
 * @returns {object} Pagination details.
 */
const getPaginationParams = (
  pageNo = 1,
  size = 10,
  sort = "desc",
  sortBy = "createdAt"
) => {
  const page = Math.max(1, parseInt(pageNo));
  const limit = Math.max(1, parseInt(size));
  const offset = (page - 1) * limit;
  const sortOrder = sort.toLowerCase() === "asc" ? "ASC" : "DESC";

  return { limit, offset, sortOrder, sortBy };
};

/**
 * Formats paginated response.
 * @param {number} totalRecords - Total number of records in the database.
 * @param {Array} data - The data fetched for the current page.
 * @param {number} limit - Number of items per page.
 * @param {number} offset - Offset for current page.
 * @returns {object} Paginated response object.
 */
const formatPaginatedResponse = (totalRecords, data, limit, offset) => {
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const hasNext = offset + limit < totalRecords;

  return {
    data,
    pagination: {
      totalRecords,
      totalPages,
      currentPage,
      hasNext,
    },
  };
};

module.exports = { getPaginationParams, formatPaginatedResponse };
