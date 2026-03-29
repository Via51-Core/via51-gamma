// src/App.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { TenantProvider, useTenant } from './context/TenantContext';
import { NodeController } from './components/NodeController';
import { KernelMonitor } from './components/KernelMonitor';
import { InternalRegistryEngine } from './components/internal/InternalRegistryEngine';

const MainLayout: React.FC = () => {
  const { loading: tenantLoading } = useTenant();
  const [currentNode, setCurrentNode] = useState('root');
  const [isInternalMode, setIsInternalMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // --- 🛰️ DETECTOR DE SUBDOMINIO (EL PAÑUELO) ---
  const host = window.location.hostname;
  
  // Definimos quién tiene derecho a ver el Holding
  const isHoldingAccess = 
    host === 'ard.via51.org' || 
    host === 'localhost' || 
    host === '127.0.0.1';

  const isPolitica = host === 'pol.via51.org';
  const isInmobiliaria = host === 'fj.via51.org';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleInternalAccess = async () => {
    if (isInternalMode) { setIsInternalMode(false); return; }
    if (!user) {
      const email = prompt("INGRESE EMAIL PARA REGISTRO RAÍZ:");
      const password = prompt("DEFINA CONTRASEÑA TEMPORAL:");
      if (!email || !password) return;
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        const { data: logData, error: logError } = await supabase.auth.signInWithPassword({ email, password });
        if (logError) { alert("AUTH_ERROR: " + logError.message); return; }
        if (logData.user) alert("ACCESO_CONFIRMADO. UID: " + logData.user.id);
      } else if (data.user) {
        alert("IDENTIDAD_CREADA. UID: " + data.user.id);
      }
      return;
    }
    setIsInternalMode(true);
  };

  if (tenantLoading || isCheckingAuth) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-zinc-500 animate-pulse uppercase text-[10px] tracking-[0.3em]">
        Synching_System_Chassis...
      </div>
    );
  }

  // --- 🛡️ RENDERIZADO SEGREGADO ---

  // CASO A: EL HOLDING (ard o localhost)
  if (isHoldingAccess) {
    return (
      <div className="holding-main bg-black min-h-screen text-white selection:bg-blue-900 font-mono">
        <div className="fixed top-6 right-6 z-[999] flex items-center gap-4">
          {user && (
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1">Active_Identity</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{user.email}</span>
            </div>
          )}
          <button 
            onClick={toggleInternalAccess}
            className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
              isInternalMode ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-white hover:text-white'
            }`}
          >
            {isInternalMode ? 'CLOSE_INTERNAL_SESSION' : 'INTERNAL_ACCESS'}
          </button>
        </div>

        {isInternalMode ? (
          <section className="h-screen flex items-center justify-center p-6 bg-zinc-950">
            <InternalRegistryEngine on_action_complete={() => setIsInternalMode(false)} />
          </section>
        ) : (
          <section className="external-canvas-layer">
            <NodeController nodeId={currentNode} onNavigate={(id) => setCurrentNode(id)} />
          </section>
        )}
        <KernelMonitor />
      </div>
    );
  }

  // CASO B: CAMPAÑA POLÍTICA
  if (isPolitica) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-10">
        <h1 className="text-4xl font-bold mb-4">MESÍAS GUEVARA</h1>
        <p className="text-zinc-400 italic">Campaña Presidencial - Ecosistema VÍA51</p>
      </div>
    );
  }

  // CASO C: INMOBILIARIA
  if (isInmobiliaria) {
    return (
      <div className="h-screen bg-zinc-100 flex items-center justify-center text-zinc-900">
        <h1 className="text-2xl font-light tracking-tighter uppercase">Inmobiliaria FJ | VÍA51</h1>
      </div>
    );
  }

  // DEFAULT: PORTAL CENTRAL (via51.org)
  return (
    <div className="h-screen bg-zinc-900 flex items-center justify-center text-white">
      <h1 className="tracking-[1em] uppercase text-xs opacity-50 text-center">VÍA51 <br/> Digital Holding</h1>
    </div>
  );
};

const App: React.FC = () => (
  <TenantProvider>
    <MainLayout />
  </TenantProvider>
);

export default App;