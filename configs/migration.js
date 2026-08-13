// Load environment variables from the corresponding .env file
// If NODE_ENV is not defined, it will load from the default ".env" file
require("dotenv").config({
  path: `.env${process.env.NODE_ENV ? "." + process.env.NODE_ENV : ""}`,
});

/**
 * PostgreSQL migration configuration
 * It uses environment variables with default fallback values in case they are not provided.
 * `dialect` is set to "postgresql" for PostgreSQL migrations.
 */
const pgMigrationConfig = {
  host: process.env.POSTGRES || "localhost", // PostgreSQL host
  username: process.env.POSTGRES_USER, // PostgreSQL username (required)
  password: process.env.POSTGRES_PASSWORD, // PostgreSQL password (required)
  database: process.env.POSTGRES_DATABASE || "express-boilerplate", // PostgreSQL database name
  dialect: "postgres", // Specify the dialect for PostgreSQL
};

/**
 * MySQL migration configuration
 * Similarly, it uses environment variables with default fallback values.
 * `dialect` is set to "mysql" for MySQL migrations.
 */
const mysqlMigrationConfig = {
  host: process.env.MYSQL || "localhost", // MySQL host
  username: process.env.MYSQL_USER, // MySQL username (required)
  password: process.env.MYSQL_PASSWORD, // MySQL password (required)
  database: process.env.MYSQL_DATABASE || "express-boilerplate", // MySQL database name
  dialect: "mysql", // Specify the dialect for MySQL
};

// Retrieve the database dialect from environment variables or default to PostgreSQL
const dialect = process.env.DIALECT || "postgres";

// Fail fast on missing credentials for whichever dialect is actually
// selected, rather than falling back to a hardcoded default.
const requiredVars =
  dialect === "postgres"
    ? ["POSTGRES_USER", "POSTGRES_PASSWORD"]
    : ["MYSQL_USER", "MYSQL_PASSWORD"];
const missingVars = requiredVars.filter((key) => !process.env[key]);
if (missingVars.length) {
  throw new Error(
    `Missing required environment variable(s): ${missingVars.join(
      ", "
    )}. See .env.example.`
  );
}

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
