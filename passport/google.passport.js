const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userCtrl = require("../controller/user.controller");
const authCtrl = require("../controller/auth.controller");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });

  passport.deserializeUser((uid, done) => {
    authCtrl.findByUid(uid).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/cb",
      },
      (acesstoken, refreshtoken, profile, done) => {
        // passport callback function
        console.log(profile);
        try {
          userCtrl.find(profile).then((user) => {
            if (!user) {
              userCtrl.create(profile).then((newUser) => {
                console.log(newUser);
                done(null, newUser);
              });
            } else {
              console.log(user);
              done(null, user);
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
