const amqp = require("amqplib");
const { rabbitMq } = require("../config/config");
const { logger } = require("../utils/logger");

module.exports = () => {
  return new Promise((resolve, reject) => {
    amqp
      .connect(rabbitMq.host)
      .then((connection) => {
        logger.info("rabbitmq connected");
        resolve(connection);
      })
      .catch((err) => reject(err));
  });
};
