const Privilege = require("../../database/models/internal-user/privilege.model");
const { db } = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Privilege.findOne({ where });
};

const register = async (data, userId) => {
  return await Privilege.create(data, { userId });
};

const update = async (data) => {
  return await Privilege.save(data);
};

const remove = async (id, userId) => {
  await Privilege.update(
    { isActive: false, isDeleted: true, updatedBy: userId },
    { where: { id: id } }
  );
  return id;
};

module.exports = { register, update, findOneByField, remove };
