# Script para restaurar el proyecto y guardar cambios locales
# Autor: Antigravity Assistant

$ErrorActionPreference = "Stop"

# Configuración de rutas
$projectRoot = "c:\Users\USUARIO\OneDrive - netapplications.com.co\Documentos\Gestor-Drogueria"
$backupRoot = "c:\Users\USUARIO\OneDrive - netapplications.com.co\Documentos\Gestor-Drogueria_Backup_Jan26"

Write-Host "=========================================="
Write-Host "      INICIANDO PROCESO DE RESTAURACIÓN   "
Write-Host "=========================================="

# 1. Asegurar que no hay procesos de Git bloqueando
Write-Host "[1/4] Deteniendo procesos de Git..."
Get-Process git -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. Crear Copia de Seguridad de los cambios actuales
Write-Host "[2/4] Creando copia de seguridad de tus cambios actuales..."
Write-Host "      Destino: $backupRoot"
if (-not (Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

# Usamos Robocopy para una copia robusta (excluyendo node_modules y .git para velocidad)
# /MIR: Reflejar árbol de directorios
# /XD: Excluir directorios
# /XF: Excluir archivos (ej. index.lock si estuviera fuera)
$robocopyParams = @(
    $projectRoot,
    $backupRoot,
    "/MIR",
    "/XD", "node_modules", ".git", ".vscode",
    "/XF", "desktop.ini"
)
Write-Host "      Copiando archivos (esto puede tardar unos segundos)..."
# Robocopy devuelve códigos de salida no estándar, así que manejamos el error manualmente o ignoramos para este script simple
Start-Process -FilePath "robocopy" -ArgumentList $robocopyParams -Wait -NoNewWindow

Write-Host "      Copia de seguridad completada."

# 3. Eliminar bloqueo de Git si existe
Write-Host "[3/4] Verificando bloqueos de Git (index.lock)..."
$lockFile = Join-Path $projectRoot ".git\index.lock"
if (Test-Path $lockFile) {
    Remove-Item $lockFile -Force
    Write-Host "      Archivo index.lock eliminado."
} else {
    Write-Host "      No se encontró index.lock."
}

# 4. Restaurar el repositorio al estado del 22 de Enero (Commit 815db08)
Write-Host "[4/4] Restaurando código fuente a la versión del 22 de Enero..."
Set-Location $projectRoot
try {
    git reset --hard 815db08
    Write-Host "      ¡ÉXITO! El repositorio ha sido restaurado al commit 815db08."
} catch {
    Write-Host "      ERROR CRÍTICO AL RESTAURAR GIT: $_"
    exit 1
}

Write-Host "------------------------------------------"
Write-Host "PROCESO FINALIZADO"
Write-Host "1. Proyecto restaurado al 22 de Enero."
Write-Host "2. Cambios guardados en: $backupRoot"
Write-Host "------------------------------------------"
