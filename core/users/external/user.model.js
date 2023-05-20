const CommonEntity = require("../../common/common.entity");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    userId: {
      field: "user_id",
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      field: "first_name",
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      field: "last_name",
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    contactNo: {
      field: "contact_no",
      type: dataTypes.STRING(20),
    },
    email: {
      field: "email",
      type: dataTypes.STRING(100),
    },
    userName: {
      field: "user_name",
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      field: "password",
      type: dataTypes.STRING,
    },
    profilePic: {
      field: "profile_pic",
      type: dataTypes.STRING,
    },
    provider: {
      field: "provider",
      type: dataTypes.STRING,
    },
    otp: {
      field: "otp",
      type: dataTypes.STRING,
    },
    otpExpirationTime: {
      field: "otp_expiration_time",
      type: dataTypes.DATE,
    },
    emailOtpVerified: {
      field: "email_otp_verified",
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
    smsOtpVerified: {
      field: "sms_otp_verified",
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
    otpType: {
      field: "otp_type",
      type: dataTypes.ENUM(["web", "mobile"]),
      default: "web",
    },
    sub: {
      field: "sub",
      type: dataTypes.STRING,
    },
    accessToken: {
      field: "access_token",
      type: dataTypes.STRING,
    },
    refreshToken: {
      field: "refresh_token",
      type: dataTypes.STRING,
    },
  };

  const user = { ...obj, ...CommonEntity };
  const ExternalUser = sequelize.define("external_users", user);

  return ExternalUser;
};
