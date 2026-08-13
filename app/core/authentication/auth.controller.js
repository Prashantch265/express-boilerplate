const AuthService = require("./auth.service");
const { successResponse } = require("@utils");
const { signAccessToken, signRefreshToken } = require("@lib/jwt");
const { ServiceUnavailableException } = require("@exceptions");

const loginWithPassword = async (req, res, next) => {
  try {
    const userType = req.params.userType;
    const { email, password } = req.body;
    const user = await AuthService.validateEmailAndPassword(
      userType,
      email,
      password
    );
    const accessToken = await signAccessToken(user);
    const refreshToken = await signRefreshToken(user);
    return successResponse(
      res,
      { accessToken, refreshToken, user },
      "loggedIn",
      userType
    );
  } catch (error) {
    next(error);
  }
};

// OAuth strategies are not wired up yet (no signup flow exists for
// corporate/normal users) — respond clearly instead of hanging.
// See express-boilerplate#8.
const loginWithGoogle = async (req, res, next) => {
  try {
    throw new ServiceUnavailableException(
      "Google OAuth login is not implemented yet"
    );
  } catch (error) {
    next(error);
  }
};

const loginWithFacebook = async (req, res, next) => {
  try {
    throw new ServiceUnavailableException(
      "Facebook OAuth login is not implemented yet"
    );
  } catch (error) {
    next(error);
  }
};

const loginWithLinkedIn = async (req, res, next) => {
  try {
    throw new ServiceUnavailableException(
      "LinkedIn OAuth login is not implemented yet"
    );
  } catch (error) {
    next(error);
  }
};

const logingWithGithub = async (req, res, next) => {
  try {
    throw new ServiceUnavailableException(
      "GitHub OAuth login is not implemented yet"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginWithPassword,
  loginWithGoogle,
  loginWithFacebook,
  loginWithLinkedIn,
  logingWithGithub,
};
