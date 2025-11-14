#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )/../.." && pwd)"
DATA_DIR="$ROOT_DIR/data/imports"

if ! git -C "$ROOT_DIR" diff --quiet -- "$DATA_DIR"; then
  echo "[prepare-sync-commit] Staging new data files..."
  git -C "$ROOT_DIR" add "$DATA_DIR"
  echo "[prepare-sync-commit] Ready for commit. Suggested message: \"chore: update AFK Journey feed snapshots\""
else
  echo "[prepare-sync-commit] No changes detected under data/imports"
fi
