const { postgres, mysql } = require("../config/config");
const glob = require("glob");
const { Sequelize, DataTypes } = require("sequelize");
const { logger } = require("../utils/logger");
const { isIterable } = require("../utils");

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  dialect: "mysql",
  host: mysql.host,
  pool: {
    max: 5,
    idle: 30000,
  },
  define: {
    underscored: true,
    hooks: {
      beforeCreate(instance, options) {
        if (options.userId) {
          instance.createdBy = instance.createdBy || options.userId;
          instance.updatedBy = instance.updatedBy || options.userId;
        }
      },
      beforeBulkCreate(instances, options) {
        if (isIterable(instances)) {
          instances.forEach((instance) => {
            if (options.userId || instance.createdBy) {
              instance.createdBy = instance.createdBy || options.userId;
              instance.updatedBy = instance.updatedBy || options.userId;
            }
          });
        }
      },
      beforeUpdate(instance, options) {
        if (options.userId) {
          instance.updatedBy = options.userId;
        }
      },
      beforeBulkUpdate(instances, options) {
        if (isIterable(instances)) {
          instances.forEach((instance) => {
            if (instance.createdBy && options.userId) {
              instance.updatedBy = options.userId;
            }
          });
        }
      },
    },
  },
});

const models = glob.sync(__dirname + `/../database/models/internal-user/*.model.js`);

models.forEach((modelFile) => {
  if (process.env.NODE_ENV === "development") logger.info("Model :: " + modelFile);

  require(modelFile)(sequelize, DataTypes);
});

module.exports = sequelize;
