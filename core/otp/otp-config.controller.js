const { successResponse } = require("../../utils");
const OtpConfigService = require("./otp-config.service");

const addOtpConfig = async (req, res, next) => {
  // #swagger.tags = ['OTP Config']
  // #swagger.summary = 'Some summary...'
  // #swagger.description = 'Some description...'
  /* #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'Some description...',
                schema: { $ref: "#/definitions/addOtpConfigSchema" }
      } 
  */
  try {
    const payload = req.body;
    const data = await OtpConfigService.addOtpConfig(payload);
    return successResponse(res, data, "create", "otp-config");
  } catch (error) {
    next(error);
  }
};

const getOtpConfigById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await OtpConfigService.getOtpConfigById(id);
    return successResponse(res, data, "fetch", "otp-config");
  } catch (error) {
    next(error);
  }
};

const getAllOtpConfigs = async (req, res, next) => {
  try {
    const data = await OtpConfigService.getAllOtpConfigs();
    return successResponse(res, data, "fetch", "otp-config");
  } catch (error) {
    next(error);
  }
};

module.exports = { getOtpConfigById, getAllOtpConfigs, addOtpConfig };
