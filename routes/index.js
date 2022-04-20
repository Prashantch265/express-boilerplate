const glob = require("glob");
const { logger } = require("../utils/logger");

module.exports = function(app) {
  const routers = glob.sync(__dirname + `/../routes/*.route.js`);
  routers.forEach((route) => {
    if (process.env.NODE_ENV === "development") logger.info(`Route: ${route}`);
    require(route)(app);
  });
};
