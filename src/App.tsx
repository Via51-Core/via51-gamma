// ==========================================
// PATH: src/App.tsx
// FUNCTION: Central Chassis (System Switcher)
// ==========================================
import React, { useState } from 'react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { NodeController } from './components/NodeController';
import { KernelMonitor } from './components/KernelMonitor';
import { InternalRegistryEngine } from './components/internal/InternalRegistryEngine';

const MainLayout: React.FC = () => {
  const { tenant, loading } = useTenant();
  const [currentNode, setCurrentNode] = useState('root');
  const [isInternalMode, setIsInternalMode] = useState(false);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center font-mono text-zinc-500 animate-pulse uppercase text-[10px] tracking-[0.3em]">Synching_System_Chassis...</div>;

  return (
    <div className="holding-main bg-black min-h-screen text-white selection:bg-blue-900">
      
      {/* 🔐 OPERATIONAL ACCESS SWITCH (INTERNAL ONLY) */}
      <div className="fixed top-6 right-6 z-[999]">
        <button 
          onClick={() => setIsInternalMode(!isInternalMode)}
          className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            isInternalMode ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-white hover:text-white'
          }`}
        >
          {isInternalMode ? 'CLOSE_INTERNAL_SESSION' : 'INTERNAL_ACCESS'}
        </button>
      </div>

      {isInternalMode ? (
        /* LAYER: INTERNAL (BACK-OFFICE) */
        <section className="internal-ops-layer h-screen flex items-center justify-center p-6 bg-zinc-950">
          <InternalRegistryEngine 
            engine_mode="INPUT" 
            on_action_complete={() => setIsInternalMode(false)}
            on_abort={() => setIsInternalMode(false)}
          />
        </section>
      ) : (
        /* LAYER: EXTERNAL (PAGE 0 TO N) */
        <section className="external-canvas-layer">
          <NodeController 
            nodeId={currentNode} 
            onNavigate={(id) => setCurrentNode(id)} 
          />
        </section>
      )}

      {/* GLOBAL SYSTEM TOOLS */}
      <KernelMonitor />
    </div>
  );
};

const App: React.FC = () => (
  <TenantProvider>
    <MainLayout />
  </TenantProvider>
);

export default App;