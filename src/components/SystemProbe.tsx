// ==========================================
// RUTA: src/components/SystemProbe.tsx
// ==========================================
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';
import { useTenant } from '../context/TenantContext';

export const SystemProbe: React.FC = () => {
  const { tenant } = useTenant();
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<'ONLINE' | 'OFFLINE'>('OFFLINE');

  // Función para contar los registros actuales en la tabla sys_events
  const actualizarContador = async () => {
    if (!tenant?.id) return;
    
    const { count: total, error } = await supabase
      .from(SCHEMA.TABLES.TELEMETRY)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenant.id);

    if (!error && total !== null) {
      setCount(total);
      setStatus('ONLINE');
    }
  };

  useEffect(() => {
    // 1. Contamos al iniciar
    actualizarContador();

    // 2. ESCUCHA ACTIVA: Si Supabase recibe un INSERT, actualizamos el número
    const canal = supabase
      .channel('cambios-telemetria')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: SCHEMA.TABLES.TELEMETRY }, 
          () => {
            console.log("📡 Nuevo pulso detectado, refrescando contador...");
            actualizarContador();
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [tenant?.id]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-black/80 border border-zinc-800 p-4 rounded-lg font-mono text-[10px] backdrop-blur-md shadow-2xl w-48 text-left">
        <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
          <span className="text-zinc-500 uppercase font-bold tracking-widest">SYS_KERNEL_PROBE</span>
          <span className="text-[8px] bg-zinc-800 px-1 rounded text-zinc-400">v1.1</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-zinc-400 font-bold">REGISTRY:</span>
            <span className={status === 'ONLINE' ? "text-green-500" : "text-red-500"}>
              ● {status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-bold">TELEMETRY:</span>
            <span className="text-white font-bold text-xs bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 shadow-inner">
              📊 {count} EVTS
            </span>
          </div>
        </div>
        
        <div className="mt-3 h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-green-500/50 w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};