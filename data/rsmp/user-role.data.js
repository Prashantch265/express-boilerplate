const { UserRole } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await UserRole.findOne({ where });
};

const add = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await UserRole.create(data);
  });
};

const update = async (data, id) => {
  return await UserRole.update(data, id);
};

const remove = async (id) => {
  await UserRole.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

module.exports = { add, update, findOneByField, remove };
