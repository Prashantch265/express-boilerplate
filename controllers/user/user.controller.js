const UserService = require("../../services/rsmp/user.service");

const registerUser = async (req, res, next) => {
  const data = req.body;
  const resData = await UserService.create(data);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const fetchAllUser = async (req, res, next) => {
  const { role } = req.query;
  if (role) {
    const resData = await UserService.getByRole(role);
    return res.json(resData);
  }
  const resData = await UserService.getAll();
  return res.json(resData);
};

const updateUser = async (req, res, next) => {
  const data = req.body;
  const userId = req.params.userId;
  const resData = await UserService.update(data, userId);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const fetchUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const resData = await UserService.getById(userId);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  const resData = await UserService.remove(userId);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

module.exports = {
  registerUser,
  fetchAllUser,
  fetchUserById,
  updateUser,
  deleteUser,
};
