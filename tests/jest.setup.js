// configs/config.js fails fast if these are unset (see #2). Tests don't
// need real credentials - app.smoke.test.js boots the real app.js
// without connecting to a real DB, and app.service.test.js/
// app.repository.test.js mock their dependencies - so dummy values are
// fine here and only apply within the test process.
process.env.POSTGRES_USER = process.env.POSTGRES_USER || "test";
process.env.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "test";
process.env.POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || "test";
process.env.SESSION_SECRET = process.env.SESSION_SECRET || "test-secret";
process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "test-secret";
process.env.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "test-secret";
