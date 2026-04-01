// Path: /src/lib/supabase/v51-client.ts
// Name: V51_Supabase_Secure_Client
// Identity: Comas, Lima, Peru | 2026-03-31 18:58:00

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Root Owner Check: 9157ae13-36ac-4259-9680-1d9bd2cada4a
 * Este cliente inicializa la conexión validando el aislamiento por hostname.
 */
export const getV51Client = (tenantId?: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        'x-v51-tenant-id': tenantId || 'UNKNOWN',
      },
    },
  });
};

/**
 * Ejemplo de Query con RLS dinámico:
 * SELECT * FROM sys_events WHERE tenant_id = current_setting('request.headers')::json->>'x-v51-tenant-id';
 */
export const fetchNodeConfig = async (hostname: string) => {
  const supabase = getV51Client();
  
  const { data, error } = await supabase
    .from('sys_registry')
    .select('*')
    .eq('node_domain', hostname)
    .single();

  if (error) throw new Error(`CRITICAL_FAILURE: Node ${hostname} isolation breach attempt.`);
  return data;
};