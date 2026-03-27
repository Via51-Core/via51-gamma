import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ruta verificada según tu VS Code

interface CaptureProps {
  capaId: string;
  variableName: string;
  tituloFormulario: string;
}

export const CaptureEngine: React.FC<CaptureProps> = ({ capaId, variableName, tituloFormulario }) => {
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from('via51_mutations')
      .insert({ 
        capa_id: capaId, 
        variable_name: variableName, 
        valor: parseFloat(valor) 
      });

    if (error) {
      console.error("Error Supabase:", error);
      alert("Error al inyectar: " + error.message);
    } else {
      alert("Mutación Inyectada con Éxito");
      setValor('');
    }
    setLoading(false);
  };

  return (
    <div className="engine-box capture">
      <h3>{tituloFormulario}</h3>
      <form onSubmit={handleSend}>
        <input 
          type="number" 
          step="0.01"
          value={valor} 
          onChange={e => setValor(e.target.value)} 
          placeholder="Ingrese valor..." 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'ENVIANDO...' : 'INYECTAR'}
        </button>
      </form>
    </div>
  );
};