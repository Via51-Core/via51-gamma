import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-client';

const supabase = createClient('SU_URL', 'SU_KEY_ANON');

const MotorAlfa = ({ clienteSlug }) => {
  const [nodos, setNodos] = useState([]);
  const [indice, setIndice] = useState(0);
  const [clienteInfo, setClienteInfo] = useState(null);

  useEffect(() => {
    const cargarSaaS = async () => {
      // 1. Obtener ADN del Cliente
      const { data: cliente } = await supabase
        .from('clientes')
        .select('*')
        .eq('slug', clienteSlug)
        .single();
      
      if (cliente) {
        setClienteInfo(cliente);
        // 2. Cargar sus Nodos (Sus productos, propuestas o servicios)
        const { data: items } = await supabase
          .from('nodos_alfa')
          .select('*')
          .eq('cliente_id', cliente.id)
          .eq('esta_activo', true)
          .order('prioridad', { ascending: false });
        
        setNodos(items);
      }
    };
    cargarSaaS();
  }, [clienteSlug]);

  if (!clienteInfo || nodos.length === 0) return <div className="h-screen bg-black" />;

  const itemActual = nodos[indice];

  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Marco de Dispositivo Adaptativo */}
      <div className="relative aspect-[9/16] h-[92vh] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
           style={{ boxShadow: `0 0 40px ${clienteInfo.color_tema}33` }}>
        
        {/* MEDIA LAYER */}
        <div className="absolute inset-0 z-0">
          {itemActual.tipo_media === 'video' ? (
            <video key={itemActual.url_media} autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src={itemActual.url_media} type="video/mp4" />
            </video>
          ) : (
            <img src={itemActual.url_media} className="h-full w-full object-cover" alt="SaaS Content" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* TRADUCTOR DE CAMPOS DINÁMICO */}
        <div className="absolute bottom-0 w-full p-8 z-10">
          <p className="text-[10px] tracking-[0.4em] mb-2" style={{ color: clienteInfo.color_tema }}>
            {clienteInfo.nombre_comercial.toUpperCase()}
          </p>
          
          <h1 className="text-4xl font-black uppercase mb-4 leading-none">
            {itemActual.titulo_que}
          </h1>

          <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border-l-4" 
               style={{ borderColor: clienteInfo.color_tema }}>
            <p className="text-sm font-light opacity-90 mb-3">
              <span className="font-bold">EL CÓMO:</span> {itemActual.descripcion_como}
            </p>
            
            {/* RENDERIZADO DE METADATOS (La ensalada de variables) */}
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(itemActual.metadatos).map(([llave, valor]) => (
                <span key={llave} className="text-[9px] bg-white/10 px-2 py-1 rounded-md uppercase">
                  {llave}: {valor}
                </span>
              ))}
            </div>
          </div>
          
          {/* Navegación de Nodos (Scroll simulado) */}
          <div className="flex justify-between mt-6">
            <button onClick={() => setIndice(prev => Math.max(0, prev - 1))} className="text-[10px] opacity-40">ANTERIOR</button>
            <button onClick={() => setIndice(prev => Math.min(nodos.length - 1, prev + 1))} className="text-[10px] font-bold">SIGUIENTE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorAlfa;