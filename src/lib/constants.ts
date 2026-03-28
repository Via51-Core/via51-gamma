// Ubicación: src/lib/constants.ts
// Motor de Identidad V51 - Sintonía Antigravity

export const SCHEMA = {
  TABLES: {
    // Apuntamos a la tabla en 'public' con prefijo de sistema
    ORGANIZATIONS: 'sys_registry', 
    TELEMETRY: 'sys_events' 
  },
  DATA_KEYS: {
    // Sintonizado con tu Schema Visualizer de Supabase
    TREE: 'node_tree',
    CONFIG: 'configuracion_json',
    THEME: 'theme',
    ASSETS: 'assets'
  }
} as const;