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
    actualizarContador();
    const canal = supabase
      .channel('cambios-telemetria')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: SCHEMA.TABLES.TELEMETRY }, 
          () => actualizarContador()
      )
      .subscribe();

    return () => { supabase.removeChannel(canal); };
  }, [tenant?.id]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-black/80 border border-zinc-800 p-4 rounded-lg font-mono text-[10px] backdrop-blur-md w-48 shadow-2xl">
        <div className="flex justify-between border-b border-zinc-800 pb-2 mb-2">
          <span className="text-zinc-500 font-bold">SYS_KERNEL_PROBE</span>
          <span className="text-green-500">● {status}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">TELEMETRY:</span>
          <span className="text-white font-bold text-xs bg-zinc-900 px-2 rounded border border-zinc-800">
            📊 {count} EVTS
          </span>
        </div>
      </div>
    </div>
  );
};