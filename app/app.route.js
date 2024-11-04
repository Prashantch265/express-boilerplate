const AppController = require("./app.controller");
const validator = require("../middlewares/joi.middleware");
const { addAppConfigSchema } = require("./app.validation");

module.exports = (router) => {
  router.route("/app").get(AppController.getAllAppConfigs);

  router
    .route("/app")
    .post(validator(addAppConfigSchema), AppController.addAppConfig);
};
