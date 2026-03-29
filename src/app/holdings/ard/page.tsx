// src/app/holdings/ard/page.tsx
import React from 'react';

export default function ARDLanding() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent -z-10" />
      
      <main className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-mono mb-4">
            SISTEMA CENTRAL VÍA51
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            Holding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Administrativo</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Gestión de activos inmobiliarios, políticos y operativos desde un nodo centralizado.
          </p>
        </header>

        {/* Grid de Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard title="Operaciones" status="Online" value="3 Nodos" />
          <StatusCard title="Seguridad" status="Active" value="RLS Protegido" />
          <StatusCard title="Audit" status="Sync" value="sys_events OK" />
        </div>

        {/* Botón de Acción Principal */}
        <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Panel de Control General</h3>
            <p className="text-sm text-slate-500">Acceso exclusivo para el Root Owner (9157ae13...)</p>
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-blue-400 transition-colors">
            Ingresar
          </button>
        </div>
      </main>
    </div>
  );
}

function StatusCard({ title, status, value }: { title: string, status: string, value: string }) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{title}</span>
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-600 mt-1">{status}</div>
    </div>
  );
}