#!/usr/bin/env bash
set -euo pipefail
: "${VERIFIED_SHA:?A successful CI revision is required}"
: "${GITHUB_OUTPUT:?GitHub output file is required}"
git fetch origin master --tags
head="$(git rev-parse HEAD)"
test "$head" = "$VERIFIED_SHA"
# An older successful run must never tag a newer, untested default branch.
if [ "$head" != "$(git rev-parse origin/master)" ]; then
  echo 'A newer revision exists; its own successful CI run will release it.'
  exit 0
fi
existing="$(git tag --points-at "$head" | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -n 1 || true)"
if [ -n "$existing" ]; then
  echo "tag=$existing" >> "$GITHUB_OUTPUT"
  exit 0
fi
latest="$(git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -n 1 || true)"
if [ -z "$latest" ]; then
  next=v0.1.0
else
  version="${latest#v}"
  next="v${version%.*}.$((${version##*.} + 1))"
fi
git tag "$next" "$head"
git push origin "$next"
echo "tag=$next" >> "$GITHUB_OUTPUT"
