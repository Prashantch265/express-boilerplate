const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/config");
const UserData = require("../data/rsmp/users.data");

const signAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: user.userId,
      iat: Date.now(),
    };

    const expiresIn = "1h" || jwtConfig.accessTokenExpiresIn;
    jwt.sign(
      payload,
      jwtConfig.accessTokenSecret,
      {
        expiresIn: expiresIn,
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(err);
          return;
        }

        resolve(token);
      }
    );
  });
};

const signRefreshToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: user.userId,
      iat: Date.now(),
    };

    jwt.sign(
      payload,
      jwtConfig.refreshTokenSecret,
      {
        expiresIn: "2h" || jwtConfig.refreshTokenExpiresIn,
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(err);
          return;
        }
        resolve(token);
      }
    );
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, jwtConfig.refreshTokenSecret, (err, payload) => {
      if (err) return reject(err);
      const userId = payload.sub;
      UserData.findOneByField({ userId: userId }).then((userInfo) =>
        resolve(userInfo)
      );
    });
  });
};

module.exports = { signAccessToken, signRefreshToken, verifyRefreshToken };
