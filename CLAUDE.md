# CLAUDE.md

Guide for Claude Code (or any agent) working in this repo.

## Overview

Plain JS (CommonJS, no TypeScript) Express boilerplate with a modular,
feature-based folder structure — each feature owns its own folder, layered
internally (route/controller/service/repository/model/validation). No
shared top-level `/controllers` or `/services` dir across features. Express
4 + Sequelize 6 (Postgres by default; mysql2/mongoose deps present but
unused). Passport (JWT/Google/Facebook) scaffolding exists but is
**disabled by default** (see Known issues below).

## Commands

```bash
npm start                    # node server.js
npm run dev                  # NODE_ENV=development nodemon --inspect
npm run lint                 # eslint --fix .

npm run migration:generate --name <name>   # sequelize-cli migration:generate
npm run migration:run                      # sequelize-cli db:migrate
npm run migration:revert                   # sequelize-cli db:migrate:undo

npm run seed:generate
npm run seed:run
npm run seed:revert
```

`npm test` runs Jest. Tests live under `tests/`: a boot smoke test plus
one example unit test per layer (repository mocks `@lib/sequelize`,
service mocks the repository) — follow that pattern for new features.

## Architecture / request flow

```
server.js  →  app.js  →  app/index.js  →  <feature>.route.js
```

- `server.js` — entry point, calls `module-alias/register`, starts `app.listen`.
- `app.js` — app factory: builds the middleware chain (helmet, hpp, cors,
  body parsing, compression, httpContext, session), connects Sequelize,
  mounts routes via `require("./app/")(app)`, then a 404 handler and
  `middlewares/error.middleware.js` (last two middlewares).
- `app/index.js` — glob-loads every `**/*.route.js` under `app/`, gives each
  its own `express.Router()`, and mounts it at `/api`. A route file that
  throws on `require` is caught and logged, **not** fatal — the route is just
  silently never mounted.

Per-feature layer chain:

```
route  →  validator(schema)  →  controller  →  service  →  repository  →  model
```

- **route**: wires HTTP verb + path to a joi `validator()` + controller method.
- **validator**: `middlewares/joi.middleware.js`, factory `validator(schema)`
  — 422 on failure, otherwise replaces `req.body` with the validated value.
- **controller**: thin — pulls req data, calls service, wraps result with
  `successResponse`/`errorResponse`, `catch (e) { next(e) }` on failure.
- **service**: business logic (hashing, dup checks, pagination params).
- **repository**: only place that touches Sequelize models directly.
- **model**: `sequelize.define(...)`, spreads shared columns from
  `app/common/common.entity.js`.

Canonical example feature to copy: `app/core/users/admin/admin.*.js`
(route/controller/service/repository/model/validation). Simplest example:
`app/app.*.js`.

## Module aliases

Defined in `package.json` `_moduleAliases` (loaded via `module-alias/register`
in `server.js`) and mirrored in `jsconfig.json` for editor IntelliSense:

| alias         | path         |
|---------------|--------------|
| `@app`        | `./app`      |
| `@configs`    | `./configs`  |
| `@database`   | `./database` |
| `@exceptions` | `./exceptions` |
| `@lib`        | `./lib`      |
| `@middlewares`| `./middlewares` |
| `@passport`   | `./passport` |
| `@utils`      | `./utils`    |

Some older files use relative `../` requires instead of aliases — both work,
prefer aliases in new code.

## Conventions

- **Feature folder** = up to 6 files: `*.route.js`, `*.controller.js`,
  `*.service.js`, `*.repository.js`, `*.model.js`, `*.validation.js`.
- **Models auto-load**: `lib/sequelize.js` globs `app/**/*.model.js` on
  startup, calls each with `(sequelize, DataTypes)`, then runs `.associate(db)`
  if defined. No manual registration needed — just add the file.
- **Shared columns**: spread `...CommonEntity` from
  `app/common/common.entity.js` into `sequelize.define(...)` for
  `isActive`/`createdAt`/`updatedAt`/`createdBy`/`updatedBy`. Migrations
  spread `database/common-attributes.js`, which derives its (snake_case
  column-keyed) shape from the same source — change the model-side file
  and migrations pick it up automatically.
- **Responses**: use `successResponse(res, data, "<msgKey>", "<source>")` /
  `errorResponse(status, message, source)` from `@utils`. Message keys live
  in `utils/messages/message.json` (`successMsg` / `errorMsg`), formatted
  with `util.format` using `%s` placeholders for `source`.
- **Errors**: throw from service/repository using the `exceptions/index.js`
  tree (`ValidationException`, `NotFoundException`, `ConflictException`,
  `ForbiddenException`, `AuthException`, etc. — all extend `HttpException`).
  Controllers always `catch (error) { next(error); }`; the global handler in
  `app.js` renders the final JSON.
- **Audit columns**: `lib/sequelize.js` defines global `beforeCreate` /
  `beforeUpdate` (+ bulk variants) hooks that set `createdBy`/`updatedBy` from
  `options.userId`. Pass it explicitly when calling model methods, e.g.
  `admins.create(data, { userId: httpContext.get("user")?.userId })`.
- **Request-scoped context**: `express-http-context` (`httpContext`) carries
  the authenticated user across the call stack without threading it through
  every function.
- **Transactions**: CLS via `cls-hooked` + `Sequelize.useCLS` is wired in
  `lib/sequelize.js`, enabling `sequelize.transaction(...)` without manually
  passing the transaction object down.

## Config / env

`configs/config.js` loads `.env` (or `.env.<NODE_ENV>` when `NODE_ENV` is
set) via dotenv. `.env*` files are gitignored except `.env.example` — copy
it to `.env.development`/`.env.production` and fill in real values.

**Fails fast at boot** if any of `POSTGRES_USER`, `POSTGRES_PASSWORD`,
`POSTGRES_DATABASE`, `SESSION_SECRET`, `ACCESS_TOKEN_SECRET`, or
`REFRESH_TOKEN_SECRET` are unset — no silent fallback to a hardcoded
value. `configs/migration.js` does the same for whichever `DIALECT` is
active.

Other variables (see `.env.example` for the full list): `PORT`, `DIALECT`,
mail (`MAIL_*`), Redis (`REDIS_*`), RabbitMQ (`RABBITMQ_*`), OAuth
(`GOOGLE_*`/`FACEBOOK_*`) — all optional, non-secret defaults where
applicable.

- `SESSION_STORE=redis` opts into a Redis-backed session store (see
  `app.js`); default is `MemoryStore`, no Redis required.
- `CORS_ORIGIN` (comma-separated) extends the CORS allowlist in
  `configs/protect.js` beyond the built-in localhost entries.

## Adding a feature

1. Create a folder (`app/<feature>/` or nested under `app/core/`).
2. Add `*.model.js` — auto-loaded on next server start, no wiring needed.
3. Add `*.validation.js` (Joi schema, `.meta({ name: "..." })` for swagger).
4. Add `*.repository.js` — model queries, throw `exceptions/` on business
   rule violations.
5. Add `*.service.js` — orchestration, hashing, pagination
   (`getPaginationParams`/`formatPaginatedResponse` from `@utils`).
6. Add `*.controller.js` — call service, `successResponse`, `next(err)`.
7. Add `*.route.js` exporting `(router) => { router.route("/x")... }` — it's
   auto-discovered and mounted at `/api` on next start.
8. Add a migration: `npm run migration:generate --name add-<feature>-table`,
   fill in `up`/`down`, `npm run migration:run`.

## Known issues / gotchas

An initial audit of this codebase found ~30 real bugs (broken imports,
logic errors, missing migrations, security gaps, no tests). Nearly all of
them are fixed — see closed GitHub issues for the full list and each fix's
PR. What's still deliberately true or genuinely unfinished:

- **Auth is off by default**: `authMiddleware` and passport strategy `require`
  calls are commented out in `app.js`. This is intentional (not a bug) —
  uncomment them to enable JWT auth on protected routes.
- **Corporate/normal user password login and all OAuth login
  (Google/Facebook/LinkedIn/GitHub) return `503 Not Implemented`**: only
  `admin` has a real signup/credential-check flow. Building out
  corporate/normal user management and wiring up OAuth are separate
  features, not bug fixes — don't assume they work because the route
  exists.
- **RBAC (`app/core/role-based-access-control/`) is models only**: no
  service/controller/route layer, no permission-checking logic anywhere in
  the app yet.
- **No CI pipeline**: `npm test` (Jest) and `npm run lint` both work
  locally, but nothing runs them automatically on push/PR yet.
- `app/core/role-based-access-control/api-endpoints/api-endpoints.model.js`
  has a `feild:` typo (should be `field:`) — harmless under
  `underscored: true` (Sequelize's auto-mapping produces the same column
  name anyway), but don't copy the typo into new code.
