"use strict";

const CommonEntity = require("../common-attributes");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const obj = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      otpLength: {
        field: "otp_length",
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expirationTime: {
        field: "expiration_time",
        type: Sequelize.STRING,
        allowNull: false,
      },
      alphabets: {
        field: "alphabets",
        type: Sequelize.BOOLEAN,
        default: false,
      },
      uppercase: {
        field: "uppercase",
        type: Sequelize.BOOLEAN,
        default: false,
      },
      specialChar: {
        field: "special_char",
        type: Sequelize.BOOLEAN,
        default: false,
      },
      digits: {
        field: "digits",
        type: Sequelize.BOOLEAN,
        default: true,
      },
      type: {
        field: "type",
        type: Sequelize.ENUM(["web", "mobile"]),
        default: "web",
      },
    };

    const otpConfig = { ...obj, ...CommonEntity };

    await queryInterface.createTable("otp_configurations", otpConfig);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("otp_configurations");
  },
};
