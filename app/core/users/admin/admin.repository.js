const db = require("@lib/sequelize");
const { admins } = db;
const httpContext = require("express-http-context");
const UsersRepository = require("@app/core/users/users.repository");
const {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} = require("@exceptions");

const findOneAdmin = async (options) => {
  const admin = await admins.findOne(options);

  return admin;
};

const createAdmin = async (admin) => {
  const existingAdmin = await findOneAdmin({ where: { email: admin.email } });

  if (existingAdmin)
    throw new ConflictException("Admin with this email already exists");

  const user = await UsersRepository.createUser("admin");

  if (user && user.userId) {
    const adminProfile = { ...admin, ...{ userId: user.userId } };
    const newAdmin = await admins.create(adminProfile, {
      userId: httpContext.get("user")?.userId,
    });

    return newAdmin;
  }
};

const updateAdmin = async (admin, userId) => {
  const existingAdmin = await findOneAdmin({ where: { userId: userId } });
  if (!existingAdmin) throw new NotFoundException("User not found");

  await admins.update(admin, {
    where: { userId: userId },
    userId: httpContext.get("user")?.userId,
  });

  return await findOneAdmin({ where: { userId: userId } });
};

const getAllAdmins = async (limit, offset, sortOrder, sortBy) => {
  const { count, rows } = await admins.findAndCountAll({
    attributes: [
      "userId",
      "name",
      "email",
      "superAdmin",
      "isActive",
      "createdAt",
    ],
    limit,
    offset,
    order: [[sortBy, sortOrder]],
  });

  return { count, rows };
};

const getAdminByUserId = async (userId) => {
  const admin = await findOneAdmin({
    attributes: { exclude: ["password", "id", "createdBy", "updatedBy"] },
    where: { userId: userId },
  });

  return admin;
};

const hardDeleteAdmin = async (userId) => {
  const admin = await findOneAdmin({
    attributes: ["superAdmin"],
    where: { userId: userId },
  });

  if (admin?.superAdmin)
    throw new ForbiddenException("Superadmin can't be deleted");

  return Promise.all([
    UsersRepository.hardDeleteUser(userId),
    admins.destroy({
      where: { userId: userId, superAdmin: false },
    }),
  ]);
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminByUserId,
  hardDeleteAdmin,
};
