const { getPaginationParams } = require("@utils");
const AdminRepository = require("./admin.repository");
const bcrypt = require("bcrypt");
const { formatPaginatedResponse } = require("@utils/index");

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

const getAdminDetailsByUserId = async (userId) => {
  return await AdminRepository.getAdminByUserId(userId);
};

const deleteAdmin = async (userId) => {
  const result = await AdminRepository.hardDeleteAdmin(userId);
  return result;
};

module.exports = {
  createNewAdmin,
  updateExistingAdmin,
  getAllAdminUsers,
  getAdminDetailsByUserId,
  deleteAdmin,
};
