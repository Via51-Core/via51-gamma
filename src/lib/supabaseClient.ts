import { createClient } from '@supabase/supabase-js';

// Sincronización exacta con tu archivo .env
const supabaseUrl = import.meta.env.VITE_CORE_DATA_URL;
const supabaseAnonKey = import.meta.env.VITE_CORE_PUBLIC_TOKEN;

// Validación de arranque en consola
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERROR CRÍTICO: El motor Gamma no detecta las variables en el archivo .env");
}

// Inicialización del Cliente Único
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Alias para compatibilidad con el resto del sistema
export const dataClient = supabase;

export default supabase;
