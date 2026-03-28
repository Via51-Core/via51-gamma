// src/engines/CaptureEngine.tsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import { SCHEMA } from '../lib/constants';
import { useTenant } from '../context/TenantContext';

interface CaptureProps {
  capaId: string;
  variableName: string;
  tituloFormulario: string;
}

export const CaptureEngine: React.FC<CaptureProps> = ({ capaId, variableName, tituloFormulario }) => {
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Extraemos la identidad del Tenant actual del Holding
  const { tenant } = useTenant();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tenant) {
      alert("Error: No se ha detectado una organización válida para esta operación.");
      return;
    }

    setLoading(true);
    
    // Inyectamos la mutación utilizando la vista profesional 'telemetry_logs'
    // Incluimos el tenant_id para mantener el aislamiento de datos por cliente
    const { error } = await supabase
      .from(SCHEMA.TABLES.TELEMETRY)
      .insert({ 
        capa_id: capaId, 
        variable_name: variableName, 
        valor: parseFloat(valor),
        tenant_id: tenant.id // <--- Vínculo de identidad del Holding
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