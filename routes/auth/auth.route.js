const AuthController = require("../../controllers/auth/auth.controller");
const validator = require("../../middlewares/joi.middleware");
const login = require("../../validation/login");

module.exports = (router) => {
  router
    .route("/auth/login")
    .post(validator(login), AuthController.authenticate);

  router.route("/auth/init").get(AuthController.init);

  // router.route("/auth/forgot-password").post()
};
