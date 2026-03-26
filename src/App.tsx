import React from 'react';
// Importamos el hook con nombre neutro (deberás renombrar el archivo físico a useSystemStream.js más adelante)
import { useSystemStream } from './layers/shared/hooks/useSystemStream'; 
import PillarOrchestrator from './layers/core/PillarOrchestrator';
import AlphaMutationView from './layers/alfa/AlphaMutationView';

function App() {
  // El hook ahora devuelve el estado global del motor (config) y los datos
  const { data, loading, config } = useSystemStream();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-blue-500 font-bold tracking-[0.3em] animate-pulse text-xs uppercase">
          Gamma Engine: Sincronizando Núcleo...
        </div>
      </div>
    );
  }

  // LÓGICA DE CONMUTACIÓN DEL HOLDING
  // Si el motor detecta un evento crítico (Modo Coyuntura), Alfa toma el control total.
  if (config?.is_critical_mode) {
    return (
      <main className="mode-critical">
        <AlphaMutationView eventData={data?.critical_event} />
      </main>
    );
  }

  // MODO ESTÁNDAR: Visualización de los Tres Pilares del Desarrollo Nacional
  return (
    <main className="mode-standard">
      <PillarOrchestrator 
        political={data?.pillars?.political}
        social={data?.pillars?.social}
        productive={data?.pillars?.productive}
      />
    </main>
  );
}

export default App;