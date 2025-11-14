#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )/../.." && pwd)"

cd "$ROOT_DIR"

cat <<INFO
=== AFK Journey Hub Diagnostics ===
Node: $(node -v)
NPM: $(npm -v)
INFO

echo "\n[diagnose] Running npm run check..."
if ! npm run check; then
  echo "[diagnose] Check failed" >&2
fi

echo "\n[diagnose] Running Next.js info..."
npx --yes next info || true

echo "\nInspecting recent .next/trace if exists..."
if [[ -d .next ]]; then
  find .next -maxdepth 1 -type f -name '*trace*' -print | head -n 5
else
  echo "No .next build artifacts yet"
fi
