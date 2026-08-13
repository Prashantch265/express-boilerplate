const FacebookStrategy = require("passport-facebook").Strategy;
const { controllers } = require("../app/core/users");
const { serializeUser, deserializeUser } = require("./utils.passport");
const { oauth } = require("../configs/config");
const { facebook } = oauth;
const { logger } = require("../utils");

/**
 * Configures the Facebook Passport strategy.
 * @param {Object} passport - The Passport instance.
 */
module.exports = (passport) => {
  // Apply modular serialization and deserialization
  serializeUser(passport);
  deserializeUser(passport);

  const userController = controllers.normalUserController;

  passport.use(
    new FacebookStrategy(
      {
        clientID: facebook.clientID,
        clientSecret: facebook.clientSecret,
        callbackURL: facebook.callbackURL,
        profileFields: facebook.profileFields,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          logger.info(`Facebook profile retrieved: ${profile.id}`);
          let user = await userController.find(profile);
          if (!user) {
            logger.info(
              `Creating new user for Facebook profile ID: ${profile.id}`
            );
            user = await userController.create(profile);
          }
          done(null, user);
        } catch (error) {
          logger.error(
            `Error handling Facebook profile ID: ${profile.id} - ${error.message}`
          );
          done(error, null);
        }
      }
    )
  );
};
