// Load environment variables from the corresponding .env file
// If NODE_ENV is not defined, it will load from the default ".env" file
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || ".env"}` });

/**
 * PostgreSQL migration configuration
 * It uses environment variables with default fallback values in case they are not provided.
 * `dialect` is set to "postgresql" for PostgreSQL migrations.
 */
const pgMigrationConfig = {
  host: process.env.POSTGRES || "localhost", // PostgreSQL host
  username: process.env.POSTGRES_USER || "postgres", // PostgreSQL username
  password: process.env.POSTGRES_PASSWORD || "postgres", // PostgreSQL password
  database: process.env.POSTGRES_DATABASE || "express-boilerplate", // PostgreSQL database name
  dialect: "postgresql", // Specify the dialect for PostgreSQL
};

/**
 * MySQL migration configuration
 * Similarly, it uses environment variables with default fallback values.
 * `dialect` is set to "mysql" for MySQL migrations.
 */
const mysqlMigrationConfig = {
  host: process.env.MYSQL || "localhost", // MySQL host
  username: process.env.MYSQL_USER || "mysql", // MySQL username
  password: process.env.MYSQL_PASSWORD || "mysql", // MySQL password
  database: process.env.MYSQL_DATABASE || "express-boilerplate", // MySQL database name
  dialect: "mysql", // Specify the dialect for MySQL
};

// Retrieve the database dialect from environment variables or default to PostgreSQL
const dialect = process.env.DIALECT || "postgres";

// Export the configuration based on the database dialect
// If the dialect is "postgres", PostgreSQL config will be used
// Otherwise, MySQL config will be used
module.exports =
  dialect === "postgres" ? pgMigrationConfig : mysqlMigrationConfig;

// Log which environment and dialect are being used
console.log(
  `Using ${
    process.env.NODE_ENV || "default"
  } environment and ${dialect} dialect`
);
