/* Ruta: src/components/Beta.js
Nombre: Beta.js
Descripción: Panel de gestión para el Holding Digital Vía51. 
Controla el contenido de Alfa (pol).
*/

import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; // Cliente Supabase configurado
import './Beta.css';

const Beta = () => {
  const [formData, setFormData] = useState({
    titulo_que: '',
    descripcion_como: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // 1. Cargar datos actuales de ALFA (pol) al iniciar
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from('nodos')
        .select('titulo_que, descripcion_como')
        .eq('slug', 'pol')
        .single();

      if (data) {
        setFormData({
          titulo_que: data.titulo_que || '',
          descripcion_como: data.descripcion_como || ''
        });
      }
      if (error) console.error('Error cargando Alfa:', error.message);
    };

    fetchInitialData();
  }, []);

  // 2. Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Ejecutar UPSERT en Supabase
  const handleGuardar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sincronizando...');

    const { error } = await supabase
      .from('nodos')
      .upsert({ 
        slug: 'pol', 
        titulo_que: formData.titulo_que, 
        descripcion_como: formData.descripcion_como 
      }, { onConflict: 'slug' });

    setLoading(false);
    if (error) {
      setStatus('Error: ' + error.message);
    } else {
      setStatus('✅ ALFA Actualizado con éxito');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="beta-container">
      <div className="beta-overlay">
        <form className="beta-panel" onSubmit={handleGuardar}>
          <h2>NODO BETA: CONTROL MAESTRO</h2>
          <hr />
          
          <div className="input-group">
            <label>TÍTULO (QUÉ):</label>
            <input
              type="text"
              name="titulo_que"
              value={formData.titulo_que}
              onChange={handleChange}
              placeholder="Ej: La Identidad Digital..."
              required
            />
          </div>

          <div className="input-group">
            <label>DESCRIPCIÓN (CÓMO):</label>
            <textarea
              name="descripcion_como"
              value={formData.descripcion_como}
              onChange={handleChange}
              placeholder="Ej: Una mirada pública..."
              rows="5"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'PROCESANDO...' : 'ACTUALIZAR NODO ALFA'}
          </button>

          {status && <p className="status-msg">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Beta;