# Repository Guidelines

## Project Structure & Module Organization

AdGuard Home is a Go service with a React/TypeScript dashboard. Backend entry points are `main.go` and `main_next.go`; most Go packages live under `internal/`, with tests beside code as `*_test.go` and fixtures under `testdata/`. The frontend is in `client/`, with source in `client/src`, tests in `client/tests`, and static assets in `client/public`. Documentation and diagrams are in `doc/`, API definitions in `openapi/`, build helpers in `scripts/`, Docker files in `docker/`, and CI definitions in `bamboo-specs/`.

## Build, Test, and Development Commands

- `make init`: configure repository Git hooks from `scripts/hooks`.
- `make deps`: install Go and frontend dependencies.
- `make build`: install dependencies, build the frontend, and build the Go binary.
- `make go-build`: build the Go backend only.
- `make js-build`: build the production frontend bundle.
- `make lint`: run frontend and backend linters.
- `make test`: run frontend and backend tests.
- `make go-check`: run Go linting and race-enabled Go tests.
- `npm --prefix client run watch:hot`: start the frontend webpack dev server.

## Coding Style & Naming Conventions

Follow `HACKING.md`, which points to AdGuard’s shared CodeGuidelines for Go, Markdown, shell, text, and YAML. Go code must be `gofmt`/`go vet` clean and use idiomatic package-local names. Frontend code is TypeScript/React, linted with ESLint and formatted through the configured Prettier integration. Keep Makefile changes POSIX-compatible.

## Testing Guidelines

Use Go’s standard testing package for backend tests; name tests `TestXxx`, `BenchmarkXxx`, or fuzz targets as appropriate. Run `make go-test` for race-enabled Go tests and `make go-bench` or `make go-fuzz` for specialized checks. Frontend unit tests use Vitest via `make js-test`; end-to-end tests use Playwright via `make js-test-e2e`. Add fixtures under the nearest `testdata/` directory.

## Commit & Pull Request Guidelines

Recent history uses concise PR-style subjects, often including issue IDs, for example `Pull request 2656: AG-54304-path-traversal-vuln`. Keep commits focused and descriptive. For pull requests, discuss substantial changes in an issue first, write titles in English, explain behavior changes, link related issues, and include screenshots or manual test notes for UI changes. Run relevant lint and test targets before review.

## Security & Configuration Tips

Do not commit real secrets, signing keys, or local configuration. The Makefile contains placeholder release variables; override them through the environment only when needed. Follow `SECURITY.md` for vulnerability reporting.
