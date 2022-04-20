const CommonEntity = require("../common.model");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      field: "role_name",
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT("tiny"),
    },
  };

  const role = { ...obj, ...CommonEntity }

  const Role = sequelize.define("roles", role);
  return Role;
};
