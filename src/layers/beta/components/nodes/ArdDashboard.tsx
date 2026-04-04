// src/components/nodes/ArdDashboard.tsx
import React from 'react';

const ArdDashboard = () => {
  return (
    <div className="p-6 text-white font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">ARD_CENTRAL_SYSTEM</h1>
        <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Node Status: Active</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <span className="block text-[9px] opacity-40 mb-1">NETWORK_LATENCY</span>
          <span className="text-xl font-mono text-green-400">24ms</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <span className="block text-[9px] opacity-40 mb-1">UPTIME_RELAY</span>
          <span className="text-xl font-mono">99.9%</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-center">
        <span className="text-xs text-blue-400 font-medium">Sincronización con Supabase: OK</span>
      </div>
    </div>
  );
};

export default ArdDashboard;