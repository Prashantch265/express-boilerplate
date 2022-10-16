const UserData = require("../../data/user/user.data");
const RoleData = require("../../data/user/role.data");
const bcrypt = require("bcrypt");
const { errorResponse } = require("../../utils");
const { successResponse } = require("../../utils");

const create = async (data) => {
  const { email, password, roleId } = data;
  if (!roleId) {
    const { id } = await RoleData.findOneByField({ name: "buyer" });
    data.roleId = id;
  }
  const checkData = await UserData.findOneByField({ email: email });
  if (checkData) {
    return errorResponse(400, "duplicateData", "user");
  }

  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(password, salt);
  const res = await UserData.register(data);
  return res;
};

const update = async (data, userId) => {
  const checkData = await UserData.findOneByField({ userId: userId });
  if (!checkData) {
    return errorResponse(400, "notFound", "user");
  }

  const updatedData = { ...data, ...checkData };
  const res = await UserData.update(updatedData, userId);
  return successResponse(200, res, "update", "user");
};

const remove = async (userId) => {
  const checkData = await UserData.findOneByField({ userId: userId });
  if (!checkData) {
    return errorResponse(400, "notFound", "user");
  }
  if (checkData.isPermanent) return errorResponse(400, "permanentData", "user");
  const res = await UserData.remove(userId);
  return successResponse(200, res, "delete", "role");
};

const getAll = async () => {
  const res = await UserData.fetchAll();
  return res;
};

const getById = async (userId) => {
  const res = await UserData.fetchByUserId(userId);
  return res;
};

const getByRole = async (role) => {
  const res = await UserData.findByRole(role);
  return res;
};

module.exports = { create, update, remove, getAll, getById, getByRole };
