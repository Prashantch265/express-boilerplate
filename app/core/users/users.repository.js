const db = require("@lib/sequelize");
const { users } = db;
const httpContext = require("express-http-context");

const createUser = async (userType) => {
  const user = await users.create(
    { userType: userType },
    { userId: httpContext.get("user")?.userId }
  );

  return user;
};

const updateUser = async (userId, userType) => {
  await users.update(
    { userType: userType }, // Data to update
    {
      where: { id: 1 },
      userId: {
        userId: httpContext.get("user")?.userId,
      },
    } // Condition & Options
  );
};

const getByUserId = async (userId) => {
  const user = await users.findByPk(userId);
  return user;
};

const softDeleteUser = async (userId) => {
  await users.destroy({
    where: { userId: userId },
    userId: httpContext.get("user")?.userId,
  });
};

const hardDeleteUser = async (userId) => {
  await users.destroy({ where: { userId: userId }, force: true });
};

module.exports = {
  createUser,
  updateUser,
  getByUserId,
  softDeleteUser,
  hardDeleteUser,
};
