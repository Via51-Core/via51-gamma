"use client";
import React, { useState, useEffect } from 'react';
// Supongo que ya tienes supabaseClient configurado en src/lib/supabaseClient.js
import { supabase } from '../lib/supabaseClient'; 

export default function Pacha() {
  const [data, setData] = useState({ titulo_que: '', descripcion_como: '' });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  // 1. Cargar datos actuales de Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: polData, error } = await supabase
        .from('nodos')
        .select('*')
        .eq('slug', 'pol')
        .single();

      if (error) {
        console.error('Error cargando Supabase:', error);
        setStatus('⚠️ Error de conexión con la base de datos.');
      } else {
        setData(polData);
        setStatus('✅ Datos cargados de Supabase.');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // 2. Guardar cambios en Supabase
  const handleGuardar = async () => {
    setStatus('⏳ Guardando cambios...');
    const { error } = await supabase
      .from('nodos')
      .update({
        titulo_que: data.titulo_que,
        descripcion_como: data.descripcion_como
      })
      .eq('slug', 'pol');

    if (error) {
      console.error('Error al guardar:', error);
      setStatus('⚠️ Error al guardar los datos.');
    } else {
      setStatus('🚀 ¡Cambios publicados en pol.via51.org!');
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setStatus(''), 3000);
    }
  };

  if (loading) return <div style={{padding: '50px', color: 'white', backgroundColor: 'black'}}>Cargando Panel Pacha...</div>;

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#0a0a0a', color:'white', fontFamily:'sans-serif', padding:'40px'}}>
      <header style={{borderBottom:'1px solid #333', paddingBottom:'20px', marginBottom:'40px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{fontSize:'24px', fontWeight:'900', textTransform:'uppercase', color:'#eab308'}}>PACHA // Panel de Control</h1>
        <span style={{fontSize:'12px', color:'#9ca3af'}}>{status}</span>
      </header>

      <main style={{maxWidth:'800px', margin:'0 auto'}}>
        <div style={{backgroundColor:'#1a1a1a', border:'1px solid #333', borderRadius:'20px', padding:'40px'}}>
          
          {/* Título (El QUÉ) */}
          <div style={{marginBottom:'30px'}}>
            <label style={{display:'block', fontSize:'12px', textTransform:'uppercase', color:'#eab308', marginBottom:'10px', fontWeight:'900', letterSpacing:'2px'}}>El Qué (Título)</label>
            <input 
              type="text"
              value={data.titulo_que}
              onChange={(e) => setData({...data, titulo_que: e.target.value})}
              style={{width:'100%', padding:'15px', backgroundColor:'#222', border:'1px solid #444', color:'white', fontSize:'18px', borderRadius:'10px'}}
              placeholder="Ej: MESÍAS GUEVARA"
            />
          </div>

          {/* Descripción (El CÓMO) */}
          <div style={{marginBottom:'40px'}}>
            <label style={{display:'block', fontSize:'12px', textTransform:'uppercase', color:'#eab308', marginBottom:'10px', fontWeight:'900', letterSpacing:'2px'}}>El Cómo (Descripción)</label>
            <textarea 
              value={data.descripcion_como}
              onChange={(e) => setData({...data, descripcion_como: e.target.value})}
              style={{width:'100%', padding:'15px', backgroundColor:'#222', border:'1px solid #444', color:'white', fontSize:'16px', borderRadius:'10px', minHeight:'150px', resize:'vertical'}}
              placeholder="Ej: Liderazgo técnico y político..."
            />
          </div>

          {/* Botón Guardar */}
          <button 
            onClick={handleGuardar}
            style={{width:'100%', padding:'20px', backgroundColor:'#eab308', color:'black', border:'none', borderRadius:'10px', fontSize:'16px', fontWeight:'900', textTransform:'uppercase', cursor:'pointer'}}
          >
            Publicar Cambios
          </button>
        </div>
      </main>
    </div>
  );
}