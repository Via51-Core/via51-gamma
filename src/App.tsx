// Path: C:/via51_ecosistema/via51-nodo-central/src/App.tsx
// Name: V51_Alpha_Main_Entry
// Identity: Comas, Lima, Peru | 2026-03-31 19:30:10

import React from "react";
import { useVia51Orchestrator } from "./hooks/useVia51Orchestrator";
import { DataProjector } from "./components/DataProjector";

function App() {
  const { node, loading } = useVia51Orchestrator();

  if (loading) return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <span className="text-blue-500 font-mono animate-pulse">INIT_V51_SEQUENCE...</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
      {/* HUD de Información del Nodo */}
      <div className="fixed top-4 right-4 z-50 bg-black/50 border border-white/10 p-2 rounded text-[10px] font-mono">
        NODE: <span className="text-green-400">{node}</span> | V51.6
      </div>

      {/* Proyector de Departamentos Fractal */}
      <div className="container mx-auto py-12">
        <h1 className="text-5xl font-black mb-8 tracking-tighter italic">
          VÍA51 // <span className="text-blue-500">ECOSYSTEM</span>
        </h1>
        
        {/* Forzamos SOCIAL para validar que SocialDept.tsx cargue correctamente */}
        <DataProjector activeNode="SOCIAL" />
      </div>
    </main>
  );
}

export default App;