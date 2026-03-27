import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ruta verificada según tu VS Code

interface RenderProps {
  capaId: string;
  variableName: string;
  tituloMonitor: string;
}

export const RenderEngine: React.FC<RenderProps> = ({ capaId, variableName, tituloMonitor }) => {
  const [dato, setDato] = useState<number | null>(null);

  useEffect(() => {
    // Escucha en tiempo real de Supabase
    const channel = supabase
      .channel('cambios-reales')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'via51_mutations', filter: `capa_id=eq.${capaId}` },
        (payload) => {
          if (payload.new.variable_name === variableName) {
            setDato(payload.new.valor);
          }
        }
      ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [capaId, variableName]);

  return (
    <div className="engine-box render">
      <h3>{tituloMonitor}</h3>
      <div className="digital-display">
        {dato !== null ? dato.toFixed(2) : '---'}
      </div>
    </div>
  );
};