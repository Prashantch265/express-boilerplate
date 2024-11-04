const CommonEntity = require("./common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const AppConfig = sequelize.define("app_configs", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ...CommonEntity,
  });

  return AppConfig;
};
