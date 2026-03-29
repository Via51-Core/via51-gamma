// ==========================================
// RUTA: src/hooks/useGeoTelemetry.ts
// COMPONENTE: Sensor de Telemetría Geográfica (Refinado)
// ==========================================
import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';
import { useTenant } from '../context/TenantContext';

export const useGeoTelemetry = (nodeId: string) => {
  const { tenant } = useTenant();

  useEffect(() => {
    const trackLocation = async () => {
      if (!tenant?.id) return;

      try {
        // Obtenemos datos de ubicación
        const res = await fetch('https://ipapi.co/json/');
        const geo = await res.json();

        // Inserción de pulso en sys_events
        await supabase
          .from(SCHEMA.TABLES.TELEMETRY)
          .insert([{
            tenant_id: tenant.id,
            event_type: 'GEO_TRACE',
            variable_name: `NODE_${nodeId}`,
            metadata: {
              ip: geo.ip,
              city: geo.city,
              country: geo.country_name,
              node: nodeId,
              timestamp: new Date().toISOString()
            }
          }]);
          
        console.log(`🌍 Trace registrado en Nodo: ${nodeId}`);
      } catch (e) {
        console.error("🔴 Error en Geo-Trace:", e);
      }
    };

    trackLocation();
  }, [tenant?.id, nodeId]); // Se dispara cada vez que cambia el nodo
};