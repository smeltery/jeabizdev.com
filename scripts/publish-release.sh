#!/usr/bin/env bash
set -euo pipefail
: "${RELEASE_TAG:?Release tag is required}"
: "${GITHUB_REPOSITORY:?Repository is required}"
[[ "$RELEASE_TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]
sha="$(git rev-parse HEAD)"
test "$sha" = "$(git rev-list -n 1 "$RELEASE_TAG")"
git fetch origin master
git merge-base --is-ancestor "$sha" origin/master
successful="$(gh api "repos/$GITHUB_REPOSITORY/actions/workflows/ci.yml/runs?head_sha=$sha&event=push&status=success" --jq '.total_count')"
test "$successful" -gt 0
archive="jeabizdev-${RELEASE_TAG}.tar.gz"
git archive --format=tar.gz --prefix=jeabizdev/ -o "$archive" "$RELEASE_TAG"
sha256sum "$archive" > "$archive.sha256"
if gh release view "$RELEASE_TAG" >/dev/null 2>&1; then
  gh release upload "$RELEASE_TAG" "$archive" "$archive.sha256" --clobber
else
  gh release create "$RELEASE_TAG" "$archive" "$archive.sha256" --verify-tag --generate-notes --title "$RELEASE_TAG"
fi
