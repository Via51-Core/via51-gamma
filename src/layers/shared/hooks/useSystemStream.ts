import { useEffect, useState } from 'react';
import { dataClient } from '../../../lib/supabaseClient'; // Usamos el cliente neutro que creamos antes

export function useSystemStream() {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState({ is_critical_mode: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEngineState = async () => {
    try {
      // 1. Consultamos el estado del motor (Modo Coyuntura o Estándar)
      const { data: engineConfig } = await dataClient
        .from('engine_config') 
        .select('*')
        .single();

      // 2. Traemos los datos de los 3 Pilares y del evento Alfa
      const { data: nodes } = await dataClient
        .from('core_nodes') // Tabla neutra (antes nodos_alfa)
        .select('*')
        .eq('is_active', true);

      setConfig({
        is_critical_mode: engineConfig?.operational_mode === 'CRITICAL'
      });

      setData({
        pillars: {
          political: nodes?.find(n => n.type === 'political'),
          social: nodes?.find(n => n.type === 'social'),
          productive: nodes?.find(n => n.type === 'productive'),
        },
        critical_event: nodes?.find(n => n.is_emergency === true)
      });

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngineState();

    // SUSCRIPCIÓN EN TIEMPO REAL: El "Pulso del Holding"
    const canal = dataClient
      .channel('system-pulse')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'engine_config' }, () => {
        fetchEngineState(); // Si cambias el interruptor en Supabase, la UI muta al instante
      })
      .subscribe();

    return () => dataClient.removeChannel(canal);
  }, []);

  return { data, config, loading, error };
}