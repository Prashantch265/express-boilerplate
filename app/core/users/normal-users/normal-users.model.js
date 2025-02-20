const CommonEntity = require("../../../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const NormalUsers = sequelize.define(
    "normal_users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        field: "first_name",
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      lastName: {
        field: "last_name",
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      isEmailVerified: {
        field: "is_email_verified",
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      phone: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      profilePicture: {
        field: "profile_picture",
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastLogin: {
        field: "last_login",
        type: DataTypes.DATE,
        allowNull: true,
      },
      oAuthProvider: {
        field: "oauth_provider",
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      oAuthId: {
        field: "oauth_id",
        type: DataTypes.STRING,
        allowNull: true,
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
    },
    {
      paranoid: true,
    }
  );

  return NormalUsers;
};
