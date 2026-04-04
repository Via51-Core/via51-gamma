/* Ruta: src/components/PanelBeta
   Nombre: PanelBeta
   Descripción: Interfaz de procesamiento y carga de datos (BETA).
*/

import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import './PanelBeta.css';

const PanelBeta = ({ destino }) => {
  const [datos, setDatos] = useState({ titulo_que: '', descripcion_como: '' });
  const [estadoSinc, setEstadoSinc] = useState('');

  useEffect(() => {
    // Carga inicial del registro ALFA correspondiente al eje
    const cargarDatos = async () => {
      const { data } = await supabase
        .from('nodos')
        .select('*')
        .eq('slug', destino === 'politico' ? 'pol' : 'raiz')
        .single();
      if (data) setDatos(data);
    };
    cargarDatos();
  }, [destino]);

  const enviarProcesamiento = async (e) => {
    e.preventDefault();
    setEstadoSinc('Procesando en Beta...');
    
    const { error } = await supabase
      .from('nodos')
      .upsert({ 
        slug: 'pol', 
        titulo_que: datos.titulo_que, 
        descripcion_como: datos.descripcion_como 
      }, { onConflict: 'slug' });

    setEstadoSinc(error ? 'Error en Gamma' : '✅ Sincronizado con Alfa');
  };

  return (
    <div className="contenedor-beta">
      <form className="formulario-procesamiento" onSubmit={enviarProcesamiento}>
        <header>
          <h2>BETA: PROCESAMIENTO {destino.toUpperCase()}</h2>
          <p>Sosteniendo el pilar del desarrollo nacional</p>
        </header>
        
        <input 
          value={datos.titulo_que} 
          onChange={(e) => setDatos({...datos, titulo_que: e.target.value})}
          placeholder="Razón de ser y propósito (Política)"
        />
        
        <textarea 
          value={datos.descripcion_como} 
          onChange={(e) => setDatos({...datos, descripcion_como: e.target.value})}
          placeholder="Interrelaciones y transformaciones (Social/Productivo)"
        />

        <button type="submit">ACTUALIZAR PANTALLA ALFA</button>
        {estadoSinc && <span className="feedback">{estadoSinc}</span>}
      </form>
    </div>
  );
};

export default PanelBeta;
