const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Organizations = sequelize.define(
    "organizations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING(255),
      },
      ...CommonEntity,
    },
    {
      paranoid: true,
    }
  );

  return Organizations;
};
