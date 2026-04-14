#!/bin/bash
set -euo pipefail

DATE="$(date -u +%F-%H%M%S)"
BACKUP_ROOT="${BACKUP_ROOT:-./backups/local}"
BACKUP_DIR="${BACKUP_ROOT%/}/${DATE}"
ASSET_DIR="$BACKUP_DIR/assets"
CODE_DIR="$BACKUP_DIR/source"
SEO_DIR="$BACKUP_DIR/seo"
ENV_DIR="$BACKUP_DIR/env"

mkdir -p "$ASSET_DIR" "$CODE_DIR" "$SEO_DIR" "$ENV_DIR"

git bundle create "$CODE_DIR/source.bundle" --all

"$(dirname "$0")/db-backup.sh"

if [[ -d "public" ]]; then
  tar -czf "$ASSET_DIR/public.tar.gz" public
fi

if [[ -d "docs/seo" ]]; then
  tar -czf "$SEO_DIR/seo-assets.tar.gz" docs/seo
else
  tar -czf "$SEO_DIR/seo-assets.tar.gz" docs
fi

ENV_FILE="${BACKUP_ENV_FILE:-.env.production}"
if [[ ! -f "$ENV_FILE" && -f ".env.local" ]]; then
  ENV_FILE=".env.local"
fi

if [[ -f "$ENV_FILE" ]]; then
  if [[ -n "${GPG_RECIPIENT:-}" ]] && command -v gpg >/dev/null 2>&1; then
    gpg --batch --yes --encrypt --recipient "$GPG_RECIPIENT" --output "$ENV_DIR/$(basename "$ENV_FILE").gpg" "$ENV_FILE"
  elif [[ -n "${GPG_PASSPHRASE:-}" ]] && command -v gpg >/dev/null 2>&1; then
    gpg --batch --yes --passphrase "$GPG_PASSPHRASE" --symmetric --cipher-algo AES256 --output "$ENV_DIR/$(basename "$ENV_FILE").gpg" "$ENV_FILE"
  else
    echo "Warning: environment file found but GPG_RECIPIENT/GPG_PASSPHRASE not configured; env backup skipped." >&2
  fi
fi

cat > "$BACKUP_DIR/manifest.txt" <<EOF
created_at_utc=$DATE
source_bundle=source/source.bundle
database_dir=$BACKUP_DIR/database
assets_archive=assets/public.tar.gz
seo_archive=seo/seo-assets.tar.gz
environment_file=$(basename "$ENV_FILE")
EOF

echo "Full backup completed: $BACKUP_DIR"
