const { Sequelize } = require("sequelize");

// NOTE: these keys become actual column names when spread into
// queryInterface.createTable(...) in migrations (unlike the model-side
// app/common/common.entity.js, where `field:` remaps a camelCase attribute
// name to its snake_case column). Keys here must already be snake_case to
// match the models' `underscored: true` mapping. See issue #14 for
// consolidating this with app/common/common.entity.js.
const CommonEntity = {
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  created_by: {
    type: Sequelize.UUID,
  },
  updated_by: {
    type: Sequelize.UUID,
  },
};

module.exports = CommonEntity;
