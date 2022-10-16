const RoleData = require("../../data/user/role.data");
const UserData = require("../../data/user/user.data");
const { errorResponse } = require("../../utils");
const { successResponse } = require("../../utils");

const checkChild = async (id) => {
  const user = await UserData.findOneByField({ roleId: id });
  if (user) return errorResponse(400, "childExists", ["role", "user"]);
};

const create = async (data) => {
  const checkData = await RoleData.findOneByField({ name: data.name });
  if (checkData) return errorResponse(400, "duplicateData", "role");

  const res = await RoleData.add(data);
  return res;
};

const update = async (data, id) => {
  const checkData = await RoleData.findOneByField({ id: id });
  if (!checkData) return errorResponse(400, "notFound", "role");
  if (checkData.isPermanent) return errorResponse(400, "permanentData", "role");

  const updatedData = { ...data, ...checkData };
  const res = await RoleData.update(updatedData, id);
  return successResponse(200, res, "update", "role");
};

const remove = async (id) => {
  const checkData = await RoleData.findOneByField({ id: id });
  if (!checkData) return errorResponse(400, "notFound", "role");

  if (checkData.isPermanent) return errorResponse(400, "permanentData", "role");
  const res = await RoleData.remove(id);
  return successResponse(200, res, "delete", "role");
};

const getAll = async () => {
  const res = await RoleData.fetchAll();
  return res;
};

const getById = async (id) => {
  const res = await RoleData.findOneByField({ id: id });
  if (!res) return errorResponse(400, "notFound", "role");
  return res;
};

module.exports = { create, update, remove, getAll, getById };
