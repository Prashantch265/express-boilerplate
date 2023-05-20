const OtpConfigController = require("./otp-config.controller");
const validator = require("../../middlewares/joi.middleware");
const { addOtpConfigSchema } = require("./otp-config.validation");

module.exports = (router) => {
  router.route("/otp-config").get(OtpConfigController.getAllOtpConfigs);

  router
    .route("/otp-config")
    .post(validator(addOtpConfigSchema), OtpConfigController.addOtpConfig);

  router.route("/otp-config/:id").get(OtpConfigController.getOtpConfigById);
};
