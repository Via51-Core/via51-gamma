import React from 'react';
import { V51_Visor_Animado } from './layers/ui/V51_Visor_Animado';
import { CORE_CONFIG } from './layers/gamma/config';

function App() {
  const { electoral } = CORE_CONFIG;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Contenedor con Aspect Ratio Fijo */}
      <div className="relative w-full max-w-md aspect-[9/16] bg-zinc-900 shadow-2xl md:max-h-[92vh] overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-800">
        <V51_Visor_Animado
          slides={electoral.slides}
          frasePrincipal={electoral.fraseA}
          fraseSecundaria={electoral.fraseB}
        />
      </div>
    </main>
  );
}

export default App;