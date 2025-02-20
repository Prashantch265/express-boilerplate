const db = require("@lib/sequelize");
const { app_configs } = db;

/**
 * Find a configuration by field.
 * @param {object} where - The search condition
 * @returns {object|null} App configuration or null if not found
 */
const findOneByField = async (where) => {
  where = { ...where, isActive: true };
  return await app_configs.findOne({ where });
};

/**
 * Add a new app configuration.
 * @param {object} payload - The data to be inserted
 * @returns {object} Created app config
 */
const addAppConfig = async (payload) => {
  return await app_configs.create(payload);
};

/**
 * Get all app configurations with pagination and sorting.
 * @param {number} limit - Number of items per page.
 * @param {number} offset - Offset for current page.
 * @param {string} sortOrder - Sorting order, 'ASC' or 'DESC'.
 * @param {string} sortBy - Field to sort by.
 * @returns {object} Paginated data with total count.
 */
const findAll = async (limit, offset, sortOrder, sortBy) => {
  const result = await app_configs.findAndCountAll({
    limit,
    offset,
    order: [[sortBy, sortOrder]],
    where: { isActive: true },
  });
  return result;
};

module.exports = { findOneByField, addAppConfig, findAll };
