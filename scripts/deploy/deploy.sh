#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT=${1:-preview}
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )/../.." && pwd)"

cd "$ROOT_DIR"

echo "[deploy] Running npm run check"
npm run check

if [[ "$ENVIRONMENT" == "production" ]]; then
  echo "[deploy] Building production bundle"
  npm run build
else
  echo "[deploy] Building preview bundle"
  npm run build
fi

if command -v vercel >/dev/null 2>&1; then
  echo "[deploy] Triggering Vercel deployment ($ENVIRONMENT)"
  if [[ "$ENVIRONMENT" == "production" ]]; then
    vercel deploy --prebuilt --prod
  else
    vercel deploy --prebuilt
  fi
else
  cat <<NOTE
[deploy] Vercel CLI not installed. Install via `npm i -g vercel` and rerun
or deploy from the Vercel dashboard.
NOTE
fi
