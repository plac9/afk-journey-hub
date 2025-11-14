#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.homelab.yml}"

echo "[homelab] Building image via ${COMPOSE_FILE}..."
docker compose -f "${ROOT_DIR}/${COMPOSE_FILE}" up --build -d
echo "[homelab] Container is rebuilding in the background."

if [[ -n "${NOTIFY_WEBHOOK_URL:-}" ]]; then
  "${ROOT_DIR}/scripts/maintenance/notify-webhook.sh" \
    "AFK Journey Hub homelab refreshed at $(date -u +"%Y-%m-%d %H:%M:%S UTC")."
fi
