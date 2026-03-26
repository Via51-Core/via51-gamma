import { createClient } from '@supabase/supabase-js';

// Extraemos las variables del motor (Vite utiliza import.meta.env)
const CORE_URL = import.meta.env.VITE_CORE_DATA_URL;
const CORE_TOKEN = import.meta.env.VITE_CORE_PUBLIC_TOKEN;

// Validación de túnel de datos
if (!CORE_URL || !CORE_TOKEN) {
  console.error("ERROR CRÍTICO: El motor Gamma no detecta las variables de infraestructura.");
}

// Exportación del cliente de datos neutro
export const dataClient = createClient(CORE_URL, CORE_TOKEN);

// Mantenemos este alias solo por compatibilidad si otros componentes lo usan
export const supabase = dataClient;
