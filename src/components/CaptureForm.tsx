/**
 * ARCHIVO: src/components/CaptureForm.tsx
 * DESCRIPCIÓN: Captura datos para proyectar en la red VÍA51.
 */
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const CaptureForm = () => {
  const [form, setForm] = useState({ name: '', dni: '', whatsapp: '' });
  const [status, setStatus] = useState('');

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ENVIANDO...');

    // Inserción en sys_events según esquema detectado
    const { error } = await supabase.from('sys_events').insert([{
      event_type: 'V51_PROJECTION',
      payload: { 
        full_name: form.name.toUpperCase(), 
        document: form.dni, 
        phone: form.whatsapp 
      }
    }]);

    if (!error) {
      setForm({ name: '', dni: '', whatsapp: '' });
      setStatus('DATOS PROYECTADOS');
      setTimeout(() => setStatus(''), 3000);
    } else {
      setStatus('ERROR DE CONEXIÓN');
    }
  };

  return (
    <div className="bg-zinc-950 p-8 border border-zinc-800 font-mono max-w-sm w-full">
      <h2 className="text-blue-500 text-[10px] tracking-[0.4em] mb-6 uppercase text-center">Lead_Capture_Node</h2>
      <form onSubmit={sendData} className="space-y-4">
        <input 
          placeholder="NOMBRE Y APELLIDO" 
          className="w-full bg-black border border-zinc-800 p-3 text-white text-xs outline-none focus:border-blue-500"
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
        <input 
          placeholder="DNI" 
          className="w-full bg-black border border-zinc-800 p-3 text-white text-xs outline-none focus:border-blue-500"
          value={form.dni} 
          onChange={e => setForm({...form, dni: e.target.value})} 
          required 
        />
        <input 
          placeholder="WHATSAPP" 
          className="w-full bg-black border border-zinc-800 p-3 text-white text-xs outline-none focus:border-blue-500"
          value={form.whatsapp} 
          onChange={e => setForm({...form, whatsapp: e.target.value})} 
          required 
        />
        <button className="w-full bg-blue-600 py-3 font-black text-[10px] uppercase hover:bg-blue-500 transition-all">
          {status || 'ACTIVAR PROYECCIÓN'}
        </button>
      </form>
    </div>
  );
};