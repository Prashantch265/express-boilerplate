const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../configs/config");
const { services } = require("../app/core/users");
const { logger } = require("../utils/logger");

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtConfig.accessTokenSecret;
opts.algorithms = "HS256";
//other options
// opts.issuer = '';
// opts.audience = '';
// opts.ignoreExpiration = false;
// opts.passReqToCallback = false;
// opts.jsonWebTokenOptions = {
//         complete: false,
//         clockTolerance: '',
//         maxAge: '2d', // 2 days
//         clockTimestamp: '100',
//         nonce: 'string here for OpenID'
//     };

/**
 * Passport JWT strategy to validate and authenticate users based on their type.
 * This strategy dynamically picks the right user service based on the user type in the JWT payload.
 *
 * @param {Object} passport - The Passport instance to which this strategy is added.
 */
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Dynamically determine the appropriate service based on userType
        let userService;
        switch (jwt_payload.userType) {
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
            logger.error("Invalid userType in JWT payload");
            return done(null, false, { message: "Invalid user type" });
        }

        // Fetch user based on USER_ID from the appropriate service
        const user = await userService.getUserByUserId(jwt_payload.sub);
        if (user) {
          return done(null, user);
        } else {
          logger.warn(`User not found for ID: ${jwt_payload.sub}`);
          return done(null, false, { message: "User not found" });
        }
      } catch (err) {
        logger.error(`Error in JWT strategy: ${err.message}`);
        return done(err, false);
      }
    })
  );
};
