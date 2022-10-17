const UserRoleData = require("../../data/rsmp/user-role.data");
const UserData = require("../../data/rsmp/user.data");
const RoleData = require("../../data/rsmp/role.data");
const { errorResponse } = require("../../utils");

const validateForeignKey = async (userId, roleId) => {
  const user = await UserData.findOneByField({ userId: userId });
  if (!user) return errorResponse(400, "notFound", "user");

  const role = await RoleData.findOneByField({ id: roleId });
  if (!role) return errorResponse(400, "notFound", "role");

  return;
};

const add = async (data) => {
  const { userId, roleId } = data;
  await validateForeignKey(userId, roleId);
  await UserRoleData.add(data);
  return;
};

const update = async (data, id) => {};

const remove = async (id) => {};

module.exports = { add, update, remove };
