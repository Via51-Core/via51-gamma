/**
 * PATH: ./v51-push.sh
 * NAME: v51-push.sh
 * LOCATION: Comas, Lima, Peru
 * DATE: March 31, 2026 | 22:32
 * DESCRIPTION: Script de despliegue rápido para el ecosistema VÍA51.
 */

#!/bin/bash

# 1. Validar mensaje
if [ -z "$1" ]
  then
    echo "ERROR: Debe proveer un mensaje de commit (Ej: 'fix: schema repair')"
    exit 1
fi

# 2. Ejecución de flujo Antigravity
echo "--- INICIANDO PROTOCOLO GITHOT VÍA51 ---"
git add .
git commit -m "$1 [Root: 9157ae13]"
git push origin main

echo "--- DESPLIEGUE EN NODO BETA COMPLETADO ---"