// src/App.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { TenantProvider, useTenant } from './context/TenantContext';
import { NodeController } from './components/NodeController';
import { KernelMonitor } from './components/KernelMonitor';
import { InternalRegistryEngine } from './components/internal/InternalRegistryEngine';

const MainLayout: React.FC = () => {
  const { tenant, loading: tenantLoading } = useTenant();
  const [currentNode, setCurrentNode] = useState('root');
  const [isInternalMode, setIsInternalMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Agnosticismo: La configuración viene del JSON de la DB, no del Hostname manual
  const config = tenant?.configuracion_json || {};
  const isHolding = config.type === 'HOLDING';
  const brandName = config.brand_name || 'VÍA51';
  const customContent = config.hero_title || '';

  useEffect(() => {
    const recordTelemetry = async () => {
      if (!tenant?.id) return;

      const { error } = await supabase
        .from('sys_events')
        .insert([{ 
          event_type: 'PAGE_LOAD', 
          path: window.location.pathname,
          tenant_id: tenant.id,
          metadata: { 
            agent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        }]);
      
      if (error) console.error("Telemetry_Pulse_Fail:", error.message);
    };

    if (!tenantLoading) recordTelemetry();
  }, [tenant?.id, tenantLoading]);

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
      const email = prompt("EMAIL:");
      const password = prompt("PASSWORD:");
      if (!email || !password) return;
      await supabase.auth.signInWithPassword({ email, password });
      return;
    }
    setIsInternalMode(true);
  };

  if (tenantLoading || isCheckingAuth) {
    return <div className="h-screen bg-black flex items-center justify-center font-mono text-zinc-500 animate-pulse text-[10px]">Synching_System_Chassis...</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white font-mono">
      <div className="fixed top-6 right-6 z-[999] flex items-center gap-4">
        {user && <span className="text-[10px] text-blue-400 font-bold uppercase">{user.email}</span>}
        <button onClick={toggleInternalAccess} className={`border px-4 py-2 text-[10px] font-bold uppercase transition-all ${isInternalMode ? 'bg-white text-black' : 'text-zinc-600 border-zinc-800 hover:text-white'}`}>
          {isInternalMode ? 'CLOSE_INTERNAL' : 'INTERNAL_ACCESS'}
        </button>
      </div>

      {isInternalMode ? (
        <section className="h-screen p-6 bg-zinc-950">
          <InternalRegistryEngine on_action_complete={() => setIsInternalMode(false)} />
        </section>
      ) : (
        <section className="h-screen flex flex-col items-center justify-center">
          {/* Lógica de renderizado basada en capacidades/configuración, no en nombres de dominio */}
          {isHolding ? (
            <NodeController nodeId={currentNode} onNavigate={setCurrentNode} />
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tighter uppercase">{customContent || brandName}</h1>
              {!customContent && <span className="opacity-50 text-[10px]">SYSTEM_GENERIC_NODE</span>}
            </div>
          )}
        </section>
      )}
      <KernelMonitor />
    </div>
  );
};

const App: React.FC = () => (<TenantProvider><MainLayout /></TenantProvider>);
export default App;