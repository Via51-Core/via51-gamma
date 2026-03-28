// Ubicación: src/context/TenantContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';

interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  nodeTree: any;
  assets?: { logo: string; favicon: string; };
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
        const isLocal = host === 'localhost' || host === '127.0.0.1';
        
        // Resolución de SLUG (Alfa I/O)
        const slug = isLocal 
          ? (import.meta.env.VITE_DEV_CLIENT_SLUG || 'default') 
          : host.split('.')[0];

        // Consulta directa a la tabla sys_registry en esquema public
        const { data, error: dbError } = await supabase
          .from(SCHEMA.TABLES.ORGANIZATIONS)
          .select('*')
          .eq('slug', slug.toLowerCase().trim())
          .maybeSingle();

        if (dbError) throw dbError;

        if (data) {
          const tree = data[SCHEMA.DATA_KEYS.TREE];
          const config = data[SCHEMA.DATA_KEYS.CONFIG];
          const theme = config?.[SCHEMA.DATA_KEYS.THEME] || { primary: '#3b82f6', secondary: '#1e293b' };
          const assets = config?.[SCHEMA.DATA_KEYS.ASSETS];

          // Inyección Antigravity de Estilos
          document.documentElement.style.setProperty('--v51-primary', theme.primary);
          
          setTenant({
            id: data.id,
            slug: data.slug,
            name: data.slug.toUpperCase(),
            nodeTree: tree,
            assets
          });
        } else {
          setError(`REGISTRO_NO_ENCONTRADO: El slug [${slug}] no existe en la base de datos.`);
        }
      } catch (err: any) {
        setError(`FALLO_CONEXION: ${err.message || 'Error de red con Supabase'}`);
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