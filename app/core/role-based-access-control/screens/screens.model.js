const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Screens = sequelize.define("screens", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    moduleId: {
      field: "module_id",
      type: DataTypes.INTEGER,
      references: {
        model: "modules",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    ...CommonEntity,
  });

  return Screens;
};
