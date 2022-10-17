const { User } = require("../../database/models/index");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

let selectQuery = `select
users.user_id as "userId", users.user_name as "userName", users.profile_pic as "profilePic", roles.name as "role", users.first_time_login as "firstTime",
case
    when students.name is not null then students.name
    when teachers.name is not null then teachers.name
end as "name"
from user_role
inner join users on user_role.user_id = users.user_id
inner join roles on roles.id = user_role.role_id
left join students on students.user_name = users.user_name
left join teachers on teachers.user_name = users.user_name
where users.is_deleted = false and users.is_active = true`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await User.findOne({ where });
};

const register = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await User.create(data);
  });
};

const update = async (data, userId) => {
  return await User.update(data, { where: { userId: userId } });
};

const remove = async (id) => {
  await User.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await db.sequelize.query(selectQuery, { type: QueryTypes.SELECT });
};

const fetchById = async (userId) => {
  const replacements = [];
  let whereQuery = ` and users.user_id = $1`;
  replacements.push(userId);
  return await db.sequelize.query(selectQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const fetchByRole = async (roleId) => {
  const replacements = [roleId];
  let whereQuery = ` and roles.id = $1 `;
  return await db.sequelize.query(selectQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const removeByUserName = async (userName) => {
  await User.update(
    { isActive: false, isDeleted: true },
    { where: { userName: userName } }
  );
  return userName;
};

module.exports = {
  register,
  update,
  findOneByField,
  remove,
  fetchAll,
  fetchById,
  fetchByRole,
  removeByUserName,
};
