// src/lib/constants.ts
// Motor de Identidad - Sintonía Antigravity

export const SCHEMA = {
  TABLES: {
    // Usamos el nombre plano para que Supabase busque en 'public' por defecto
    ORGANIZATIONS: 'sys_registry', 
    TELEMETRY: 'sys_events' 
  },
  DATA_KEYS: {
    // Sintonizado con las columnas físicas de tu base de datos
    TREE: 'node_tree',           // La columna que contiene el JSON fractal
    CONFIG: 'configuracion_json', // Configuración de motor (Alfa/Beta/Gamma)
    THEME: 'theme',
    ASSETS: 'assets'
  }
} as const;