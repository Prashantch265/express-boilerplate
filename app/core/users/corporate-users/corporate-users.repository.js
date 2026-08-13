const db = require("@lib/sequelize");
const { corporate_users } = db;

const findOneByField = async (where) => {
  return await corporate_users.findOne({ where });
};

const getByUserId = async (userId) => {
  return await corporate_users.findOne({
    attributes: { exclude: ["createdBy", "updatedBy"] },
    where: { userId },
  });
};

module.exports = { findOneByField, getByUserId };
