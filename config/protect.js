const allowedOrigins = [
  "http://127.0.0.1",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:5000",
];

const unprotectedRoutes = [
  "/auth/signin",
  "/auth/register",
  "/internal/signin",
];

const allowedExtension = [];

module.exports = { allowedOrigins, unprotectedRoutes, allowedExtension };
