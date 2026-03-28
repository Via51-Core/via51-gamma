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
        // Resolución de SLUG (Alfa I/O)
        const slug = (host === 'localhost' || host === '127.0.0.1')
          ? (import.meta.env.VITE_DEV_CLIENT_SLUG || 'mesias') 
          : host.split('.')[0];

        // Consulta limpia a esquema public
        const { data, error: dbError } = await supabase
          .from(SCHEMA.TABLES.ORGANIZATIONS)
          .select('*')
          .eq('slug', slug.toLowerCase().trim())
          .maybeSingle();

        if (dbError) throw dbError;

        if (data) {
          setTenant({
            id: data.id,
            slug: data.slug,
            nodeTree: data[SCHEMA.DATA_KEYS.TREE],
            config: data[SCHEMA.DATA_KEYS.CONFIG]
          });
        } else {
          setError(`REGISTRO_NO_ENCONTRADO: ${slug}`);
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