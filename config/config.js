if (process.env.NODE_ENV && process.env.NODE_ENV === "development")
  require("dotenv").config({ path: "local.env" });

module.exports = {
  port: process.env.PORT || 3000,
  jwtConfig: {
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  postgres: {
    host: process.env.POSTGRES || "localhost",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE || "express-boilerplate",
  },
  mysql: {
    host: process.env.MYSQL || "localhost",
    user: process.env.MYSQL_USER || "prashant",
    password: process.env.MYSQL_PASSWORD || "9591",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || "testdb",
  },
  dialect: process.env.DIALECT || { postgres: "postgres", mysql: "mysql" },
  mongo: {
    uri:
      process.env.MONGO ||
      "mongodb://" +
        (process.env.IP || "localhost") +
        ":" +
        (process.env.MONGO_PORT || "27017") +
        "/hulaki",
  },
  rabbitMq: {
    host: `amqp://${process.env.RABBITMQ_HOST || "localhost"}`,
    queue: process.env.QUEUE || "testqueue",
  },
  oauth: {
    google: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    facebook: {
      appId: process.env.APP_ID,
      appSecret: process.env.APP_SECRET,
    },
  },
};
