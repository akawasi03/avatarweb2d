<#
.SYNOPSIS
  Instant 1-Click Rollback Script for Avatar WebGL Migration
.DESCRIPTION
  Restores the pre-migration snapshot of avatar-web and restores the database if requested.
#>

param(
  [switch]$RestoreDatabase = $false
)

$ErrorActionPreference = "Stop"

$BASE_DIR = "D:\avatarweb2d"
$BACKUP_DIR = Join-Path $BASE_DIR "backups\avatar-web_pre_structure_snapshot"
$TARGET_DIR = Join-Path $BASE_DIR "avatar-web"
$SQL_DUMP = Join-Path $BASE_DIR "backups\avatar_2x_backup.sql"
$MYSQL_BIN = "D:\mariadb\bin\mysql.exe"

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "    AVATAR WEBGL - INSTANT ROLLBACK PROCEDURE          " -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

if (-not (Test-Path $BACKUP_DIR)) {
  Write-Error "CRITICAL: Backup directory does not exist at $BACKUP_DIR! Aborting rollback."
  exit 1
}

Write-Host "[1/3] Restoring avatar-web directory from snapshot..." -ForegroundColor Yellow
$tempBackup = Join-Path $BASE_DIR "backups\avatar-web_failed_state_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
if (Test-Path $TARGET_DIR) {
  Move-Item -Path $TARGET_DIR -Destination $tempBackup -Force
  Write-Host "  Archived current broken state to $tempBackup" -ForegroundColor Gray
}

Copy-Item -Path $BACKUP_DIR -Destination $TARGET_DIR -Recurse -Force
Write-Host "  Successfully restored avatar-web from snapshot!" -ForegroundColor Green

if ($RestoreDatabase) {
  Write-Host "[2/3] Restoring MariaDB database avatar_2x from $SQL_DUMP..." -ForegroundColor Yellow
  if (Test-Path $SQL_DUMP) {
    & $MYSQL_BIN -u root avatar_2x < $SQL_DUMP
    Write-Host "  Database avatar_2x restored successfully!" -ForegroundColor Green
  } else {
    Write-Warning "SQL dump not found at $SQL_DUMP, skipping database restore."
  }
} else {
  Write-Host "[2/3] Database restore skipped (pass -RestoreDatabase to restore SQL dump)." -ForegroundColor Gray
}

Write-Host "[3/3] Verifying restored codebase..." -ForegroundColor Yellow
$hasPackages = Test-Path (Join-Path $TARGET_DIR "packages")
$hasAssets = Test-Path (Join-Path $TARGET_DIR "assets")
$hasTools = Test-Path (Join-Path $TARGET_DIR "tools")

if ($hasPackages -and $hasAssets -and $hasTools) {
  Write-Host "=======================================================" -ForegroundColor Green
  Write-Host "    ROLLBACK COMPLETED SUCCESSFULLY! SYSTEM RESTORED. " -ForegroundColor Green
  Write-Host "=======================================================" -ForegroundColor Green
} else {
  Write-Error "Verification failed! Some core directories are missing."
  exit 1
}
