#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )/../.." && pwd)"

printf '\n[bootstrap] Installing npm dependencies...\n'
(cd "$ROOT_DIR" && npm install)

printf '\n[bootstrap] Ensuring content + data directories exist...\n'
mkdir -p "$ROOT_DIR/content/heroes" \
         "$ROOT_DIR/content/events" \
         "$ROOT_DIR/content/news" \
         "$ROOT_DIR/content/teams" \
         "$ROOT_DIR/data/imports"

if [[ -f "$ROOT_DIR/.env.example" && ! -f "$ROOT_DIR/.env.local" ]]; then
  cp "$ROOT_DIR/.env.example" "$ROOT_DIR/.env.local"
  echo "[bootstrap] Created .env.local from template"
fi

printf '\n[bootstrap] Validating content layer...\n'
(cd "$ROOT_DIR" && npm run content:lint >/dev/null)

printf '\n[bootstrap] Ready to run npm run dev\n'
