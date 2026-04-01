// Path: C:/via51_ecosistema/via51-nodo-central/src/lib/supabase.ts
// Name: V51_Infrastructure_Supabase_Secure_Provider
// Identity: Comas, Lima, Peru | 2026-03-31 20:03:40

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const MASTER_UID = import.meta.env.VITE_V51_MASTER_UID;

/**
 * VALIDACIÓN QUIRÚRGICA: 
 * Si las variables no cargan, detenemos la ejecución del nodo 
 * para evitar fugas de datos o acceso anónimo no deseado.
 */
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("CRITICAL_V51_ERROR: Environment variables not loaded. Connectivity Aborted.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-v51-master-id': MASTER_UID, // Inyectado para auditoría en sys_events
    },
  },
});

/**
 * Función de Verificación de Privilegios Maestro
 */
export const isMasterSession = (currentUid: string): boolean => {
  return currentUid === MASTER_UID;
};