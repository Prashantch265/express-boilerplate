"use strict";

const CommonEntity = require("../common-attributes");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // modules — no FKs, matches
    // app/core/role-based-access-control/modules/modules.model.js
    await queryInterface.createTable("modules", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ...CommonEntity,
    });

    // screens — FK to modules, matches
    // app/core/role-based-access-control/screens/screens.model.js
    await queryInterface.createTable("screens", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      module_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "modules",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ...CommonEntity,
    });

    // permissions — no FKs, matches
    // app/core/role-based-access-control/permissions/permissions.model.js
    await queryInterface.createTable("permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ...CommonEntity,
    });

    // api_endpoints — FK to screens, matches
    // app/core/role-based-access-control/api-endpoints/api-endpoints.model.js
    await queryInterface.createTable("api_endpoints", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      endpoint: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      http_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      screen_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "screens",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ...CommonEntity,
    });

    // roles — no FKs, matches
    // app/core/role-based-access-control/roles/roles.model.js
    await queryInterface.createTable("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ...CommonEntity,
    });

    // user_roles — FKs to users + roles, matches
    // app/core/role-based-access-control/user-roles/user-roles.model.js
    await queryInterface.createTable("user_roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ...CommonEntity,
    });

    // roles_permissions — FKs to roles + screens + permissions, matches
    // app/core/role-based-access-control/roles-permissions/roles-permissions.model.js
    await queryInterface.createTable("roles_permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      screen_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "screens",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "permissions",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ...CommonEntity,
    });
  },

  async down(queryInterface) {
    // Reverse FK-safe order.
    await queryInterface.dropTable("roles_permissions");
    await queryInterface.dropTable("user_roles");
    await queryInterface.dropTable("roles");
    await queryInterface.dropTable("api_endpoints");
    await queryInterface.dropTable("permissions");
    await queryInterface.dropTable("screens");
    await queryInterface.dropTable("modules");
  },
};
