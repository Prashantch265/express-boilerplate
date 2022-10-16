const db = require("../../lib/sequelize");
module.exports = {
  InternalUser: db.internal_users,
  Role: db.roles,
  Privilege: db.privileges,
};
