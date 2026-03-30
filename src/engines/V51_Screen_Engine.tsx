/**
 * RUTA: src/engines/V51_Screen_Engine.tsx
 * NOMBRE: V51_Screen_Engine
 * DESCRIPCIÓN: Motor de renderizado OLED V51 con Chasis de Hardware Virtual.
 * Sincronizado con Supabase y optimizado para Tailwind CSS v4.
 */

import React, { Suspense, lazy } from 'react';
import { useV51Registry } from '../hooks/useV51Registry';
import { Loader2, ShieldAlert, Wifi, Battery, Signal } from 'lucide-react';

const V51_Screen_Engine: React.FC = () => {
  const { nodeData, loading, error } = useV51Registry();

  // 1. Pantalla de Carga (Bootloader)
  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  // 2. Pantalla de Error Crítico
  if (error || !nodeData) return (
    <div className="h-screen bg-[#0a0a0b] flex flex-col items-center justify-center font-mono p-8 text-center">
      <ShieldAlert className="text-red-600 mb-4" size={56} />
      <h1 className="text-white text-lg tracking-tighter uppercase">Registry_Failure</h1>
      <span className="text-red-500 text-[10px] mt-2 block opacity-80">{error || "NODE_DATA_MISSING"}</span>
    </div>
  );

  // 3. Importación Dinámica del Nodo (Contenido de Supabase)
  const NodeContent = lazy(() => import(`../components/nodes/${nodeData.node_path}.tsx`));

  return (
    <div className="fixed inset-0 bg-[#020203] flex items-center justify-center p-4 overflow-hidden antialiased">
      
      {/* --- CHASIS FÍSICO DEL CELULAR (HARDWARE) --- */}
      <div className="relative w-[390px] h-[844px] bg-[#121214] rounded-[60px] p-[11px] shadow-[0_0_100px_rgba(0,0,0,0.9)] border-[4px] border-[#2a2a2e] flex flex-col transition-all duration-500">
        
        {/* Botones Físicos Laterales (Estéticos) */}
        <div className="absolute -left-[4px] top-32 w-[4px] h-14 bg-[#2a2a2e] rounded-l-lg border-l border-white/5" />
        <div className="absolute -left-[4px] top-52 w-[4px] h-20 bg-[#2a2a2e] rounded-l-lg border-l border-white/5" />
        <div className="absolute -right-[4px] top-40 w-[4px] h-24 bg-[#2a2a2e] rounded-r-lg border-r border-white/5" />

        {/* --- PANTALLA INTERNA (BORDE OLED) --- */}
        <div className="w-full h-full bg-black rounded-[50px] overflow-hidden relative border border-white/10 flex flex-col shadow-inner">
          
          {/* Status Bar Superior */}
          <div className="h-12 w-full flex justify-between items-end px-10 pb-2 z-50">
            <span className="text-white text-[13px] font-bold tracking-tight">9:41</span>
            <div className="flex gap-1.5 items-center">
              <Signal size={13} className="text-white opacity-90" />
              <Wifi size={13} className="text-white opacity-90" />
              <Battery size={16} className="text-white opacity-90" />
            </div>
          </div>

          {/* Dynamic Island (Notch) */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-[20px] z-[100] border border-white/5 flex items-center justify-center">
            {/* Cámara Frontal / Sensor */}
            <div className="absolute right-4 w-2 h-2 bg-[#1a1a1a] rounded-full" />
          </div>
          
          {/* --- ÁREA DE RENDERIZADO DEL NODO --- */}
          {/* pt-10 para que el Notch no tape el título del Dashboard */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative px-6 pt-10 pb-4">
            <Suspense fallback={
              <div className="h-full flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-zinc-700" size={32} />
              </div>
            }>
              <div className="min-h-full">
                {/* Aquí aterriza ArdDashboard con sus tablas */}
                <NodeContent config={nodeData.theme_config} />
              </div>
            </Suspense>
          </div>

          {/* Home Bar (Indicador inferior) */}
          <div className="h-8 w-full flex justify-center items-center">
            <div className="w-32 h-[5px] bg-white/20 rounded-full" />
          </div>

        </div>
      </div>
      {/* --- FIN DEL CHASIS --- */}

    </div>
  );
};

export default V51_Screen_Engine;
