// src/engines/V51_Engine_Demo.tsx

import React, { useState, useEffect, Suspense } from 'react';
import { Play, Square, Loader2, Target, Zap, Globe, ShieldCheck } from 'lucide-react';

/**
 * @interface I_V51_Mock_Config
 * Definición de parámetros estéticos normalizados para el demo.
 */
interface I_V51_Mock_Config {
  id: string;
  tenantName: string;
  chassis: 'MOBILE' | 'DESKTOP' | 'NONE';
  theme: {
    bg: string;
    card: string;
    text: string;
    accent: string;
  };
  icon: React.ReactNode;
}

// Mock Data: Variaciones estéticas agradables del ecosistema VÍA51
const MOCK_REGISTRY: I_V51_Mock_Config[] = [
  {
    id: 'ard_v51',
    tenantName: 'ARD_HOLDING (Gestión)',
    chassis: 'MOBILE',
    theme: { bg: '#0d1117', card: '#161b22', text: '#c9d1d9', accent: '#58a6ff' },
    icon: <Target className="text-[#58a6ff]" size={24} />
  },
  {
    id: 'pol_v51',
    tenantName: 'POL_CAMPAIGN (Mesías Guevara)',
    chassis: 'NONE', // Full Screen
    theme: { bg: '#1a1d21', card: '#252a30', text: '#e1e4e8', accent: '#f8a619' },
    icon: <Zap className="text-[#f8a619]" size={24} />
  },
  {
    id: 'fj_v51',
    tenantName: 'FJ_REAL_ESTATE (Sector Inmobiliario)',
    chassis: 'DESKTOP', // Tablet/Desktop View
    theme: { bg: '#f6f8fa', card: '#ffffff', text: '#24292e', accent: '#2ea44f' },
    icon: <Globe className="text-[#2ea44f]" size={24} />
  }
];

/**
 * ENGINE: V51_ENGINE_DEMO
 * RESPONSABILIDAD: Demostrar variaciones paramétricas del motor en Full Screen.
 */
const V51_Engine_Demo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentConfig = MOCK_REGISTRY[currentIndex];
  const ROOT_OWNER = '9157ae13-36ac-4259-9680-1d9bd2cada4a';

  // Lógica de ciclo automático del motor
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIsLoading(true);
      // Simulación de latencia de red/carga de componente (1s)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_REGISTRY.length);
        setIsLoading(false);
      }, 1000);
    }, 4000); // Ciclo total de 4s (3s visualización + 1s carga)

    return () => clearInterval(interval);
  }, [isRunning]);

  /**
   * COMPONENTE: Node_Content_Agnostic
   * Simulación del contenido de un nodo que se adapta al tema inyectado.
   */
  const Node_Content_Agnostic = () => (
    <div className="flex flex-col h-full p-8" style={{ color: currentConfig.theme.text }}>
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          {currentConfig.icon}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: currentConfig.theme.accent }}>
              v51_agnostic_node
            </p>
            <h1 className="text-xl font-black tracking-tighter text-white">{currentConfig.tenantName}</h1>
          </div>
        </div>
        <ShieldCheck className="text-emerald-500" size={20} />
      </header>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="p-6 rounded-3xl border border-white/5 shadow-inner" style={{ backgroundColor: currentConfig.theme.card }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-2">Parámetro: Chassis</p>
          <code className="text-xs font-mono p-2 bg-black/30 rounded-lg block">{currentConfig.chassis}</code>
        </div>
        <div className="p-6 rounded-3xl border border-white/5 shadow-inner" style={{ backgroundColor: currentConfig.theme.card }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-2">Parámetro: Accent_Color</p>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: currentConfig.theme.accent }} />
            <code className="text-xs font-mono">{currentConfig.theme.accent}</code>
          </div>
        </div>
        <div className="p-6 rounded-3xl border border-white/5 shadow-inner col-span-2" style={{ backgroundColor: currentConfig.theme.card }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-2">Estado del Motor</p>
          <div className="flex items-center gap-2">
            {isRunning ? (
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-red-500" />
            )}
            <span className="text-sm font-mono">{isRunning ? 'MOTOR_RUNNING_AUTO_CYCLE' : 'MOTOR_STOPPED_MANUAL_CONTROL'}</span>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center opacity-30">
        <p className="text-[8px] font-mono tracking-[0.5em]">ROOT_MATCH: {ROOT_OWNER.split('-')[0]}</p>
      </footer>
    </div>
  );

  /**
   * COMPONENTE: V51_Chassis_Orchestrator
   * Aplica el envoltorio de hardware dinámicamente.
   */
  const V51_Chassis_Orchestrator = () => {
    const mobileStyle = "relative w-[375px] h-[780px] bg-[#050505] rounded-[60px] p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border-[3px] border-[#333] ring-1 ring-white/10 overflow-hidden";
    const desktopStyle = "w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl";
    const fullScreenStyle = "w-full h-screen";

    const getChassisClass = () => {
      if (currentConfig.chassis === 'MOBILE') return mobileStyle;
      if (currentConfig.chassis === 'DESKTOP') return desktopStyle;
      return fullScreenStyle;
    };

    return (
      <div className={`transition-all duration-700 ease-in-out ${getChassisClass()}`} style={{ backgroundColor: currentConfig.theme.bg }}>
        {currentConfig.chassis === 'MOBILE' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-3xl z-50 border border-white/5" />
        )}
        <Node_Content_Agnostic />
      </div>
    );
  };

  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center p-6 overflow-hidden select-none">
      
      {/* CAPA DE CONTROL DEL DEMO */}
      <div className="fixed top-6 right-6 z-[100] flex gap-3 bg-[#1a1c22] border border-white/10 p-3 rounded-3xl shadow-2xl">
        <button 
          onClick={() => setIsRunning(true)} 
          disabled={isRunning || isLoading}
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/40"
        >
          <Play size={16} /> Inicio
        </button>
        <button 
          onClick={() => setIsRunning(false)} 
          disabled={!isRunning || isLoading}
          className="flex items-center gap-2.5 bg-red-700 hover:bg-red-600 disabled:bg-slate-700 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/40"
        >
          <Square size={16} /> Parada
        </button>
      </div>

      {/* RENDERIZADO DEL VIEWPORT DEL MOTOR */}
      <Suspense fallback={<Loader2 className="animate-spin text-blue-500" size={32} />}>
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 text-blue-400 font-mono text-sm uppercase tracking-widest">
            <Loader2 className="animate-spin" size={24} />
            SYNC_IN_PROGRESS
          </div>
        ) : (
          <V51_Chassis_Orchestrator />
        )}
      </Suspense>

      {/* Identificador de Estándar */}
      <div className="fixed bottom-4 right-6 text-[8px] font-mono text-slate-800 uppercase tracking-[0.5em] pointer-events-none">
        ENGINE_MODE: PARAMETRIC_DEMO | v51_compliant
      </div>
    </main>
  );
};

export default V51_Engine_Demo;