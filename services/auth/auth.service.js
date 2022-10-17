const UserData = require("../../data/rsmp/user.data");
const RoleData = require("../../data/rsmp/role.data");
const UserRoleData = require("../../data/rsmp/user-role.data");
const { HttpException } = require("../../exceptions/");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../../lib/jwt");

const authenticate = async (userName, password) => {
  const user = await UserData.findOneByField({ userName: userName });
  if (!user) throw new HttpException(400, "invalidCredential");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new HttpException(400, "invalidCredential");

  const accessToken = await signAccessToken(user);

  const { roleId } = await UserRoleData.findOneByField({
    userId: user.userId,
  });

  const { name } = await RoleData.findOneByField({ id: roleId });
  return { accessToken: accessToken, role: name };
};

const init = async (userId) => {
  const user = await UserData.fetchById(userId);
  if (!user) throw new HttpException(400, "notFound", "user");
  return user;
};

module.exports = { authenticate, init };
