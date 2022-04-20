const { successResponse } = require('../../utils');
const UserService = require('../../services/internal-user/user.services');

const registerUser = async (req, res) => {
    const data = req.body;
    const resData = await UserService.create(data);
    return successResponse(res, 200, resData, 'create', 'internal-user', 'internal-user registered successfully');
}

const fetchAllUser = async (req, res) => {
    const resData = await UserService.getAll();
    return successResponse(res, 200, resData, 'fetch', 'internal-user', 'internal-user fetched successfully');
}

module.exports = { registerUser, fetchAllUser };
