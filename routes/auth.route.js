const validator = require("../middlewares/joi.middleware");
const login = require("../validation/login");
const userRegistration = require("../validation/userRegistration");
const AuthController = require("../controllers/internal-user/auth.controller");
const UserController = require("../controllers/internal-user/user.controller");

module.exports = (router) => {
  router.route("/login").post(validator(login), AuthController.signin);

  router
    .route("/register")
    .post(validator(userRegistration), UserController.registerUser);
};
