// ==========================================
// RUTA: src/components/NodeController.tsx
// ==========================================
import React from 'react';
import { useTenant } from '../context/TenantContext';
import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';

export const NodeController: React.FC<{ nodeId?: string }> = ({ nodeId = 'root' }) => {
  const { tenant } = useTenant();
  const node = tenant?.nodeTree?.[nodeId];

  const enviarPulsoTelemetria = async (idHijo: string, etiqueta: string) => {
    // Cambiamos el hash para navegar
    window.location.hash = idHijo;

    // Enviamos el evento a la tabla sys_events
    if (tenant?.id) {
      await supabase
        .from(SCHEMA.TABLES.TELEMETRY)
        .insert([
          {
            tenant_id: tenant.id,
            event_type: 'GAVETA_OPEN',
            variable_name: 'click_usuario',
            metadata: { 
              nodo_id: idHijo, 
              nombre: etiqueta,
              timestamp: new Date().toISOString()
            }
          }
        ]);
    }
  };

  if (!node) return <div className="p-10 text-white font-mono opacity-50">SINCRONIZANDO NODOS...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-10 uppercase tracking-tighter">
        {node.label}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {node.children?.map((id: string) => {
          const hijo = tenant?.nodeTree?.[id];
          return (
            <button
              key={id}
              onClick={() => enviarPulsoTelemetria(id, hijo?.label || id)}
              className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-blue-500 transition-all text-left group shadow-lg"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📂</div>
              <span className="text-zinc-500 text-[10px] block font-mono mb-1 uppercase">Ref: {id}</span>
              <span className="text-white font-bold text-xl uppercase tracking-tight">
                {hijo?.label || "GAVETA"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};