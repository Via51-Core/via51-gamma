// src/context/TenantContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';

interface TenantConfig {
  id: string;
  slug: string;
  nodeTree: any;
  config: any;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
});

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncSystem = async () => {
      try {
        const host = window.location.hostname;

        // Resolución Agnóstica (Beta I/O)
        // Ya no cortamos strings. Buscamos el objeto de configuración por su identificador único.
        // En un entorno Multi-Tenant ideal, la tabla de organizaciones debería tener una columna 'domain' 
        // o usar el slug definido en el Middleware de Vercel.
        
        let targetSlug = '';
        
        if (host === 'localhost' || host === '127.0.0.1') {
          targetSlug = import.meta.env.VITE_DEV_CLIENT_SLUG || 'holding-ard';
        } else {
          // Mapeo directo para evitar lógica de strings en el cliente
          const domainMap: Record<string, string> = {
            'ard.via51.org': 'holding-ard',
            'pol.via51.org': 'politica-general',
            'fj.via51.org': 'inmobiliaria-fj'
          };
          targetSlug = domainMap[host] || host;
        }

        const { data, error: dbError } = await supabase
          .from(SCHEMA.TABLES.ORGANIZATIONS)
          .select('*')
          .eq('slug', targetSlug.toLowerCase().trim())
          .maybeSingle();

        if (dbError) throw dbError;

        if (data) {
          setTenant({
            id: data.id,
            slug: data.slug,
            nodeTree: data[SCHEMA.DATA_KEYS.TREE] || data.node_tree,
            config: data[SCHEMA.DATA_KEYS.CONFIG] || data.configuracion_json
          });
        } else {
          setError(`REGISTRO_NO_ENCONTRADO: ${targetSlug}`);
        }
      } catch (err: any) {
        setError(`FALLO_KERNEL: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    syncSystem();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);