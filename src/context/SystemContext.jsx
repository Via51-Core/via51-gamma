// src/context/SystemContext.jsx
export const OPERATIONAL_MODES = {
  STANDARD: 'standard', // Los tres pilares
  CRITICAL: 'critical'  // Modo Coyuntura (mutación Alfa)
};

export const SystemProvider = ({ children }) => {
  const [config, setConfig] = useState({
    mode: OPERATIONAL_MODES.STANDARD,
    activeCoyunturaId: null,
    pillars: ['political', 'social', 'productive']
  });

  // Suscripción en tiempo real a Supabase para cambios de estado
  useEffect(() => {
    const channel = supabase
      .channel('system_state')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'engine_config' }, 
        payload => {
          setConfig(prev => ({ ...prev, ...payload.new }));
        })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <SystemContext.Provider value={{ config }}>
      {children}
    </SystemContext.Provider>
  );
};