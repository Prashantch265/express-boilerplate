const RoleService = require("../../services/user/role.service");

const addRole = async (req, res, next) => {
  const data = req.body;
  const resData = await RoleService.create(data);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const fetchAllRole = async (req, res, next) => {
  const resData = await RoleService.getAll();
  return res.json(resData);
};

const updateRole = async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const resData = await RoleService.update(data, id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const fetchRoleById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await RoleService.getById(id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const deleteRole = async (req, res, next) => {
  const id = req.params.id;
  const resData = await RoleService.remove(id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

module.exports = {
  addRole,
  updateRole,
  fetchAllRole,
  fetchRoleById,
  deleteRole,
};
