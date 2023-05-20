const CommonEntity = require("../../common/common.entity");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    userId: {
      field: "user_id",
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      field: "full_name",
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    contactNo: {
      field: "contact_no",
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      field: "email",
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    userName: {
      field: "user_name",
      type: dataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      field: "password",
      type: dataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      field: "profile_pic",
      type: dataTypes.STRING,
    },
    firstTimeLogin: {
      field: "first_time_login",
      type: dataTypes.BOOLEAN,
      defaultValue: true,
    },
  };

  const user = { ...obj, ...CommonEntity };
  const InternalUser = sequelize.define("internal_users", user);

  return InternalUser;
};
