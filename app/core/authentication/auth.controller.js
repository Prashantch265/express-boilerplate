const AuthService = require("./auth.service");
const { successResponse } = require("@utils");

const loginWithPassword = async (req, res, next) => {
  try {
    const userType = req.params.userType;
    const { email, password } = req.body;
    await AuthService.validateEmailAndPassword();
  } catch (error) {
    next(error);
  }
};

const loginWithGoogle = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const loginWithFacebook = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const loginWithLinkedIn = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const logingWithGithub = async (req, res, next) => {
  try {
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
