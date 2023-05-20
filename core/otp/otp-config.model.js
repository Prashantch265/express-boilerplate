const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    otpLength: {
      field: "otp_length",
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    expirationTime: {
      field: "expiration_time",
      type: dataTypes.STRING,
      allowNull: false,
    },
    alphabets: {
      field: "alphabets",
      type: dataTypes.BOOLEAN,
      default: false,
    },
    uppercase: {
      field: "uppercase",
      type: dataTypes.BOOLEAN,
      default: false,
    },
    specialChar: {
      field: "special_char",
      type: dataTypes.BOOLEAN,
      default: false,
    },
    digits: {
      field: "digits",
      type: dataTypes.BOOLEAN,
      default: true,
    },
    type: {
      field: "type",
      type: dataTypes.ENUM(["web", "mobile"]),
      default: "web",
    },
  };

  const otpConfig = { ...obj, ...CommonEntity };
  const OtpConfig = sequelize.define("otp_configurations", otpConfig);

  return OtpConfig;
};
