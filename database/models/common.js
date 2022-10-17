const { DataTypes } = require("sequelize");

const CommonEntity = {
  isActive: {
    field: "is_active",
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDeleted: {
    field: "is_deleted",
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdBy: {
    field: "created_by",
    type: DataTypes.UUID,
  },
  updatedBy: {
    field: "updated_by",
    type: DataTypes.UUID,
  },
};

module.exports = CommonEntity;
