const { Role } = require("../../database/models");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Role.findOne({ where });
};

const add = async (data) => {
  return await Role.create(data);
};

const update = async (data, id) => {
  return await Role.update(data, { where: { id: id } });
};

const remove = async (id) => {
  await Role.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await Role.findAll({ where: { isActive: true, isDeleted: false } });
};

module.exports = { findOneByField, add, update, fetchAll, remove };
