# dev-all.ps1
# Starts backend + frontend together for local development.

$repoRoot = Split-Path -Parent $PSScriptRoot
$backendRoot = Join-Path $repoRoot "backend"
$backendPort = 4000

Set-Location $repoRoot

Write-Host "Starting backend (npm run dev) ..."
$backendProc = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory $backendRoot -NoNewWindow -PassThru

Write-Host "Starting frontend (npm run dev) ..."
$env:VITE_API_BASE_URL = "http://localhost:$backendPort"

try {
  & npm run dev
}
finally {
  if ($backendProc -and -not $backendProc.HasExited) {
    Write-Host "Stopping backend (PID $($backendProc.Id)) ..."
    try {
      Stop-Process -Id $backendProc.Id -Force
    }
    catch {
      Write-Host "Could not stop backend process cleanly. Please ensure port $backendPort is free."
    }
  }
}