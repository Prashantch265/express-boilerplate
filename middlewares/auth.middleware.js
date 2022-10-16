const httpContext = require("express-http-context");
const passport = require("passport");
const { unprotectedRoutes } = require("../config/protect");
const { match } = require("node-match-path");

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
      passport.authenticate("jwt", { session: false })(req, res, async () => {
        const userInfo = (({ userId, userName, name, role }) => ({
          userId,
          userName,
          name,
          role,
        }))(req.user[0]);
        httpContext.set("user", userInfo);
        next();
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddleware };
