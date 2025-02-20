const { services } = require("@app/core/users");
const { HttpException } = require("@exceptions");

let userService;

const validateEmailAndPassword = async (userType, email, password) => {
  switch (userType) {
    case "admin":
      userService = services.adminUserService;
      break;
    case "corporate":
      userService = services.corporateUserService;
      break;
    case "normal":
      userService = services.normalUserService;
      break;
    default:
      throw new HttpException(422, "Invalid User Type");
  }
};

module.exports = { validateEmailAndPassword };
