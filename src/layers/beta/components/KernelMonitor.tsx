import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';
import { useTenant } from '../context/TenantContext';

export const KernelMonitor: React.FC = () => {
  const { tenant } = useTenant();
  const [telemetry, setTelemetry] = useState({ total_events: 0, geo_traces: 0, registry_count: 0, last_event: 'AWAITING' });

  const sync_telemetry = async () => {
    if (!tenant?.id) return;

    const [events, traces, registry] = await Promise.all([
      supabase.from(SCHEMA.TABLES.TELEMETRY).select('*', { count: 'exact', head: true }).eq('tenant_id', tenant.id),
      supabase.from(SCHEMA.TABLES.TELEMETRY).select('*', { count: 'exact', head: true }).eq('tenant_id', tenant.id).eq('event_type', 'GEO_TRACE'),
      supabase.from('sys_registry').select('*', { count: 'exact', head: true })
    ]);

    setTelemetry({
      total_events: events.count || 0,
      geo_traces: traces.count || 0,
      registry_count: registry.count || 0,
      last_event: new Date().toLocaleTimeString()
    });
  };

  useEffect(() => {
    sync_telemetry();
    const channel = supabase.channel('kernel_pulse')
      .on('postgres_changes', { event: '*', schema: 'public', table: SCHEMA.TABLES.TELEMETRY }, sync_telemetry)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sys_registry' }, sync_telemetry)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [tenant?.id]);

  return (
    <div className="fixed bottom-6 left-6 z-[1000] font-mono pointer-events-none">
      <div className="bg-black/90 border border-zinc-800 p-5 rounded-sm backdrop-blur-xl w-64">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3">
          <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Sys_Kernel_v51</span>
          <span className="text-emerald-500 text-[9px] font-bold animate-pulse">ONLINE</span>
        </div>
        <div className="space-y-2 text-[10px] uppercase">
          <div className="flex justify-between">
            <span className="text-zinc-400">Total_Events:</span>
            <span className="text-white font-bold">{telemetry.total_events}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400/80">Geo_Traces (Ext):</span>
            <span className="text-blue-400 font-bold">{telemetry.geo_traces}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-400/80">Registry (Int):</span>
            <span className="text-emerald-400 font-bold">{telemetry.registry_count}</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-900 text-[8px] text-zinc-600 flex justify-between">
          <span>LAST_SYNC:</span>
          <span>{telemetry.last_event}</span>
        </div>
      </div>
    </div>
  );
};