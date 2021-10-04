module.exports = async (sequelize, datatypes) => {
  const Privilege = await sequelize.define("privileges", {
    id: {
      type: datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    privilegeName: {
      field: "privilege_name",
      type: datatypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: datatypes.TEXT("tiny"),
    },
  });

  return Privilege;
};
