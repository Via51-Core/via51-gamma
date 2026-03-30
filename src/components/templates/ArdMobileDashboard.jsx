// src/components/templates/ArdMobileDashboard.tsx

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Database, 
  Activity, 
  User, 
  Settings, 
  Zap, 
  Globe, 
  Lock 
} from 'lucide-react';

/**
 * @interface NodeStats
 * Definición de tipos para el Ecosistema VÍA51
 */
interface NodeStats {
  events: number;
  geoTraces: number;
  registry: number;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
}

/**
 * COMPONENTE: ArdMobileDashboard
 * NODO: ard.via51.org
 * TECNOLOGÍA: React + TypeScript + Tailwind v51.6
 * REGLA: Aislamiento estricto de Tenant y Root Owner.
 */

const ArdMobileDashboard: React.FC = () => {
  const [stats, setStats] = useState<NodeStats>({
    events: 0,
    geoTraces: 0,
    registry: 0,
    status: 'ONLINE'
  });

  const ROOT_OWNER: string = '9157ae13-36ac-4259-9680-1d9bd2cada4a';
  const HOSTNAME: string = window.location.hostname;
  const IS_AUTHORIZED: boolean = HOSTNAME === 'ard.via51.org' || HOSTNAME === 'localhost';

  // Validación de seguridad en capa de renderizado
  if (!IS_AUTHORIZED) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <p className="text-red-600 font-mono font-bold tracking-tighter text-xs">
          403_FORBIDDEN_HOST_OUT_OF_SCOPE
        </p>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 bg-[#080808] flex items-center justify-center p-4 overflow-hidden select-none">
      
      {/* Definición de Límites: Ambient Light Bloom */}
      <div className="absolute w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* CHASIS FÍSICO (Hardware Representation) */}
      <div className="relative w-[385px] h-[810px] bg-[#121212] rounded-[64px] p-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10 flex-shrink-0">
        
        {/* Dynamic Island: Sensor Array */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[100] border border-white/5 flex items-center justify-end px-4">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/5" />
        </div>

        {/* Botones Físicos (Laterales Externos) */}
        <div className="absolute -left-[2px] top-32 w-[4px] h-16 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-l-md border-l border-white/10" />
        <div className="absolute -right-[2px] top-40 w-[4px] h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-r-md border-r border-white/10" />

        {/* PANTALLA OLED (Viewport Interior) */}
        <div className="w-full h-full bg-[#1c1f24] rounded-[52px] overflow-hidden flex flex-col relative border border-white/10 shadow-inner">
          
          {/* Status Bar Administrativa */}
          <header className="px-8 pt-12 pb-4 flex justify-between items-center bg-[#252a31]/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-900/40 rotate-3">
                <span className="text-[10px] font-black text-white -rotate-3 uppercase tracking-tighter">V51</span>
              </div>
              <div className="leading-tight">
                <p className="text-[9px] text-blue-400 font-mono font-black uppercase tracking-[0.2em]">Root_Authorized</p>
                <p className="text-[11px] font-bold text-slate-200">fredy.bazalar@via51.org</p>
              </div>
            </div>
            <Settings size={18} className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
          </header>

          {/* Body: Dashboard del Nodo ARD */}
          <section className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter text-white">Holding_Chassis_v51</h1>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest">Sys_Kernel_v51:ONLINE</span>
              </div>
            </div>

            {/* Accesos de Nivel Gamma (Beta/Science) */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-5 bg-[#2a3039] rounded-[32px] border border-white/5 active:scale-95 transition-all shadow-xl group">
                <Zap className="text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" size={24} />
                <span className="text-[9px] font-black text-center text-slate-300 uppercase leading-none">Access_Beta<br/>Development</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-5 bg-[#2a3039] rounded-[32px] border border-white/5 active:scale-95 transition-all shadow-xl group">
                <Globe className="text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" size={24} />
                <span className="text-[9px] font-black text-center text-slate-300 uppercase leading-none">Access_Gamma<br/>Science</span>
              </button>
            </div>

            {/* Monitor de Tablas Críticas (sys_events / sys_registry) */}
            <div className="space-y-3">
              <div className="bg-[#252a31] p-4 rounded-3xl border border-white/5 flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-blue-500" />
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Total_Events</span>
                </div>
                <span className="text-lg font-mono font-bold text-white tracking-tighter">{stats.events}</span>
              </div>

              <div className="bg-[#252a31] p-4 rounded-3xl border border-white/5 flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <Database size={16} className="text-emerald-500" />
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Registry (Int)</span>
                </div>
                <span className="text-lg font-mono font-bold text-white tracking-tighter">{stats.registry}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-center">
              <p className="text-[8px] text-slate-600 font-mono font-bold tracking-[0.3em] uppercase">
                Auth_UID: {ROOT_OWNER.substring(0, 8)}...
              </p>
            </div>
          </section>

          {/* Navigation Bar (Custom UI) */}
          <nav className="h-24 bg-[#1a1d23]/95 backdrop-blur-xl border-t border-white/10 px-8 flex justify-between items-center relative z-[110]">
            <LayoutDashboard className="text-blue-500" size={22} />
            <Database className="text-slate-600" size={22} />
            <div className="relative -mt-12">
              <div className="absolute inset-0 bg-blue-600/30 blur-2xl rounded-full scale-150" />
              <button className="w-14 h-14 bg-gradient-to-b from-blue-500 to-indigo-700 rounded-[22px] flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-blue-400/50 relative">
                <Lock className="text-white" size={24} />
              </button>
            </div>
            <Activity className="text-slate-600" size={22} />
            <User className="text-slate-600" size={22} />
          </nav>

        </div>
      </div>
    </main>
  );
};

export default ArdMobileDashboard;