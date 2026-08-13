// Load environment variables from the corresponding .env file
// If NODE_ENV is not defined, it will load from the default ".env" file
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || ".env"}` });

/**
 * Required sensitive environment variables.
 * Fail fast at boot rather than silently falling back to a hardcoded
 * default (or connecting/signing with `undefined`) if one is missing.
 * See .env.example.
 */
const requiredEnvVars = [
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
  "SESSION_SECRET",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length) {
  throw new Error(
    `Missing required environment variable(s): ${missingEnvVars.join(
      ", "
    )}. See .env.example.`
  );
}

module.exports = {
  /**
   * Database Dialect Configuration
   * Chooses between supported databases (PostgreSQL, MySQL, etc.)
   */
  dialect: process.env.DIALECT || { postgres: "postgres", mysql: "mysql" }, // Default dialects for both Postgres and MySQL

  /**
   * JWT Token Configuration
   * These values are used for generating JWTs with expiration and secrets.
   */
  jwtConfig: {
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // Expiration time for Access Token
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // Expiration time for Refresh Token
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET, // Secret for Access Token
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET, // Secret for Refresh Token
  },

  /**
   * Mailer Configuration
   */
  mailerConfig: {
    host: process.env.MAIL_HOST || "smtp.example.com",
    port: process.env.MAIL_PORT || 587,
    auth: {
      user: process.env.MAIL_USER || "user@example.com",
      pass: process.env.MAIL_PASSWORD || "password",
    },
    templateEngine: process.env.TEMPLATE_ENGINE || "handlebars", // Choose between "handlebars" or "ejs"
  },

  /**
   * MongoDB Configuration
   * Used when MongoDB is chosen.
   */
  mongo: {
    uri:
      process.env.MONGO ||
      "mongodb://" +
        (process.env.IP || "localhost") +
        ":" +
        (process.env.MONGO_PORT || "27017") +
        "/hulaki", // MongoDB URI with default values
  },

  /**
   * MySQL Database Configuration
   * Used when MySQL is the chosen database.
   */
  mysql: {
    host: process.env.MYSQL || "localhost", // MySQL Host
    user: process.env.MYSQL_USER, // MySQL User (only used when DIALECT=mysql)
    password: process.env.MYSQL_PASSWORD, // MySQL Password (only used when DIALECT=mysql)
    port: process.env.MYSQL_PORT || 3306, // MySQL Port
    database: process.env.MYSQL_DATABASE || "express-boilerplate", // MySQL Database Name
  },

  /**
   * OAuth Configuration for Google and Facebook
   * Stores API keys for OAuth providers.
   */
  oauth: {
    facebook: {
      clientID: process.env.FACEBOOK_APP_ID, // Facebook App ID for OAuth
      clientSecret: process.env.FACEBOOK_APP_SECRET, // Facebook App Secret for OAuth
      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        "http://localhost:3000/auth/facebook/cb",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google Client ID for OAuth
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret for OAuth
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/cb",
    },
  },

  /**
   * Server Configuration
   */
  port: process.env.PORT || 3000, // Default to port 3000 if not set

  /**
   * PostgreSQL Database Configuration
   * Used when PostgreSQL is the chosen database.
   */
  postgres: {
    host: process.env.POSTGRES || "localhost", // PostgreSQL Host
    user: process.env.POSTGRES_USER, // PostgreSQL User (required, see requiredEnvVars above)
    password: process.env.POSTGRES_PASSWORD, // PostgreSQL Password (required, see requiredEnvVars above)
    port: process.env.POSTGRES_PORT || 5432, // PostgreSQL Port
    database: process.env.POSTGRES_DATABASE, // PostgreSQL Database Name (required, see requiredEnvVars above)
  },

  /**
   * RabbitMQ Configuration
   * Configuration for RabbitMQ connection and queue name.
   */
  rabbitMq: {
    host: `amqp://${process.env.RABBITMQ_HOST || "localhost"}`, // RabbitMQ host (defaults to localhost)
    queue: process.env.QUEUE || "testqueue", // Queue name (defaults to testqueue)
  },

  /**
   * Redis Configuration
   * Configuration for Redis client connection.
   */
  redisConfig: {
    host: process.env.REDIS_HOST || "127.0.0.1", // Default Redis host
    port: process.env.REDIS_PORT || 6379, // Default Redis port
    password: process.env.REDIS_PASSWORD || null, // Default to no password if not set
    db: process.env.REDIS_DB || 0, // Default Redis database (0)
  },

  /**
   * Session Configuration
   */
  sessionConfig: {
    secret: process.env.SESSION_SECRET, // Session secret (required, see requiredEnvVars above)
  },
};
