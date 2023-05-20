const { Sequelize } = require("sequelize");

const CommonEntity = {
  isActive: {
    field: "is_active",
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  createdBy: {
    field: "created_by",
    type: Sequelize.UUID,
  },
  updatedBy: {
    field: "updated_by",
    type: Sequelize.UUID,
  },
};

module.exports = CommonEntity;
