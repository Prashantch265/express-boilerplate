const { createClient } = require("redis");

module.exports = function () {
  const client = createClient();
};
