module.exports = async (sequelize, datatypes) => {
  const Role = await sequelize.define("roles", {
    id: {
      type: datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      field: "role_name",
      type: datatypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: datatypes.TEXT("tiny"),
    },
  });

  return Role;
};
