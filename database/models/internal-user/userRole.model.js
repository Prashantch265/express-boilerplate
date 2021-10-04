module.exports = async (sequelize, datatypes) => {
  const User = await sequelize.define("user_roles", {
    userId: {
      field: "user_id",
      type: datatypes.INTEGER,
      references: {
        model: "internal_users", // refers to table name
        key: "id", // 'id' refers to column name in table
      },
    },
    roleId: {
      field: "role_id",
      type: datatypes.INTEGER,
      references: {
        model: "roles", // refers to table name
        key: "id", // 'id' refers to column name in table
      },
    },
  });

  return User;
};
