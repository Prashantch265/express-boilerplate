const AppRepository = require("./app.repository");
const { HttpException } = require("@exceptions");
const { getPaginationParams, formatPaginatedResponse } = require("@utils");

/**
 * Add a new App Config.
 * @param {object} payload - The app configuration details.
 * @returns {object} - The newly created app config.
 * @throws {HttpException} - Throws error if duplicate configuration is found.
 */
const addAppConfig = async (payload) => {
  const existingConfig = await AppRepository.findOneByField({
    name: payload.name,
  });
  if (existingConfig)
    throw new HttpException(400, "duplicateData", "app-config");
  return await AppRepository.addAppConfig(payload);
};

/**
 * Get an App Config by ID.
 * @param {string} id - The ID of the app config.
 * @returns {object} - The app config if found.
 * @throws {HttpException} - Throws error if the app config is not found.
 */
const getAppConfigById = async (id) => {
  const data = await AppRepository.findOneByField({ id });
  if (!data) throw new HttpException(404, "notFound", "app-config");
  return data;
};

/**
 * Get all App Configs.
 * @returns {Array} - An array of all app configurations.
 */
const getAllAppConfigs = async (pageNo, size, sort, sortBy) => {
  const {
    limit,
    offset,
    sortOrder,
    sortBy: defaultSortBy,
  } = getPaginationParams(pageNo, size, sort, sortBy);
  const { rows: data, count: totalRecords } = await AppRepository.findAll(
    limit,
    offset,
    sortOrder,
    defaultSortBy
  );

  return formatPaginatedResponse(totalRecords, data, limit, offset);
};

module.exports = { addAppConfig, getAppConfigById, getAllAppConfigs };
