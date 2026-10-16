# cicd — a small Bun app for practising CI/CD

A tiny HTTP API with unit tests, a database test and a Dockerfile: just enough for every pipeline exercise in the
Obsidian notes **CICD Pipelines** (`00 CICD Start Here` … `16 CICD Final Test`). Wherever the notes say **cicd-lab**, use
this repo.

GitHub: https://github.com/grelinhealth007/cicd (private)

## What's inside

| File                                   | What it is                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| `src/price.ts`                         | The business rule: `applyDiscount(price, percent)`                                    |
| `src/app.ts`                           | The routes as a fetch handler: `GET /health`, `GET /price?price=200&percent=10`       |
| `src/server.ts`                        | Starts the server on `PORT` (default 3000)                                            |
| `src/price.test.ts`, `src/app.test.ts` | Unit tests (no database)                                                              |
| `src/db.test.ts`                       | A Postgres test. It runs only when `DATABASE_URL` is set, otherwise it's **skipped**. |
| `Dockerfile`                           | The image the CD exercises build on a CI runner (no Docker needed on your PC)         |
| `.gitattributes`                       | LF line endings, so Windows and Linux runners agree                                   |
| `.env.example`                         | Copy it to `.env` to run the database test locally                                    |

There's no `.github/workflows/` yet. Writing the pipelines is the exercise.

## Run it locally (PowerShell)

```powershell
bun install
```

```powershell
bun run typecheck
```

```powershell
bun test
```

You should see 10 tests pass and 1 skipped (the database test, until you add a `.env`).

To run the database test against your local Postgres 18, copy `.env.example` to `.env`, put your Postgres password in
`DATABASE_URL`, then run `bun test` again: 11 tests pass.

Start the server:

```powershell
bun run dev
```

Then open http://localhost:3000/health and http://localhost:3000/price?price=200&percent=10.

## Scripts

| Script              | Does                        |
| ------------------- | --------------------------- |
| `bun run dev`       | Server with restart on save |
| `bun run start`     | Server                      |
| `bun run build`     | Bundles to `dist/server.js` |
| `bun run typecheck` | `tsc --noEmit`              |
| `bun test`          | All tests                   |

What a pipeline runs: `bun install --frozen-lockfile` → `bun run typecheck` → `bun test`.

## Practice path

| Notes                                 | Add to this repo                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 04 GitHub Actions Basics              | `.github/workflows/hello.yml`                                                                    |
| 05 GitHub Actions for a Bun Project   | `.github/workflows/ci.yml` with a Postgres 18 service (the DB test must **run** in CI, not skip) |
| 06 GitHub Actions Advanced            | matrix, artifacts (`bun run build`), a reusable workflow, a composite setup action               |
| 07 Pipeline Secrets and Security      | `permissions:`, injection-safe inputs, pinned actions                                            |
| 08 Continuous Delivery and Deployment | Publish the image to GHCR, smoke-test `/health`, a deploy/rollback button                        |
| 09 Versioning and Releases            | A release workflow triggered by `v*` tags                                                        |
| 10 GitLab CI                          | `.gitlab-ci.yml` (push this repo to a GitLab remote as well)                                     |
| 11 Jenkins                            | A `Jenkinsfile` for a local Jenkins                                                              |

Work on a branch and open a pull request for each exercise, so you see the checks on the PR.

i added some changes
