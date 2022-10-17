const RoleData = require("../../data/rsmp/role.data");
const HttpException = require("../../utils/httpException");

const add = async (data) => {
  const existingRole = await RoleData.findOneByField({ name: data.name });
  if (existingRole) throw new HttpException(400, "duplicateData", "role");
  const res = await RoleData.add(data);
  return res;
};

const update = async (data, id) => {
  const existingRole = await RoleData.findOneByField({ id: id });
  if (!existingRole) throw new HttpException(400, "notFound", "role");
  const updatedRole = { ...data, ...existingRole };
  const res = await RoleData.update(updatedRole, id);
  return res;
};

const getAll = async () => {
  const res = await RoleData.fetchAll();
  return res;
};

const getById = async (id) => {
  const res = await RoleData.findOneByField({ id: id });
  if (!res) throw new HttpException(400, "notFound", "fetch", "role");
  return res;
};

const remove = async (id) => {
  const res = await RoleData.remove(id);
  return res;
};

module.exports = { add, update, getAll, getById, remove };
