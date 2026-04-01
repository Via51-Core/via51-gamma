// path: src/lib/via51-orchestrator.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * resolveNodeRegistry
 * Intenta una consulta agnóstica probando ambos esquemas (el viejo y el fractal).
 */
export const resolveNodeRegistry = async (hostname: string) => {
  // Intentamos la query con el estándar VÍA51 (node_name)
  let { data, error } = await supabase
    .from('sys_registry')
    .select('node_name, tier, config')
    .eq('hostname', hostname)
    .single();

  // Si falla por columna inexistente (Error 42703), intentamos el esquema legacy
  if (error && error.code === '42703') {
    const legacyRequest = await supabase
      .from('sys_registry')
      .select('node_tree, tier, config')
      .eq('hostname', hostname)
      .single();
    
    if (!legacyRequest.error && legacyRequest.data) {
      return {
        // Mapeamos node_tree a node_name para que el resto de la app sea agnóstica
        node_name: legacyRequest.data.node_tree,
        tier: legacyRequest.data.tier,
        config: legacyRequest.data.config,
        isLegacy: true
      };
    }
  }

  return data;
};