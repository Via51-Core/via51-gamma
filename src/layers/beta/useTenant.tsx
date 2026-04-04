/**
 * PATH: /src/hooks/useTenant.tsx
 * ROLE: Nivel 1 - BETA (Orquestación de Contexto)
 * DESC: Hook maestro para la detección y validación de Tenant en el ecosistema VÍA51.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Cliente pre-configurado

interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  level: 'ALFA' | 'BETA' | 'GAMMA';
  settings: Record<string, any>;
}

const TenantContext = createContext<TenantConfig | null>(null);

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const identifyTenant = async () => {
      const hostname = window.location.hostname; // e.g., mesias.via51.org
      const slug = hostname.split('.')[0];

      const { data, error } = await supabase
        .from('sys_registry')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error(`[VÍA51 ERROR] Unauthorized Node: ${hostname}`);
        return;
      }

      setTenant(data);
      setLoading(false);
    };

    identifyTenant();
  }, []);

  return (
    <TenantContext.Provider value={tenant}>
      {!loading && children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);