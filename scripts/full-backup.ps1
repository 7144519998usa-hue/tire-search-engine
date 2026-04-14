$ErrorActionPreference = "Stop"

$date = (Get-Date).ToUniversalTime().ToString("yyyy-MM-dd-HHmmss")
$backupRoot = if ($env:BACKUP_ROOT) { $env:BACKUP_ROOT } else { ".\backups\local" }
$backupDir = Join-Path $backupRoot $date
$assetDir = Join-Path $backupDir "assets"
$codeDir = Join-Path $backupDir "source"
$seoDir = Join-Path $backupDir "seo"
$envDir = Join-Path $backupDir "env"

New-Item -ItemType Directory -Force -Path $assetDir, $codeDir, $seoDir, $envDir | Out-Null

& git bundle create (Join-Path $codeDir "source.bundle") --all

& (Join-Path $PSScriptRoot "db-backup.ps1")

if (Test-Path ".\public") {
  Compress-Archive -Path ".\public\*" -DestinationPath (Join-Path $assetDir "public.zip") -Force
}

if (Test-Path ".\docs\seo") {
  Compress-Archive -Path ".\docs\seo\*" -DestinationPath (Join-Path $seoDir "seo-assets.zip") -Force
} elseif (Test-Path ".\docs") {
  Compress-Archive -Path ".\docs\*" -DestinationPath (Join-Path $seoDir "seo-assets.zip") -Force
}

$envFile = if ($env:BACKUP_ENV_FILE) { $env:BACKUP_ENV_FILE } elseif (Test-Path ".\.env.production") { ".\.env.production" } elseif (Test-Path ".\.env.local") { ".\.env.local" } else { $null }

if ($envFile) {
  if (Get-Command gpg -ErrorAction SilentlyContinue) {
    if ($env:GPG_RECIPIENT) {
      & gpg --batch --yes --encrypt --recipient $env:GPG_RECIPIENT --output (Join-Path $envDir ((Split-Path $envFile -Leaf) + ".gpg")) $envFile
    } elseif ($env:GPG_PASSPHRASE) {
      & gpg --batch --yes --passphrase $env:GPG_PASSPHRASE --symmetric --cipher-algo AES256 --output (Join-Path $envDir ((Split-Path $envFile -Leaf) + ".gpg")) $envFile
    } else {
      Write-Warning "Environment file found but GPG_RECIPIENT/GPG_PASSPHRASE is not configured; env backup skipped."
    }
  } else {
    Write-Warning "gpg not found; env backup skipped."
  }
}

@"
created_at_utc=$date
source_bundle=source/source.bundle
database_dir=database
assets_archive=assets
seo_archive=seo
environment_file=$envFile
"@ | Out-File -FilePath (Join-Path $backupDir "manifest.txt") -Encoding utf8

Write-Host "Full backup completed: $backupDir"
