/**
 * PATH: /src/components/layout/PortalHub.tsx
 * ROLE: Nivel 2 - ALFA (Ejecución)
 * DESC: Fachada tripartita del ecosistema VÍA51 con profundidad técnica ilimitada.
 */

import React from 'react';
import { useTenant } from '../../hooks/useTenant';

const SECTORS = [
  { id: 'political', label: 'DEPARTAMENTO POLÍTICO', color: 'bg-red-900/20', border: 'border-red-500' },
  { id: 'social', label: 'DEPARTAMENTO SOCIAL', color: 'bg-blue-900/20', border: 'border-blue-500' },
  { id: 'productive', label: 'DEPARTAMENTO PRODUCTIVO', color: 'bg-emerald-900/20', border: 'border-emerald-500' }
];

export const PortalHub: React.FC = () => {
  const tenant = useTenant();

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* HUD de Navegación Nivel 1 (BETA) */}
      <nav className="border-b border-white/10 p-4 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black tracking-tighter uppercase">VÍA51 // {tenant?.slug}</span>
          <div className="px-2 py-0.5 border border-white/20 text-[10px] opacity-50 uppercase">Node_Alfa_Active</div>
        </div>
        <div className="text-[10px] text-right uppercase opacity-40">
          UID: {tenant?.id.substring(0, 8)}...<br />
          Layer: ALFA_EXECUTION
        </div>
      </nav>

      {/* Main Fractal Grid */}
      <main className="grid grid-cols-1 md:grid-cols-3 min-h-[calc(100vh-64px)] divide-x divide-white/10">
        {SECTORS.map((sector) => (
          <section 
            key={sector.id}
            className={`group relative overflow-hidden flex flex-col items-center justify-center p-8 transition-all duration-700 hover:bg-white/[0.02] cursor-pointer`}
          >
            {/* Background Texture (Antigravity Style) */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            
            <div className={`w-full border-l-4 ${sector.border} pl-6 transition-all duration-500 group-hover:translate-x-2`}>
              <h2 className="text-4xl font-bold tracking-tighter mb-2">{sector.label}</h2>
              <p className="text-xs text-white/40 max-w-[200px] leading-tight">
                ACCESO A MÓDULOS DE PROFUNDIDAD TÉCNICA NIVEL {sector.id === 'political' ? 'V' : 'III'}.
              </p>
            </div>

            {/* Indicator Layer */}
            <div className="absolute bottom-10 left-10 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-1 h-4 bg-white/10 group-hover:bg-white/40 transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
              ))}
            </div>

            {/* Action Trigger */}
            <button className="mt-12 px-6 py-2 border border-white/20 text-xs hover:bg-white hover:text-black transition-all uppercase tracking-widest font-bold">
              Initialize_Sector
            </button>
          </section>
        ))}
      </main>

      {/* Terminal Footer */}
      <footer className="fixed bottom-0 w-full p-2 bg-black border-t border-white/5 flex justify-between text-[9px] text-white/30 uppercase tracking-widest">
        <span>Fractal_System_v51.6_Active</span>
        <span>Environment: Production</span>
        <span>Latency: 24ms</span>
      </footer>
    </div>
  );
};