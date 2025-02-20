const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const RolesPermissions = sequelize.define("roles_permissions", {
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
    screenId: {
      field: "screen_id",
      type: DataTypes.INTEGER,
      references: {
        model: "screens",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    permissionId: {
      field: "permission_id",
      type: DataTypes.INTEGER,
      references: {
        model: "permissions",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    ...CommonEntity,
  });

  return RolesPermissions;
};
