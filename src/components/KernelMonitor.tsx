// ==========================================
// PATH: src/components/KernelMonitor.tsx
// COMPONENT: Advanced System Health Monitor
// STANDARD: Technical English / Real-time Telemetry
// ==========================================
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';
import { useTenant } from '../context/TenantContext';

export const KernelMonitor: React.FC = () => {
  const { tenant } = useTenant();
  const [telemetry, setTelemetry] = useState({
    total_events: 0,
    geo_traces: 0,
    registry_count: 0,
    last_event: 'AWAITING_SIGNAL'
  });

  const sync_telemetry = async () => {
    if (!tenant?.id) return;

    // 1. Count Total Events (Generic Telemetry)
    const { count: events } = await supabase
      .from(SCHEMA.TABLES.TELEMETRY)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenant.id);

    // 2. Count Geo Traces (Specific External Hits)
    const { count: traces } = await supabase
      .from(SCHEMA.TABLES.TELEMETRY)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenant.id)
      .eq('event_type', 'GEO_TRACE');

    // 3. Count Registry Objects (Internal Entries)
    const { count: registry } = await supabase
      .from('sys_registry')
      .select('*', { count: 'exact', head: true });

    setTelemetry({
      total_events: events || 0,
      geo_traces: traces || 0,
      registry_count: registry || 0,
      last_event: new Date().toLocaleTimeString()
    });
  };

  useEffect(() => {
    sync_telemetry();

    // Subscribe to real-time pulses from both tables
    const channel = supabase
      .channel('kernel_pulse')
      .on('postgres_changes', { event: '*', schema: 'public', table: SCHEMA.TABLES.TELEMETRY }, () => sync_telemetry())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sys_registry' }, () => sync_telemetry())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [tenant?.id]);

  return (
    <div className="fixed bottom-6 left-6 z-[1000] font-mono selection:bg-zinc-800 pointer-events-none">
      <div className="bg-black/90 border border-zinc-800 p-5 rounded-sm backdrop-blur-xl w-64 shadow-2xl">
        
        {/* MONITOR HEADER */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-3">
          <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em]">Sys_Kernel_v51</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-emerald-500 text-[9px] font-bold">ONLINE</span>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-[10px] uppercase">Total_Events:</span>
            <span className="text-white text-xs font-bold">{telemetry.total_events}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-[10px] uppercase font-bold text-blue-400/80">Geo_Traces (Ext):</span>
            <span className="text-blue-400 text-xs font-black">{telemetry.geo_traces}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-[10px] uppercase font-bold text-emerald-400/80">Registry (Int):</span>
            <span className="text-emerald-400 text-xs font-black">{telemetry.registry_count}</span>
          </div>
        </div>

        {/* FOOTER LOG */}
        <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center">
          <span className="text-zinc-600 text-[8px] uppercase">Last_Sync:</span>
          <span className="text-zinc-500 text-[8px]">{telemetry.last_event}</span>
        </div>

      </div>
    </div>
  );
};