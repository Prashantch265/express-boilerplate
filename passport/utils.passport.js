const { logger } = require("../utils/logger");
const authController = require("../auth/auth.controller");

/**
 * Serializes the user ID into the session.
 * @param {Object} passport - The Passport instance.
 */
const serializeUser = (passport) => {
  passport.serializeUser((user, done) => {
    logger.info(`Serializing user with userId: ${user.userId}`);
    done(null, user.userId);
  });
};

/**
 * Deserializes the user ID from the session.
 * @param {Object} passport - The Passport instance.
 */
const deserializeUser = (passport) => {
  passport.deserializeUser(async (userId, done) => {
    try {
      logger.info(`Deserializing user with userId: ${userId}`);
      const user = await authController.findByuserId(userId);
      done(null, user);
    } catch (error) {
      logger.error(
        `Error deserializing user with userId: ${userId} - ${error.message}`
      );
      done(error);
    }
  });
};

module.exports = {
  serializeUser,
  deserializeUser,
};
