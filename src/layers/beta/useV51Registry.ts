/**
 * PATH: src/hooks/useV51Registry.ts
 * DESCRIPCIÓN: Extracción de datos alineada con el Esquema VIA51 (V51.6).
 * REGLA: Uso obligatorio del esquema 'via51' y tabla 'v51_registry'.
 */
import { useEffect, useState } from 'react';
// Cambiamos la fuente a nuestro nuevo orquestador de soberanía
import { v51 as supabase } from '../lib/supabaseAdmin';

export const useV51Registry = () => {
  const [nodeData, setNodeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Identificación del Tenant (Agnosticismo de Dominio)
  const hostname = window.location.hostname;
  const CURRENT_SLUG = hostname === 'localhost' ? 'politica-general' : hostname.split('.')[0];

  useEffect(() => {
    const fetchRegistry = async () => {
      try {
        setLoading(true);

        // Petición al Kernel usando el esquema 'via51'
        const { data, error: supaError } = await supabase
          .from('v51_registry') // Nombre de tabla real validado
          .select('id, slug, configuration, node_tree')
          .eq('slug', CURRENT_SLUG)
          .maybeSingle();

        if (supaError) throw new Error(supaError.message);

        if (!data) {
          setError("TENANT_NOT_FOUND_IN_VIA51_SCHEMA");
        } else {
          // Normalización de datos para el motor de renderizado
          setNodeData({
            id: data.id,
            slug: data.slug,
            phrases: data.configuration?.campaign_phrases || ["VÍA51_ACTIVE"],
            brand: data.configuration?.brand_name || 'VÍA51_UNIT',
            speed: data.configuration?.rotation_speed || 3000,
            tree: data.node_tree
          });
        }
      } catch (err: any) {
        console.error("V51_CORE_FETCH_ERROR:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistry();
  }, [CURRENT_SLUG]);

  return { nodeData, loading, error };
};