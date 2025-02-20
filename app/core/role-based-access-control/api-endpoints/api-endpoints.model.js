const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const ApiEndpoints = sequelize.define("api_endpoints", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    endpoint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    httpMethod: {
      feild: "http_method",
      type: DataTypes.STRING,
      allowNull: false,
    },
    screenId: {
      field: "screen_id",
      type: DataTypes.INTEGER,
      references: {
        model: "screens",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    ...CommonEntity,
  });

  return ApiEndpoints;
};
