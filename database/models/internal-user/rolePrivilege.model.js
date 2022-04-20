module.exports = async (sequelize, dataTypes) => {
  const RolePrivileges = sequelize.define("role_privileges", {
    roleId: {
      field: "role_id",
      type: dataTypes.INTEGER,
      references: {
        model: "roles", // refers to table name
        key: "id", // 'id' refers to column name in table
      },
    },
    privilegeId: {
      field: "privilege_id",
      type: dataTypes.INTEGER,
      references: {
        model: "privileges", // refers to table name
        key: "id", // 'id' refers to column name in table
      },
    },
  });

  return RolePrivileges;
};
