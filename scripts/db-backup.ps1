$ErrorActionPreference = "Stop"

$date = (Get-Date).ToUniversalTime().ToString("yyyy-MM-dd-HHmmss")
$backupRoot = if ($env:BACKUP_ROOT) { $env:BACKUP_ROOT } else { ".\backups\local" }
$backupDir = Join-Path $backupRoot $date
$dbDir = Join-Path $backupDir "database"

New-Item -ItemType Directory -Force -Path $dbDir | Out-Null

if (-not $env:DATABASE_URL) {
  throw "DATABASE_URL is required for database backups."
}

if (-not (Get-Command pg_dump -ErrorAction SilentlyContinue)) {
  throw "pg_dump is required but was not found in PATH."
}

$outputFile = Join-Path $dbDir "database.sql"
& pg_dump --no-owner --no-privileges $env:DATABASE_URL | Out-File -FilePath $outputFile -Encoding utf8

"created_at_utc=$date`ndatabase_dump=database.sql" | Out-File -FilePath (Join-Path $dbDir "manifest.txt") -Encoding utf8

Write-Host "Database backup completed: $outputFile"
