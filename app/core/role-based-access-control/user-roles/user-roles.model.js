const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define("user_roles", {
    userId: {
      field: "user_id",
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    roleId: {
      field: "role_id",
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    ...CommonEntity,
  });

  return UserRoles;
};
