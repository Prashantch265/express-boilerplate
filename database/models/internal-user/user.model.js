module.exports = async (sequelize, datatypes) => {
  const User = await sequelize.define("internal_users", {
    id: {
      type: datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      field: "first_name",
      type: datatypes.STRING(20),
      allowNull: false,
    },
    middleName: {
      field: "middle_name",
      type: datatypes.STRING(20),
    },
    lastName: {
      field: "last_name",
      type: datatypes.STRING(20),
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: datatypes.UUID,
      defaultValue: datatypes.UUIDV4,
    },
    email: {
      type: datatypes.STRING,
      allowNull: false,
    },
    userName: {
      field: "user_name",
      type: datatypes.STRING(50),
      allowNull: false,
    },
    password: {
      field: "password",
      type: datatypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
