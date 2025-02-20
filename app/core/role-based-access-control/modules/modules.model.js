const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Modules = sequelize.define("modules", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ...CommonEntity,
  });

  return Modules;
};
