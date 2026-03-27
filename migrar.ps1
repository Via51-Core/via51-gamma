# Protocolo de Transicion Limpia
Write-Host "INICIANDO PURGA DE CACHE Y EXTENSIONES" -ForegroundColor Cyan

# 1. Renombrar JSX a TSX
Get-ChildItem -Path "./src" -Filter "*.jsx" -Recurse | Rename-Item -NewName { $_.Name -replace '\.jsx$', '.tsx' }

# 2. Corregir imports en todos los archivos
$archivos = Get-ChildItem -Path "./src" -Include "*.tsx", "*.ts" -Recurse
foreach ($f in $archivos) {
    $content = Get-Content $f.FullName
    $content -replace '\.jsx', '' -replace '\.js', '' | Set-Content $f.FullName
}

# 3. Limpieza de cache de Vite (Elimina el error de Transform failed)
if (Test-Path "./node_modules/.vite") { 
    Remove-Item -Path "./node_modules/.vite" -Recurse -Force 
}

Write-Host "NODO SINCRONIZADO. REINICIA CON: npm run dev" -ForegroundColor Green