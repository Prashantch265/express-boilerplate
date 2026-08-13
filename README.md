# Node.js Express Boilerplate
## JavaScript version with a modular, feature-based folder structure

!["Node"](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
!["JS"](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
!["NPM"](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Description

A batteries-included Express.js boilerplate to kick-start a Node.js API
project without writing the scaffolding by hand. Modular, feature-based
structure — each feature owns its own folder — with a layered pattern
inside every module (route → validation → controller → service →
repository → model). Sequelize + PostgreSQL, JWT/OAuth scaffolding, request
validation with Joi, structured logging, and optional
Redis/RabbitMQ/Socket.IO/MongoDB clients you can enable as needed.

> This is boilerplate, not a finished product — several modules (auth,
> corporate/normal users, RBAC) are scaffolding only. See `CLAUDE.md` for a
> list of known incomplete pieces before you build on top of them.

## Tech stack

| Layer | Choice |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| ORM / DB | Sequelize 6 + PostgreSQL (mysql2 / mongoose deps also present, unused by default) |
| Validation | Joi (+ joi-to-swagger) |
| Auth | Passport (JWT, Google OAuth2, Facebook) + jsonwebtoken + bcrypt |
| Logging | Winston + winston-daily-rotate-file, Morgan |
| Docs | swagger-autogen / swagger-jsdoc / swagger-ui-express |
| Messaging (optional) | Redis, RabbitMQ (amqplib), Socket.IO |
| Mail (optional) | Nodemailer + Handlebars templates |
| Lint / format | ESLint + Prettier |
| Containerization | Docker / docker-compose |

## Project structure

```
app/            Feature modules: route/controller/service/repository/model/validation per feature
configs/        Env-driven config, DB migration config, route-protection + CORS allowlist
database/       Shared model columns, migrations, seeders
exceptions/     HttpException class tree used across services/repositories
lib/            Infra clients: sequelize, mongo, redis, rabbitmq, socket.io, jwt, swagger
middlewares/    auth, error, and joi-validation middleware
passport/       JWT / Google / Facebook passport strategies
utils/          Logger, mailer, pagination, response envelopes, message keys, misc helpers
assets/         Static images used in docs
doc/            Generated swagger output
```

## Getting started

### Prerequisites

- Node.js 20+ (Docker image uses `node:22-alpine`)
- PostgreSQL — run locally, or via `docker-compose.dev.yml` (see below)
- Redis — only needed if you opt into a Redis-backed session store
  (`SESSION_STORE=redis`); the default requires nothing extra

### Setup

```bash
git clone https://github.com/Prashantch265/express-boilerplate.git
cd express-boilerplate
npm install
```

Copy `.env.example` to `.env.development` (loaded automatically when
`NODE_ENV=development`) and fill in the required values — the app fails
fast at boot listing anything still missing:

```bash
cp .env.example .env.development
```

At minimum you need `POSTGRES_USER`, `POSTGRES_PASSWORD`,
`POSTGRES_DATABASE`, `SESSION_SECRET`, `ACCESS_TOKEN_SECRET`, and
`REFRESH_TOKEN_SECRET` set — see `.env.example` for the full list and
what each optional subsystem needs.

### Running Postgres (and optionally Redis) locally with Docker

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This starts Postgres on `5432` and Redis on `6379` with credentials
matching `.env.example`'s defaults. Stop with
`docker-compose -f docker-compose.dev.yml down`.

Then run migrations and start the dev server:

```bash
npm run migration:run
npm run dev
```

The API is now available at `http://localhost:3000`, with feature routes
mounted under `/api` (e.g. `GET /api/app`, `POST /api/admins`).

## Available scripts

| Script | What it does |
|---|---|
| `npm start` | Run the server (`node server.js`) |
| `npm run dev` | Run with nodemon + `NODE_ENV=development`, `--inspect` enabled |
| `npm test` | Run the test suite (Jest) |
| `npm run lint` | `eslint --fix .` |
| `npm run migration:generate --name <name>` | Scaffold a new migration |
| `npm run migration:run` | Apply pending migrations |
| `npm run migration:revert` | Undo the last migration |
| `npm run seed:generate --name <name>` | Scaffold a new seeder |
| `npm run seed:run` | Run seeders |
| `npm run seed:revert` | Undo the last seeder |

## Testing

```bash
npm test
```

Tests live under `tests/`: a boot smoke test (`app.smoke.test.js`) and one
example unit test per layer (`app.repository.test.js`,
`app.service.test.js`) mocking the layer below. Use these as the pattern
for testing new features.

## Sessions

Sessions default to an in-memory store — no extra setup. Set
`SESSION_STORE=redis` (plus `REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD` as
needed) to use a Redis-backed store instead, so sessions survive restarts
and work across multiple app instances.

## Architecture

Modular by feature: each folder under `app/` (e.g. `app/core/users/admin/`)
is a self-contained module holding its own route, controller, service,
repository, model, and validation files. There's no top-level `/controllers`
or `/services` directory shared across features — the layering happens
*inside* each module.

```
server.js → app.js → app/index.js (auto-mounts every **/*.route.js under /api)
```

Within a module, each request flows through:

```
route → joi validator → controller → service → repository → Sequelize model
```

Example — `POST /api/admins`:

1. `admin.route.js` validates the body against `createAdminSchema`.
2. `admin.controller.js#createAdmin` calls the service and wraps the result
   with a standard success envelope.
3. `admin.service.js` hashes the password with bcrypt.
4. `admin.repository.js` checks for a duplicate email, creates a base
   `users` row, then the `admins` row.

Use `app/core/users/admin/admin.*.js` as the reference implementation when
adding a new feature.

## Docker

```bash
docker-compose up --build
```

`docker-compose.yml` builds the app image and loads env from
`.env.production` (create this file yourself, based on `.env.example` —
it's gitignored). The image itself also runs standalone via its `CMD`
(`docker run` with no command override works, not just through compose).

`docker-compose.dev.yml` is separate and only for local dependencies
(Postgres/Redis) — see "Getting started" above.

## License

ISC
