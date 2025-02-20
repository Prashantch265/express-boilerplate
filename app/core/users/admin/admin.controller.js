const { successResponse } = require("@utils");
const AdminService = require("./admin.service");

const createAdmin = async (req, res, next) => {
  try {
    const adminData = req.body;
    const newAdmin = await AdminService.createNewAdmin(adminData);
    return successResponse(res, newAdmin, "create", "admin");
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    const adminData = req.body;
    const updatedAdmin = await AdminService.updateExistingAdmin(
      adminData,
      userId
    );
    return successResponse(res, updatedAdmin, "update", "admin");
  } catch (error) {
    next(error);
  }
};

const getAllAdmins = async (req, res, next) => {
  try {
    const { page, size, sort, sortBy } = req.query;
    const admins = await AdminService.getAllAdminUsers(
      page,
      size,
      sort,
      sortBy
    );
    return successResponse(res, admins, "fetch", "admin");
  } catch (error) {
    next(error);
  }
};

const getAdminById = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    const admin = await AdminService.getAdminDetailsByUserId(userId);
    return successResponse(res, admin, "fetch", "admin");
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    const result = await AdminService.deleteAdmin(userId);
    return successResponse(res, result, "delete", "admin");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
};
