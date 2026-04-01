/**
 * ARCHIVO: src/hooks/useV51Registry.ts
 * DESCRIPCIÓN: Hook encargado de la extracción agnóstica de datos de la DB.
 * REGLA: Usa columnas estandarizadas (configuration, node_tree).
 */
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useV51Registry = () => {
  const [nodeData, setNodeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Identificación del Tenant (localhost -> politica-general para pruebas)
  const hostname = window.location.hostname;
  const CURRENT_SLUG = hostname === 'localhost' ? 'politica-general' : hostname.split('.')[0];

  useEffect(() => {
    const fetchRegistry = async () => {
      try {
        setLoading(true);
        
        // Petición al Kernel (Supabase)
        const { data, error: supaError } = await supabase
          .from('sys_registry')
          .select('id, slug, configuration, node_tree') 
          .eq('slug', CURRENT_SLUG)
          .maybeSingle();

        if (supaError) throw new Error(supaError.message);
        
        if (!data) {
          setError("TENANT_NOT_FOUND");
        } else {
          // Normalización de datos para el proyector
          setNodeData({
            id: data.id,
            slug: data.slug,
            // Extraemos del JSONB de configuración
            phrases: data.configuration?.campaign_phrases || ["VÍA51_ACTIVE"],
            brand: data.configuration?.brand_name || 'VÍA51_UNIT',
            speed: data.configuration?.rotation_speed || 3000,
            tree: data.node_tree
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistry();
  }, [CURRENT_SLUG]);

  return { nodeData, loading, error };
};