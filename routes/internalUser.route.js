const validator = require("../middlewares/joi.middleware");
const userRegistration = require("../validation/userRegistration");
const UserController = require("../controllers/user/user.controller");

module.exports = (router) => {
  router.route("/internal-user").put(validator(userRegistration));

  router.route("/internal-user").get(UserController.fetchAllUser);
};
