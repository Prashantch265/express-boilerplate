const AuthCtrl = require("./auth.controller");

module.exports = (router) => {
  router.route("/forgot-password").post(AuthCtrl.forgotPassword);
  router.route("/register").post(AuthCtrl.register);
  router.route("/login/internal").post(AuthCtrl.internalLogin);
  router.route("/login/external").post(AuthCtrl.externalLogin);
  router.route("/login/google").get(AuthCtrl.loginWithGoogle);
  router.route("/login/facebook").get(AuthCtrl.loginWithFacebook);
};
