const { successResponse } = require("../utils");
const AppService = require("./app.service");

const addAppConfig = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await AppService.addAppConfig(payload);
    return successResponse(res, data, "create", "app-config");
  } catch (error) {
    next(error);
  }
};

const getAllAppConfigs = async (req, res, next) => {
  try {
    const { page, size, sort, sortBy } = req.query;
    const result = await AppService.getAllAppConfigs(page, size, sort, sortBy);
    return successResponse(res, result, "fetchSuccess", "app-config");
  } catch (error) {
    next(error);
  }
};

const getAppConfigById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await AppService.getAppConfigById(id);
    return successResponse(res, data, "fetch", "app-config");
  } catch (error) {
    next(error);
  }
};

module.exports = { addAppConfig, getAllAppConfigs, getAppConfigById };
