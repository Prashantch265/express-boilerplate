const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { controllers } = require("../app/users");
const { serializeUser, deserializeUser } = require("./passport-utils");
const { oauth } = require("../configs/config");
const { logger } = require("../utils");

/**
 * Configures the Google Passport strategy.
 * @param {Object} passport - The Passport instance.
 */
module.exports = (passport) => {
  // Apply modular serialization and deserialization
  serializeUser(passport);
  deserializeUser(passport);

  const userController = controllers.normalUserController;

  passport.use(
    new GoogleStrategy(
      {
        clientID: oauth.google.clientID,
        clientSecret: oauth.google.clientSecret,
        callbackURL: oauth.google.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          logger.info(`Google profile retrieved: ${profile.id}`);
          let user = await userController.find(profile);
          if (!user) {
            logger.info(
              `Creating new user for Google profile ID: ${profile.id}`
            );
            user = await userController.create(profile);
          }
          done(null, user);
        } catch (error) {
          logger.error(
            `Error handling Google profile ID: ${profile.id} - ${error.message}`
          );
          done(error, null);
        }
      }
    )
  );
};
