#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )/../.." && pwd)"
DATA_DIR="$ROOT_DIR/data/imports"
STAMP="$(date -u +"%Y-%m-%dT%H-%M-%SZ")"
OUTPUT_FILE="$DATA_DIR/$STAMP-news.json"

mkdir -p "$DATA_DIR"

FEED_URL="${AFK_OFFICIAL_FEED_URL:-https://afkjourney.farlightgames.com/api/news}"
CODES_URL="${AFK_CODES_SOURCE_URL:-https://example.com/afk-journey/codes.json}"

echo "[sync-official] Fetching news feed from $FEED_URL"
if ! curl -fsSL "$FEED_URL" -o "$OUTPUT_FILE"; then
  echo "Failed to fetch AFK Journey news feed" >&2
  exit 1
fi

echo "[sync-official] Saved news snapshot to $OUTPUT_FILE"
cp "$OUTPUT_FILE" "$DATA_DIR/latest-news.json"

if [[ -n "$CODES_URL" ]]; then
  CODE_FILE="$DATA_DIR/$STAMP-codes.json"
  echo "[sync-official] Fetching promo codes from $CODES_URL"
  if curl -fsSL "$CODES_URL" -o "$CODE_FILE"; then
    echo "[sync-official] Saved codes snapshot to $CODE_FILE"
    cp "$CODE_FILE" "$DATA_DIR/latest-codes.json"
  else
    echo "[sync-official] Warning: failed to fetch codes" >&2
  fi
fi

echo "[sync-official] Done"
