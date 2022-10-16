const CommonEntity = require("../common.model");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      field: "first_name",
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    middleName: {
      field: "middle_name",
      type: dataTypes.STRING(20),
    },
    lastName: {
      field: "last_name",
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    userName: {
      field: "user_name",
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      field: "password",
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  const user = { ...obj, ...CommonEntity };
  const User = sequelize.define("internal_users", user);

  return User;
};
