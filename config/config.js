if (process.env.NODE_ENV && process.env.NODE_ENV === "development")
  require("dotenv").config({ path: "local.env" });

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  keycloakConfig: {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    realm: process.env.KEYCLOAK_REALM,
    serverUrl: process.env.KEYCLOAK_SERVER_URL,
    bearerOnly: true,
    credentials: {
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    },
  },
  postgres: {
    host: process.env.POSTGRES,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE,
  },
  mysql: {
    host: process.env.MYSQL,
    user: process.env.MYSQL_USER || "prashant",
    password: process.env.MYSQL_PASSWORD || "9591",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || "testdb",
  },
  migration: {
    dialect: process.env.DIALECT || "mysql",
    host: process.env.POSTGRES || process.env.MYSQL,
    user: process.env.POSTGRES_USER || process.env.MYSQL_USER,
    password: process.env.POSTGRES_PASSWORD || process.env.MYSQL_PASSWORD,
    database: process.env.POSTGRES_DATABASE || process.env.MYSQL_DATABASE,
  },
  mongo: {
    uri:
      process.env.MONGO ||
      "mongodb://" +
        (process.env.IP || "localhost") +
        ":" +
        (process.env.MONGO_PORT || "27017") +
        "/mernproject",
  },
};
