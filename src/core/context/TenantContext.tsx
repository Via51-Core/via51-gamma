/**
 * PATH: src/core/context/TenantContext.tsx
 * NAME: TenantContext.tsx
 * VERSION: v51.6 - Antigravity
 * LOCATION: Comas, Lima, Peru
 * DATE: March 31, 2026 | 21:58
 * DESCRIPTION: Orquestador de contexto jerárquico para el ecosistema VÍA51.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Estructura de Registro del Sistema (sys_registry)
interface TenantConfig {
  id: string;
  name: string;
  tier: 'ALFA' | 'BETA' | 'GAMMA';
  subdomain: string;
  theme_config: object;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  supabase: SupabaseClient | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inicialización del Cliente Supabase con UID Maestro
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const identifyTenant = async () => {
      try {
        const hostname = window.location.hostname;
        // Extracción del subdominio para identificar el nodo Alfa
        const subdomain = hostname.split('.')[0]; 

        // Consulta quirúrgica a sys_registry con validación de Tenant
        const { data, error: sbError } = await supabase
          .from('sys_registry')
          .select('*')
          .eq('subdomain', subdomain)
          .single();

        if (sbError) throw new Error(`Node Identification Failed: ${sbError.message}`);

        setTenant(data as TenantConfig);
        
        // Log de Auditoría en sys_events (Solo Nivel Beta/Gamma)
        await supabase.from('sys_events').insert([
          { 
            event_type: 'NODE_ACCESS', 
            payload: { hostname, tenant_id: data.id },
            master_uid: '9157ae13-36ac-4259-9680-1d9bd2cada4a' 
          }
        ]);

      } catch (err: any) {
        setError(err.message);
        console.error('[VÍA51 ERROR] Critical Isolation Failure:', err.message);
      } finally {
        setLoading(false);
      }
    };

    identifyTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, supabase, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider - Level BETA Access Required');
  }
  return context;
};