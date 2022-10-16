const { InternalUser } = require("../../database/models/index");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await InternalUser.findOne({ where });
};

const register = async (data) => {
  return await InternalUser.create(data);
};

const update = async (data) => {
  return await InternalUser.save(data);
};

const remove = async (id) => {
  await InternalUser.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await InternalUser.findAll({
    where: { isActive: true, isDeleted: false },
  });
};

module.exports = { register, update, findOneByField, remove, fetchAll };
