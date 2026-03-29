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

  const host = window.location.hostname;
  const isHoldingAccess = host === 'ard.via51.org' || host === 'localhost' || host === '127.0.0.1';
  const isPolitica = host === 'pol.via51.org';
  const isInmobiliaria = host === 'fj.via51.org';

  useEffect(() => {
    const recordTelemetry = async () => {
      if (!tenant?.id) return;

      const { error } = await supabase
        .from('sys_events') 
        .insert([
          { 
            event_type: 'PAGE_LOAD', 
            path: window.location.pathname,
            tenant_id: tenant.id,
            metadata: { 
              agent: navigator.userAgent,
              host: host,
              timestamp: new Date().toISOString()
            }
          }
        ]);
      
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

  if (tenantLoading || isCheckingAuth) return <div className="h-screen bg-black flex items-center justify-center font-mono text-zinc-500 animate-pulse text-[10px]">Synching_System_Chassis...</div>;

  return (
    <div className="bg-black min-h-screen text-white font-mono">
      <div className="fixed top-6 right-6 z-[999] flex items-center gap-4">
        {user && <span className="text-[10px] text-blue-400 font-bold uppercase">{user.email}</span>}
        <button onClick={toggleInternalAccess} className={`border px-4 py-2 text-[10px] font-bold uppercase transition-all ${isInternalMode ? 'bg-white text-black' : 'text-zinc-600 border-zinc-800 hover:text-white'}`}>
          {isInternalMode ? 'CLOSE_INTERNAL' : 'INTERNAL_ACCESS'}
        </button>
      </div>
      {isInternalMode ? (
        <section className="h-screen p-6 bg-zinc-950"><InternalRegistryEngine on_action_complete={() => setIsInternalMode(false)} /></section>
      ) : (
        <section>
          {isHoldingAccess && <NodeController nodeId={currentNode} onNavigate={setCurrentNode} />}
          {isPolitica && <div className="h-screen flex flex-col items-center justify-center"><h1>MESÍAS GUEVARA</h1></div>}
          {isInmobiliaria && <div className="h-screen flex items-center justify-center"><h1>INMOBILIARIA FJ</h1></div>}
          {!isHoldingAccess && !isPolitica && !isInmobiliaria && <div className="h-screen flex items-center justify-center uppercase text-xs opacity-50">VÍA51</div>}
        </section>
      )}
      <KernelMonitor />
    </div>
  );
};

const App: React.FC = () => (<TenantProvider><MainLayout /></TenantProvider>);
export default App;