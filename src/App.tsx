import React from 'react';
import { V51_Visor_Animado } from './layers/ui/V51_Visor_Animado';
import { CORE_CONFIG } from './layers/gamma/config';

function App() {
  const { electoral } = CORE_CONFIG;

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden p-4">
      {/* Contenedor Soberano 9:16 */}
      <div className="relative w-full max-w-md aspect-[9/16] bg-black shadow-[0_0_100px_rgba(0,71,171,0.2)] overflow-hidden md:max-h-[90vh] rounded-[3rem] border-[12px] border-zinc-900">

        <V51_Visor_Animado
          slides={electoral.slides}
          frasePrincipal={electoral.frasePrincipal}
          fraseSecundaria={electoral.fraseSecundaria}
          posicion={electoral.posicion}
        />

        {/* Branding Sutil del Nodo */}
        <div className="absolute top-8 left-0 w-full flex justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">
            {CORE_CONFIG.metadata.title}
          </span>
        </div>
      </div>
    </main>
  );
}

export default App;