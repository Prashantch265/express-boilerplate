const db = require("@lib/sequelize");
const { organizations } = db;

const findOneByField = async (where) => {
  return await organizations.findOne({ where });
};

const getById = async (id) => {
  return await organizations.findOne({ where: { id } });
};

module.exports = { findOneByField, getById };
