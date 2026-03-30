// src/hooks/useV51Registry.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useV51Registry = () => {
  const [nodeData, setNodeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // En localhost, forzamos el slug 'ard' para pruebas si es necesario
  const CURRENT_SLUG = window.location.hostname === 'localhost' ? 'ard' : window.location.hostname.split('.')[0];

  useEffect(() => {
    const fetchRegistry = async () => {
      try {
        setLoading(true);
        
        // MAPEADO DE EQUIVALENCIAS V51
        // slug -> hostname
        // configuracion_json -> theme/chassis config
        const { data, error: supaError } = await supabase
          .from('sys_registry')
          .select('slug, configuracion_json, arbol_nodos_json, node_tree')
          .eq('slug', CURRENT_SLUG)
          .single();

        if (supaError) throw new Error(supaError.message);

        // Normalizamos la salida para el motor
        setNodeData({
          hostname: data.slug,
          // Extraemos el tipo de chasis del JSON de configuración
          chassis_type: data.configuracion_json?.chassis || 'MOBILE',
          // El path del componente viene del árbol de nodos
          node_path: data.configuracion_json?.node_path || 'ArdDashboard',
          theme_config: data.configuracion_json
        });

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