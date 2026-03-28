// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'; //

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificación de seguridad para depurar en consola
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERROR: Credenciales de Supabase no detectadas en .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public' 
  }
}); //