/**
 * FUNCIÓN: Enrutador de Nodos (Switcher Operativo)
 * LUGAR: /src/App.tsx
 * FECHA: 02-Abr-2026 | 18:10
 */

import React from 'react';
import PublicFeed from '../views/PublicFeed';
import CitizenEmitter from '../views/CitizenEmitter';
import AdminControl from '../views/AdminControl';

const App: React.FC = () => {
  // Detectamos el hostname para determinar el Nodo
  const hostname = window.location.hostname;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {hostname.includes('gamma') ? (
          <AdminControl /> // Nodo GAMMA (Control)
        ) : hostname.includes('hub') ? (
          <CitizenEmitter /> // Nodo BETA (Emisor)
        ) : (
          <PublicFeed />    // Nodo ALFA (Público)
        )}
      </div>
    </main>
  );
};

export default App;