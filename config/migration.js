if (process.env.NODE_ENV && process.env.NODE_ENV === "development")
  require("dotenv").config({ path: "local.env" });

const pgMigrationConfig = {
  host: process.env.POSTGRES || "localhost",
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DATABASE || "express-boilerplate",
  dialect: "postgresql",
};

const mysqlMigrationConfig = {
  host: process.env.MYSQL || "localhost",
  username: process.env.MYSQL_USER || "mysql",
  password: process.env.MYSQL_PASSWORD || "mysql",
  database: process.env.MYSQL_DATABASE || "express-boilerplate",
  dialect: "mysql",
};

if (process.env.dialect === "postgres") module.exports = pgMigrationConfig;
else module.exports = mysqlMigrationConfig;
