// path: src/lib/supabaseClient.ts
// Standard: Vite 5+ / VÍA51-Core
import { createClient } from '@supabase/supabase-js';

// En Vite se accede vía import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Error silencioso en producción, pero ruidoso en desarrollo Gamma
  console.warn("⚠️ V51_CORE_AUTH_MISSING: Check your .env file for VITE_ prefix.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);