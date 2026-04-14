#!/bin/bash
set -euo pipefail

BACKUP_ROOT="${BACKUP_ROOT:-./backups/local}"
OFFSITE_URI="${BACKUP_OFFSITE_URI:-}"

if [[ -z "$OFFSITE_URI" ]]; then
  echo "BACKUP_OFFSITE_URI is required for offsite sync." >&2
  exit 1
fi

if [[ ! -d "$BACKUP_ROOT" ]]; then
  echo "Backup root not found: $BACKUP_ROOT" >&2
  exit 1
fi

if command -v aws >/dev/null 2>&1 && [[ "$OFFSITE_URI" == s3://* ]]; then
  aws s3 sync "$BACKUP_ROOT" "$OFFSITE_URI" --sse AES256
  echo "Offsite sync completed with aws s3 sync."
  exit 0
fi

if command -v rclone >/dev/null 2>&1; then
  rclone copy "$BACKUP_ROOT" "$OFFSITE_URI"
  echo "Offsite sync completed with rclone."
  exit 0
fi

echo "No supported offsite sync tool found. Install aws CLI or rclone." >&2
exit 1
