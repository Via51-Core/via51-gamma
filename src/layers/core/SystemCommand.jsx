import React, { useState, useEffect } from 'react';
import { dataClient } from '../../lib/supabaseClient';

const SystemCommand = () => {
  const [mode, setMode] = useState('STANDARD');
  const [loading, setLoading] = useState(false);
  
  // Estado para el Contenido de la Coyuntura (Alfa)
  const [coyuntura, setCoyuntura] = useState({
    title: '',
    description: '',
    media_url: ''
  });

  useEffect(() => {
    const getInitialData = async () => {
      const { data: config } = await dataClient.from('engine_config').select('*').single();
      const { data: content } = await dataClient.from('core_content')
        .select('*')
        .eq('pillar_type', 'critical')
        .single();
      
      if (config) setMode(config.operational_mode);
      if (content) setCoyuntura({ 
        title: content.title, 
        description: content.description, 
        media_url: content.media_url 
      });
    };
    getInitialData();
  }, []);

  const handleUpdateContent = async () => {
    setLoading(true);
    await dataClient
      .from('core_content')
      .update(coyuntura)
      .eq('pillar_type', 'critical');
    alert("CONTENIDO ACTUALIZADO EN EL NÚCLEO");
    setLoading(false);
  };

  const toggleMode = async () => {
    setLoading(true);
    const newMode = mode === 'STANDARD' ? 'CRITICAL' : 'STANDARD';
    await dataClient.from('engine_config').update({ operational_mode: newMode }).eq('system_name', 'Holding Root');
    setMode(newMode);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="border-b border-zinc-800 pb-6 mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">CENTRO DE MANDO GAMMA</h1>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Holding Digital Vía51</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-bold ${mode === 'CRITICAL' ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
            SISTEMA: {mode}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* COLUMNA 1: EL INTERRUPTOR MAESTRO */}
          <section className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h2 className="text-sm text-zinc-400 uppercase mb-6">1. Estado del Motor</h2>
            <button 
              onClick={toggleMode}
              className={`w-full py-12 rounded-xl text-2xl font-black mb-4 transition-all ${mode === 'STANDARD' ? 'bg-zinc-800 hover:bg-red-900 border-2 border-transparent' : 'bg-red-600 hover:bg-red-700 shadow-[0_0_50px_rgba(220,38,38,0.3)]'}`}
            >
              {mode === 'STANDARD' ? "🔓 ACTIVAR COYUNTURA" : "🔒 DESACTIVAR COYUNTURA"}
            </button>
            <p className="text-[10px] text-zinc-500 text-center italic">
              Precaución: Este botón altera la landing global via51.org en tiempo real.
            </p>
          </section>

          {/* COLUMNA 2: EDITOR DE CONTENIDO ALFA */}
          <section className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h2 className="text-sm text-zinc-400 uppercase mb-6">2. Contenido de Emergencia (Alfa)</h2>
            <div className="space-y-4">
              <input 
                className="w-full bg-black border border-zinc-700 p-4 rounded text-xl font-bold focus:border-red-500 outline-none"
                placeholder="TÍTULO DE LA ALERTA"
                value={coyuntura.title}
                onChange={(e) => setCoyuntura({...coyuntura, title: e.target.value})}
              />
              <textarea 
                className="w-full bg-black border border-zinc-700 p-4 rounded h-32 focus:border-red-500 outline-none"
                placeholder="DESCRIPCIÓN O MENSAJE"
                value={coyuntura.description}
                onChange={(e) => setCoyuntura({...coyuntura, description: e.target.value})}
              />
              <input 
                className="w-full bg-black border border-zinc-700 p-4 rounded text-sm focus:border-red-500 outline-none"
                placeholder="URL DE IMAGEN O VIDEO (Opcional)"
                value={coyuntura.media_url}
                onChange={(e) => setCoyuntura({...coyuntura, media_url: e.target.value})}
              />
              <button 
                onClick={handleUpdateContent}
                className="w-full bg-white text-black font-bold py-4 rounded hover:bg-zinc-200 uppercase text-xs"
              >
                Actualizar Datos de Alfa
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SystemCommand;