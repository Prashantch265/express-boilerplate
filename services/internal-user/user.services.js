const HttpException = require('../../utils/HttpException');
const UserData = require('../../data/internal-user/user.data');
const bcrypt = require('bcrypt');


const create = async (data) => {
    const { firstName, lastName, email, password } = data;
    const checkData = await UserData.findOneByField({ email: email });
    if (checkData) {
        throw new HttpException(400, 'duplicateData', 'user')
    }

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(password, salt);
    data.userName = firstName + '.' + lastName;
    const res = await UserData.register(data);
    return res;
}

const update = async (data, id) => {
    const checkData = await UserData.findOneByField({ id: id });
    if (!checkData) {
        throw new HttpException(400, 'notFound', 'user')
    }

    const updatedData = { ...data, ...checkData };
    const res = await UserData.update(updatedData);
    return res;
}

const remove = async (id) => {
    const checkData = await UserData.findOneByField({ id: id });
    if (!checkData) {
        throw new HttpException(400, 'notFound', 'user')
    }
    await UserData.remove(id);
    return id;
}

const getAll = async () => {
    const res = await UserData.fetchAll();
    return res;
}

const getById = async (id) => {
    const res = await UserData.findOneByField({ id: id });
    return res;
}

module.exports = { create, update, remove, getAll, getById };