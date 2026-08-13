"use strict";

const CommonEntity = require("../common-attributes");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // users — base entity every user type is linked to via user_id.
    // Matches app/core/users/users.model.js (paranoid, custom created_at/updated_at,
    // no CommonEntity spread — no is_active/created_by/updated_by here).
    await queryInterface.createTable("users", {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_type: {
        type: Sequelize.ENUM("admin", "corporate", "normal"),
        defaultValue: "normal",
        allowNull: false,
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
      deleted_at: {
        type: Sequelize.DATE,
      },
    });

    // organizations — no FKs, matches app/core/users/organizations/organizations.model.js
    await queryInterface.createTable("organizations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      domain: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING(255),
      },
      ...CommonEntity,
      deleted_at: {
        type: Sequelize.DATE,
      },
    });

    // normal_users — FK to users, matches app/core/users/normal-users/normal-users.model.js
    await queryInterface.createTable("normal_users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      phone: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      profile_picture: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      oauth_provider: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      oauth_id: {
        type: Sequelize.STRING,
        allowNull: true,
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
      ...CommonEntity,
      deleted_at: {
        type: Sequelize.DATE,
      },
    });

    // admins — FK to users, matches app/core/users/admin/admin.model.js
    await queryInterface.createTable("admins", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      super_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      ...CommonEntity,
    });

    // corporate_users — FKs to organizations + normal_users, matches
    // app/core/users/corporate-users/corporate-users.model.js
    await queryInterface.createTable("corporate_users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "organizations",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      normal_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "normal_users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ...CommonEntity,
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    // Reverse FK-safe order.
    await queryInterface.dropTable("corporate_users");
    await queryInterface.dropTable("admins");
    await queryInterface.dropTable("normal_users");
    await queryInterface.dropTable("organizations");
    await queryInterface.dropTable("users");
    // Postgres doesn't drop the ENUM type dropTable() leaves behind —
    // without this, re-running `up` after a revert fails with
    // "type enum_users_user_type already exists".
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_user_type";'
    );
  },
};
