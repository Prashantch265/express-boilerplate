const { services } = require("@app/core/users");
const { HttpException } = require("@exceptions");

const validateEmailAndPassword = async (userType, email, password) => {
  let userService;
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

  const profile = await userService.validateCredentials(email, password);
  const plainProfile =
    typeof profile.toJSON === "function" ? profile.toJSON() : profile;

  return { ...plainProfile, userType };
};

module.exports = { validateEmailAndPassword };
