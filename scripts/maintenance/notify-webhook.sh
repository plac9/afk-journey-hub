#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-"AFK Journey Hub notification"}"

if [[ -z "${NOTIFY_WEBHOOK_URL:-}" ]]; then
  echo "[notify] NOTIFY_WEBHOOK_URL not set; skipping message: ${MESSAGE}"
  exit 0
fi

curl -sSf -X POST \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"${MESSAGE}\"}" \
  "${NOTIFY_WEBHOOK_URL}" >/dev/null

echo "[notify] delivered webhook message."
