module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.UUID,
        field: "user_id",
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userType: {
        type: DataTypes.ENUM,
        field: "user_type",
        values: ["admin", "corporate", "normal"],
        defaultValue: "normal",
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Users;
};
