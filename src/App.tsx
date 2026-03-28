// src/App.tsx
import React, { useState } from 'react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { NodeController } from './components/NodeController';
import { KernelMonitor } from './components/KernelMonitor'; // El estetoscopio del sistema

const MainLayout: React.FC = () => {
  const { tenant, loading, error } = useTenant();
  // Iniciamos en el nodo 'root' por estándar de arquitectura
  const [currentNode, setCurrentNode] = useState('root');

  // 1. Estado de Sincronización (Agnóstico)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white font-mono">
        <div className="animate-pulse">SYNCHRONIZING_CORE_SYSTEM...</div>
      </div>
    );
  }

  // 2. Estado de Error de Registro
  if (error || !tenant) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-950 text-red-200 p-8 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">CRITICAL_SYSTEM_ERROR</h2>
          <p className="opacity-70 text-sm">Registro de identidad no detectado en sys.registry.</p>
          <p className="mt-4 text-xs font-mono">Verifique SLUG en .env y conexión Supabase.</p>
        </div>
      </div>
    );
  }

  // 3. Renderizado del Motor (Agnosticismo Total)
  return (
    <div className="holding-container min-h-screen">
      {/* El controlador ahora recibe las órdenes del tenant dinámico */}
      <NodeController 
        nodeId={currentNode} 
        onNavigate={(id) => setCurrentNode(id)} 
      />

      {/* 🛰️ El Monitor de Salud (Solo visible en desarrollo o por arquitectura) */}
      <KernelMonitor />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TenantProvider>
      <MainLayout />
    </TenantProvider>
  );
};

export default App;