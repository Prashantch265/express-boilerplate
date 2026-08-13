const allowedOrigins = [
  "http://127.0.0.1",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:5000",
  // Extend the whitelist without a code change (e.g. staging/preview URLs):
  // CORS_ORIGIN=https://staging.example.com,https://preview.example.com
  ...(process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : []),
];

const unprotectedRoutes = [
  "/auth/signin",
  "/auth/register",
  "/internal/signin",
];

const allowedExtensions = [];

module.exports = { allowedOrigins, unprotectedRoutes, allowedExtensions };
