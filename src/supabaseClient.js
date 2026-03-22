// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Reemplace con sus credenciales reales de Supabase
const supabaseUrl = 'https://SU_PROYECTO_ID.supabase.co'
const supabaseAnonKey = 'SU_ANON_KEY_PUBLICA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)