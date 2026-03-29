// ==========================================
// PATH: src/components/NodeController.tsx
// FUNCTION: Agnostic Output Renderer
// STANDARD: Live Data Streaming / Section Filtering
// ==========================================
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const NodeController: React.FC<{ nodeId: string; onNavigate: (id: string) => void }> = ({ nodeId, onNavigate }) => {
  const [content, set_content] = useState<any[]>([]);
  const [loading, set_loading] = useState(false);

  // Mapeamos nodos a secciones lógicas
  const section_map: Record<string, string> = {
    '1.1': 'SECTION_BETA',
    '2.1': 'SECTION_GAMMA'
  };

  useEffect(() => {
    const target = section_map[nodeId];
    if (target) {
      const fetch_data = async () => {
        set_loading(true);
        const { data } = await supabase
          .from('sys_registry')
          .select('configuracion_json')
          .filter('configuracion_json->meta->>section', 'eq', target);
        
        set_content(data || []);
        set_loading(false);
      };
      fetch_data();
    }
  }, [nodeId]);

  if (nodeId === 'root') return (
    <div className="p-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 italic uppercase">Holding_Chassis_v51</h1>
      <div className="flex gap-10">
        <button onClick={() => onNavigate('1.1')} className="border border-zinc-800 p-10 hover:border-white transition-all uppercase text-xs">Access_Beta_Development</button>
        <button onClick={() => onNavigate('2.1')} className="border border-zinc-800 p-10 hover:border-white transition-all uppercase text-xs">Access_Gamma_Science</button>
      </div>
    </div>
  );

  return (
    <div className="p-10">
      <button onClick={() => onNavigate('root')} className="text-[10px] text-zinc-500 uppercase mb-10 tracking-widest hover:text-white">← Return_to_Root</button>
      <h2 className="text-4xl font-black uppercase mb-6">{section_map[nodeId] || 'NODE_OFFLINE'}</h2>
      
      {loading ? (
        <p className="animate-pulse text-zinc-500">Streaming_Content...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.map((item, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-tighter">
                {item.configuracion_json.identity.label}
              </span>
              <p className="text-white mt-2 font-serif italic text-lg">
                "{item.configuracion_json.content.phrase}"
              </p>
            </div>
          ))}
          {content.length === 0 && <p className="text-zinc-700 uppercase text-xs">Empty_Section_Awaiting_Data</p>}
        </div>
      )}
    </div>
  );
};