// Load environment variables from the corresponding .env file
// If NODE_ENV is not defined, it will load from the default ".env" file
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || ".env"}` });

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
    user: process.env.MYSQL_USER || "prashant", // MySQL User
    password: process.env.MYSQL_PASSWORD || "9591", // MySQL Password
    port: process.env.MYSQL_PORT || 3306, // MySQL Port
    database: process.env.MYSQL_DATABASE || "testdb", // MySQL Database Name
  },

  /**
   * OAuth Configuration for Google and Facebook
   * Stores API keys for OAuth providers.
   */
  oauth: {
    google: {
      clientId: process.env.CLIENT_ID, // Google Client ID for OAuth
      clientSecret: process.env.CLIENT_SECRET, // Google Client Secret for OAuth
    },
    facebook: {
      appId: process.env.APP_ID, // Facebook App ID for OAuth
      appSecret: process.env.APP_SECRET, // Facebook App Secret for OAuth
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
    user: process.env.POSTGRES_USER || "postgres", // PostgreSQL User
    password: process.env.POSTGRES_PASSWORD || "postgres", // PostgreSQL Password
    port: process.env.POSTGRES_PORT || 5432, // PostgreSQL Port
    database: process.env.POSTGRES_DATABASE || "express-boilerplate", // PostgreSQL Database Name
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
    secret: process.env.SESSION_SECRET || "secret", // Default secret key for sessions
  },
};
