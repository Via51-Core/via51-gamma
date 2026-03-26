import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSystemStream } from './layers/shared/hooks/useSystemStream';

// Componentes del Nuevo Ecosistema (Asegúrese de que los archivos existan)
import PillarOrchestrator from './layers/core/PillarOrchestrator';
import AlphaMutationView from './layers/alfa/AlphaMutationView';
import SystemCommand from './layers/core/SystemCommand';
import LoadingKernel from './layers/shared/components/LoadingKernel';

function App() {
  const { data, config, loading } = useSystemStream();

  // 1. Estado de Carga Profesional
  if (loading) return <LoadingKernel />;

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA MAESTRA (via51.org) */}
        <Route path="/" element={
          config?.is_critical_mode 
            ? <AlphaMutationView eventData={data?.critical_event} /> 
            : <PillarOrchestrator 
                political={data?.pillars?.political}
                social={data?.pillars?.social}
                productive={data?.pillars?.productive}
              />
        } />

        {/* RUTA DE MANDO (via51.org/command) - El Botón Rojo */}
        <Route path="/command" element={<SystemCommand />} />

        {/* Lógica de Legado (Opcional: por si aún usa subdominios) */}
        <Route path="/pol" element={<PillarOrchestrator type="political" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;