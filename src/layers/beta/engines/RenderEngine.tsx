// src/engines/RenderEngine.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import { SCHEMA } from '../lib/constants';
import { useTenant } from '../context/TenantContext';

interface RenderProps {
  capaId: string;
  variableName: string;
  tituloMonitor: string;
}

export const RenderEngine: React.FC<RenderProps> = ({ capaId, variableName, tituloMonitor }) => {
  const [dato, setDato] = useState<number | null>(null);
  
  // Extraemos la identidad del Tenant actual para filtrar el flujo de datos del Holding
  const { tenant } = useTenant();

  useEffect(() => {
    if (!tenant) return;

    /**
     * 1. Consulta Inicial (Fetch)
     * Traemos el último valor registrado para este cliente y este nodo específico.
     */
    const fetchLastValue = async () => {
      const { data, error } = await supabase
        .from(SCHEMA.TABLES.TELEMETRY)
        .select('valor')
        .eq('capa_id', capaId)
        .eq('variable_name', variableName)
        .eq('tenant_id', tenant.id) 
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(); // Usamos maybeSingle para evitar errores si la tabla está vacía

      if (data && !error) {
        setDato(data.valor);
      }
    };

    fetchLastValue();

    /**
     * 2. Suscripción en Tiempo Real (Realtime)
     * Escuchamos solo las inserciones que pertenecen a este Tenant.
     */
    const channel = supabase
      .channel(`realtime-${capaId}-${tenant.id}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: SCHEMA.TABLES.TELEMETRY, 
          // Ajuste de Clase Mundial: comillas simples para soportar UUID/Text en el filtro
          filter: `capa_id=eq.'${capaId}'` 
        },
        (payload) => {
          // Doble validación de seguridad: Variable y Pertenencia al Tenant
          if (
            payload.new.variable_name === variableName && 
            payload.new.tenant_id === tenant.id
          ) {
            setDato(payload.new.valor);
          }
        }
      ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [capaId, variableName, tenant]);

  return (
    <div className="engine-box render">
      <h3>{tituloMonitor}</h3>
      <div className="digital-display">
        {dato !== null ? dato.toFixed(2) : '---'}
      </div>
      {tenant && (
        <div className="tenant-tag" style={{ fontSize: '10px', opacity: 0.6, marginTop: '8px' }}>
          ORG: {tenant.name}
        </div>
      )}
    </div>
  );
};