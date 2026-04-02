/**
 * PATH: /v51-gamma/src/lib/supabaseAdmin.ts
 * ROLE: Orquestador de Soberanía VÍA51
 */

import { createClient } from '@supabase/supabase-js';

// Constantes de Soberanía Inmutable
export const MASTER_UID = "9157ae13-36ac-4259-9680-1d9bd2cada4a";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ ERROR CRÍTICO: Credenciales de infraestructura no detectadas.");
}

/**
 * Cliente de Supabase configurado para el Esquema Maestro "via51"
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'via51' // Alineación con el hallazgo en image_f0ce70.png
    },
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});

// Alias administrativo para operaciones de alto nivel
export const v51 = supabase;