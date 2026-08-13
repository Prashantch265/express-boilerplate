const { getPaginationParams } = require("@utils");
const AdminRepository = require("./admin.repository");
const bcrypt = require("bcrypt");
const { formatPaginatedResponse } = require("@utils/index");
const { AuthException } = require("@exceptions");

const createNewAdmin = async (admin) => {
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  const newAdmin = await AdminRepository.createAdmin(admin);
  return newAdmin;
};

const updateExistingAdmin = async (admin, userId) => {
  if (admin.password) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }

  const updatedAdmin = await AdminRepository.updateAdmin(admin, userId);
  return updatedAdmin;
};

const getAllAdminUsers = async (pageNo, size, sort, sortBy) => {
  const {
    limit,
    offset,
    sortOrder,
    sortBy: defaultSortBy,
  } = getPaginationParams(pageNo, size, sort, sortBy);
  const { rows, count } = await AdminRepository.getAllAdmins(
    limit,
    offset,
    sortOrder,
    defaultSortBy
  );

  return formatPaginatedResponse(count, rows, limit, offset);
};

const getUserByUserId = async (userId) => {
  return await AdminRepository.getAdminByUserId(userId);
};

const deleteAdmin = async (userId) => {
  const result = await AdminRepository.hardDeleteAdmin(userId);
  return result;
};

// Used by the JWT passport strategy (which only knows userId + userType) and
// by the password login flow below.
const validateCredentials = async (email, password) => {
  const admin = await AdminRepository.findOneAdmin({ where: { email } });
  if (!admin) throw new AuthException("invalid Email or Password");

  const passwordMatches = await bcrypt.compare(password, admin.password);
  if (!passwordMatches) throw new AuthException("invalid Email or Password");

  return await AdminRepository.getAdminByUserId(admin.userId);
};

module.exports = {
  createNewAdmin,
  updateExistingAdmin,
  getAllAdminUsers,
  getUserByUserId,
  deleteAdmin,
  validateCredentials,
};
