const AuthController = require("./auth.controller");
const validator = require("@middlewares/joi.middleware");
const { loginWithPasswordSchema } = require("./auth.validation");

module.exports = (router) => {
  router.route("/auth/login-with-google").get(AuthController.loginWithGoogle);

  router.route("/auth/google/cb").get(AuthController);

  router
    .route("/auth/login/:userType")
    .post(validator(loginWithPasswordSchema), AuthController.loginWithPassword);
};
