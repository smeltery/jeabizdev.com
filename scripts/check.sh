#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
bun install --frozen-lockfile
bun run format:check
bun run docs:check
bun run budget
actionlint
shellcheck scripts/*.sh .githooks/pre-commit
bun run typecheck
bun run test
bun run test:dev
bun scripts/check-links.mjs
bun run test:e2e
git diff --check
