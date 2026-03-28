// Ubicación: src/services/telemetryService.ts
// Sección Gamma - Ciencia y Tecnología

import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';

export const trackEvent = async ({
  registry_id,
  node_id,
  action_type,
  metadata = {}
}: {
  registry_id: string;
  node_id: string;
  action_type: string;
  metadata?: any;
}) => {
  try {
    if (!registry_id) return;

    // Mapeo dinámico para sys_events
    await supabase
      .from(SCHEMA.TABLES.TELEMETRY)
      .insert([
        {
          organizacion_id: registry_id, // Mantenemos tu nombre de columna actual
          node_id,
          action_type,
          contexto: {
            ...metadata,
            sys_url: window.location.href,
            sys_ua: navigator.userAgent
          }
        }
      ]);
  } catch (err) {
    console.warn("[Gamma Warning]: Telemetría omitida por seguridad.");
  }
};
