#!/bin/bash
set -euo pipefail

DATE="$(date -u +%F-%H%M%S)"
BACKUP_ROOT="${BACKUP_ROOT:-./backups/local}"
BACKUP_DIR="${BACKUP_ROOT%/}/${DATE}"
DB_DIR="$BACKUP_DIR/database"

mkdir -p "$DB_DIR"

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required for database backups." >&2
  exit 1
fi

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "pg_dump is required but was not found in PATH." >&2
  exit 1
fi

pg_dump --no-owner --no-privileges "$DATABASE_URL" | gzip > "$DB_DIR/database.sql.gz"

cat > "$DB_DIR/manifest.txt" <<EOF
created_at_utc=$DATE
database_dump=database.sql.gz
EOF

echo "Database backup completed: $DB_DIR/database.sql.gz"
