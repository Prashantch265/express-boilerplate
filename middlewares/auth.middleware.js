const httpContext = require("express-http-context");
const passport = require("passport");
const { unprotectedRoutes } = require("../configs/protect");
const { match } = require("node-match-path");
const { AuthException } = require("../exceptions");

const authMiddleware = (req, res, next) => {
  try {
    let isMatch = false;
    unprotectedRoutes.forEach((route) => {
      const { matches } = match(route, req.path);
      if (matches) {
        isMatch = true;
      }
    });
    if (isMatch) {
      next();
    } else {
      passport.authenticate("jwt", { session: false })(req, res, () => {
        try {
          // Passport strategies can call done(null, user) with either a
          // single user object or (as this project's does in some places)
          // an array wrapping it - normalize to a single object.
          const user = Array.isArray(req.user) ? req.user[0] : req.user;

          if (!user) {
            throw new AuthException(
              "You are not authenticated to access this resource."
            );
          }

          const { userId, userType, email, fullName, role } = user;
          httpContext.set("user", { userId, userType, email, fullName, role });
          next();
        } catch (err) {
          next(err);
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddleware };
