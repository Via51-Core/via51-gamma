// ==========================================
// PATH: src/App.tsx
// FUNCTION: Central Chassis (System Switcher)
// SECURITY: Root Auth via Direct Email (Emergency Access)
// ==========================================
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

  // 1. Sincronización de sesión activa
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

  // 2. Función de Acceso Seguro (Lógica de Registro Directo)
  const toggleInternalAccess = async () => {
    if (isInternalMode) {
      setIsInternalMode(false);
      return;
    }

    // Si no hay usuario, realizamos el registro forzado para obtener el UID
    if (!user) {
      const email = prompt("INGRESE EMAIL PARA REGISTRO RAÍZ:");
      const password = prompt("DEFINA CONTRASEÑA TEMPORAL (mín. 6 caracteres):");

      if (!email || !password) return;

      // Intentamos registro (SignUp)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // Si el usuario ya existe, intentamos Login normal
        const { data: logData, error: logError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (logError) {
          alert("AUTH_ERROR: " + logError.message);
          return;
        }
        
        if (logData.user) {
          alert("ACCESO_CONFIRMADO. UID: " + logData.user.id);
        }
      } else if (data.user) {
        alert("IDENTIDAD_CREADA. COPIE ESTE UID PARA EL SELLADO: " + data.user.id);
      }
      return;
    }

    // Si ya hay sesión, entramos al motor interno
    setIsInternalMode(true);
  };

  if (tenantLoading || isCheckingAuth) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-zinc-500 animate-pulse uppercase text-[10px] tracking-[0.3em]">
        Synching_System_Chassis...
      </div>
    );
  }

  return (
    <div className="holding-main bg-black min-h-screen text-white selection:bg-blue-900 font-mono">
      
      {/* 🔐 OPERATIONAL ACCESS SWITCH */}
      <div className="fixed top-6 right-6 z-[999] flex items-center gap-4">
        {user && (
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest leading-none mb-1">
              Active_Identity
            </span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
              {user.email}
            </span>
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
        /* LAYER: INTERNAL (BACK-OFFICE) */
        <section className="internal-ops-layer h-screen flex items-center justify-center p-6 bg-zinc-950">
          <InternalRegistryEngine 
            on_action_complete={() => setIsInternalMode(false)}
          />
        </section>
      ) : (
        /* LAYER: EXTERNAL (CANVAS) */
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