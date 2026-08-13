const db = require("@lib/sequelize");
const { normal_users } = db;

const findOneByField = async (where) => {
  return await normal_users.findOne({ where });
};

const getByUserId = async (userId) => {
  return await normal_users.findOne({
    attributes: { exclude: ["password", "createdBy", "updatedBy"] },
    where: { userId },
  });
};

module.exports = { findOneByField, getByUserId };
