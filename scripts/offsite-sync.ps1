$ErrorActionPreference = "Stop"

$backupRoot = if ($env:BACKUP_ROOT) { $env:BACKUP_ROOT } else { ".\backups\local" }
$offsiteUri = $env:BACKUP_OFFSITE_URI

if (-not $offsiteUri) {
  throw "BACKUP_OFFSITE_URI is required for offsite sync."
}

if (-not (Test-Path $backupRoot)) {
  throw "Backup root not found: $backupRoot"
}

if ((Get-Command aws -ErrorAction SilentlyContinue) -and $offsiteUri.StartsWith("s3://")) {
  & aws s3 sync $backupRoot $offsiteUri --sse AES256
  Write-Host "Offsite sync completed with aws s3 sync."
  exit 0
}

if (Get-Command rclone -ErrorAction SilentlyContinue) {
  & rclone copy $backupRoot $offsiteUri
  Write-Host "Offsite sync completed with rclone."
  exit 0
}

throw "No supported offsite sync tool found. Install aws CLI or rclone."
