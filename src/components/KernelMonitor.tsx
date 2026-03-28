import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';

/**
 * KERNEL MONITOR - DIAGNÓSTICO DE SISTEMA
 * Monitorea en tiempo real la conexión con el núcleo de la base de datos (Supabase).
 * Verifica la existencia de identidad en [sys_registry] y actividad en [sys_events].
 */
export const KernelMonitor: React.FC = () => {
  const [status, setStatus] = useState<{ 
    registry: 'loading' | 'ok' | 'error'; 
    events: number | null 
  }>({
    registry: 'loading',
    events: null
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const probeKernel = async () => {
      try {
        // 1. Prueba de conexión al Registro de Identidad (Tabla sys_registry)
        // Nota: SCHEMA.TABLES.ORGANIZATIONS debe apuntar a 'sys_registry' en constants.ts
        const { error: regError } = await supabase
          .from(SCHEMA.TABLES.ORGANIZATIONS)
          .select('id')
          .limit(1)
          .maybeSingle();

        if (regError) throw regError;

        // 2. Prueba de conteo en Telemetría (Tabla sys_events)
        // Nota: SCHEMA.TABLES.TELEMETRY debe apuntar a 'sys_events' en constants.ts
        const { count, error: evError } = await supabase
          .from(SCHEMA.TABLES.TELEMETRY)
          .select('*', { count: 'exact', head: true });

        if (evError) {
            console.warn("[Telemetry Probe Warning]:", evError.message);
            // No lanzamos error fatal aquí para que el monitor de registro siga vivo
        }

        setStatus({ registry: 'ok', events: count });
      } catch (err: any) {
        setStatus(prev => ({ ...prev, registry: 'error' }));
        setErrorMessage(err.message);
        console.error("[Kernel Monitor Error]:", err);
      }
    };

    probeKernel();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      padding: '15px', 
      background: 'rgba(26, 26, 26, 0.9)', 
      color: '#00ff00', 
      borderRadius: '8px', 
      fontFamily: 'monospace',
      fontSize: '11px',
      border: '1px solid #333',
      zIndex: 9999,
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #444', color: '#888' }}>
        SYS_KERNEL_PROBE v1.1
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        REGISTRY: {status.registry === 'ok' ? '🟢 ONLINE' : status.registry === 'loading' ? '🟡 PROBING...' : '🔴 FAILED'}
      </div>
      
      <div>
        TELEMETRY: 📊 {status.events ?? 0} EVTS
      </div>
      
      {errorMessage && (
        <div style={{ 
          color: '#ff4444', 
          marginTop: '10px', 
          fontSize: '9px', 
          maxWidth: '200px',
          borderTop: '1px dashed #552222',
          paddingTop: '5px'
        }}>
          LOG_ERR: {errorMessage}
        </div>
      )}
    </div>
  );
};