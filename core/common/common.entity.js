const { DataTypes, Sequelize } = require("sequelize");

const CommonEntity = {
  isActive: {
    field: "is_active",
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
