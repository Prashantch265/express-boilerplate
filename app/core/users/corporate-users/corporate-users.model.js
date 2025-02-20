const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const CorporateUsers = sequelize.define(
    "corporate_users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organizationId: {
        field: "organization_id",
        type: DataTypes.INTEGER,
        references: {
          model: "organizations",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      normalUserId: {
        field: "normal_user_id",
        type: DataTypes.INTEGER,
        references: {
          model: "normal_users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ...CommonEntity,
    },
    {
      paranoid: true,
    }
  );

  return CorporateUsers;
};
