import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const TenantContext = createContext<any>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registryError, setRegistryError] = useState(false);

  useEffect(() => {
    const fetchTenant = async () => {
      const hostname = window.location.hostname;
      // En localhost forzamos un slug que exista en tu DB (ej: 'politica-general')
      const targetSlug = hostname === 'localhost' ? 'politica-general' : hostname.split('.')[0];

      const { data, error } = await supabase
        .from('sys_registry')
        .select('id, slug, configuration, node_tree') // <--- CAMBIO QUIRÚRGICO AQUÍ
        .eq('slug', targetSlug)
        .maybeSingle();

      if (error || !data) {
        setRegistryError(true);
      } else {
        setTenant({
          id: data.id,
          slug: data.slug,
          config: data.configuration, 
          nodeTree: data.node_tree     
        });
        setRegistryError(false);
      }
      setLoading(false);
    };
    fetchTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading, registryError }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);