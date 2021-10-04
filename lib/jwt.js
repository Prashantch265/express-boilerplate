const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const issueJwt = (user) => {
  const payload = {
    sub: user.uid,
    iat: Date.now(),
  };

  const expiresIn = 900;

  const signedToken = jwt.sign(payload, jwtSecret, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
};

module.exports = { issueJwt };
