const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define("admins", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superAdmin: {
      field: "super_admin",
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      field: "user_id",
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    ...CommonEntity,
  });

  return Admins;
};
