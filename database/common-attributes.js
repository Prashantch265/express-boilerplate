const CommonEntity = require("../app/common/common.entity");

// Migrations need the *column* name as the key - queryInterface.createTable
// uses each key literally as the column - whereas the model-side
// definition (app/common/common.entity.js) keys by the camelCase
// attribute name and remaps to its column via `field:`. Derive the
// migration-side shape from that single source instead of maintaining a
// second, independent copy of these columns that could drift out of sync.
const migrationCommonEntity = Object.fromEntries(
  Object.values(CommonEntity).map(({ field, ...columnDef }) => [
    field,
    columnDef,
  ])
);

module.exports = migrationCommonEntity;
