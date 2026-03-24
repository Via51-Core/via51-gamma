import React, { useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';

export default function PaginaComando() {
  const [mensaje, setMensaje] = useState("");
  const [activado, setActivado] = useState(false);

  const enviarAlerta = async (status) => {
    const { error } = await supabase
      .from('control_emergencia')
      .update({ 
        activado: status, 
        mensaje_global: mensaje.toUpperCase(),
        actualizado_at: new Date() 
      })
      .eq('id', 1);

    if (!error) {
      setActivado(status);
      alert(status ? "¡BOTÓN ROJO ACTIVADO!" : "SISTEMA NORMALIZADO");
    }
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', color: '#fff', padding: '30px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'red', fontSize: '10px', letterSpacing: '4px', textAlign: 'center' }}>PACHA MANDO CENTRAL</h1>
      <div style={{ marginTop: '40px' }}>
        <textarea 
          onChange={(e) => setMensaje(e.target.value)}
          style={{ width: '100%', height: '120px', backgroundColor: '#111', border: '1px solid #444', color: '#0f0', padding: '15px', fontSize: '18px', borderRadius: '8px' }}
          placeholder="ESCRIBA MENSAJE DE IMPACTO..."
        />
        <button 
          onClick={() => enviarAlerta(true)}
          style={{ width: '100%', marginTop: '25px', padding: '30px', backgroundColor: '#b91c1c', color: 'white', fontWeight: '900', border: 'none', borderRadius: '15px', fontSize: '20px', boxShadow: '0 0 20px rgba(185,28,28,0.4)' }}>
          LANZAR ALERTA GLOBAL
        </button>
        <button 
          onClick={() => enviarAlerta(false)}
          style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#222', color: '#888', border: 'none', borderRadius: '10px', fontSize: '12px' }}>
          APAGAR ALERTA / NORMALIZAR
        </button>
      </div>
    </div>
  );
}