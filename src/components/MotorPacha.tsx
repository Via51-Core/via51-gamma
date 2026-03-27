import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const MotorPacha = ({ tenantSlug }) => {
  const [nodo, setNodo] = useState(null);
  const [emergencia, setEmergencia] = useState({ activado: false, mensaje: "" });

  useEffect(() => {
    // 1. Cargar Contenido Normal
    const cargarContenido = async () => {
      const { data } = await supabase
        .from('nodos_alfa')
        .select('*, clientes!inner(*)')
        .eq('clientes.slug', tenantSlug)
        .eq('esta_activo', true)
        .limit(1)
        .single();
      if (data) setNodo(data);
    };

    // 2. Escuchar el Botón Rojo en tiempo real
    const checkEmergencia = async () => {
      const { data } = await supabase.from('control_emergencia').select('*').eq('id', 1).single();
      if (data?.activado) setEmergencia({ activado: true, mensaje: data.mensaje_global });
    };

    cargarContenido();
    checkEmergencia();

    const sub = supabase.channel('cambios-globales')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'control_emergencia' }, 
      payload => {
        setEmergencia({ activado: payload.new.activado, mensaje: payload.new.mensaje_global });
      })
      .subscribe();

    return () => supabase.removeChannel(sub);
  }, [tenantSlug]);

  if (emergencia.activado) {
    return (
      <div className="h-screen w-screen bg-red-700 flex items-center justify-center p-10 text-center animate-pulse">
        <h1 className="text-white text-5xl font-black uppercase italic">{emergencia.mensaje}</h1>
      </div>
    );
  }

  if (!nodo) return <div className="bg-black h-screen" />;

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-80">
        <source src={nodo.url_media} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-10 left-10 right-10 z-10">
        <h2 className="text-white text-6xl font-extrabold uppercase leading-none mb-4">{nodo.titulo_que}</h2>
        <p className="text-white/80 text-xl border-l-4 pl-4 italic" style={{ borderColor: '#3b82f6' }}>{nodo.descripcion_como}</p>
      </div>
    </div>
  );
};

export default MotorPacha;
