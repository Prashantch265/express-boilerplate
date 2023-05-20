const db = require("../../lib/sequelize");

const { otp_configurations } = db;

const findOneByField = async (where) => {
  where = { ...where, isActive: true };
  return await otp_configurations.findOne({ where });
};

const addOtpConfig = async (payload) => {
  return await otp_configurations.create(payload);
};

const findAll = async () => {
  return await otp_configurations.findAll();
};

module.exports = { findOneByField, findAll, addOtpConfig };
