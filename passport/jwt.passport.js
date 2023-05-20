const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/config");
const UserService = require("../services/rsmp/users.service");

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

//JWT payload is passed into the verify callback
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserService.getUserById(jwt_payload.sub)
        .then((user) => {
          //It is the same as implemented in the `passport-local` strategy
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => done(err, null));
    })
  );
};
