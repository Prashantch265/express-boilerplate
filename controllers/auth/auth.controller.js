const { successResponse } = require("../../utils");
const AuthService = require("../../services/auth/auth.service");
const httpContext = require("express-http-context");

const authenticate = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const resData = await AuthService.authenticate(userName, password);
    return successResponse(res, resData, "loggedIn");
  } catch (error) {
    next(error);
  }
};

const init = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const resData = await AuthService.init(userId);
    return successResponse(res, resData, "fetch", "user");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const resData = await AuthService;
    return successResponse(res, resData, "update", "");
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, forgotPassword, init };
