/**
 * RUTA: src/core/deploy.config.ts
 * INTENCIÓN: Definir las variables de entorno y los parámetros de seguridad
 * que separan el motor de las aplicaciones durante la construcción (Build).
 */

export const DEPLOY_CONFIG = {
    env: process.env.NODE_ENV || 'production',
    core_version: "2.0",
    // El motor no debe conocer el dominio, solo recibe el path del activo
    assets_path: process.env.VITE_ASSETS_PATH || '/assets/current_domain/',
    security_protocol: "GAMMA_LEVEL_ENCRYPTION"
};