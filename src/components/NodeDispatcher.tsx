// src/components/NodeDispatcher.tsx
import React from 'react';
import { supabase } from '../lib/supabaseClient';

interface NodeActionProps {
  node: {
    node_id: string;
    label: string;
    node_type: 'category' | 'entity' | 'action' | 'metric';
    access_level: number;
    metadata?: any;
  };
  userLevel: number;
  tenantId: string;
}

export const NodeDispatcher: React.FC<NodeActionProps> = ({ node, userLevel, tenantId }) => {
  
  // Bloqueo Multinivel Inmediato
  if (userLevel < node.access_level) {
    return (
      <div className="p-2 border border-red-900/30 bg-red-950/10 text-[9px] text-red-500 uppercase">
        ACCESS_DENIED: LEVEL_{node.access_level}_REQUIRED
      </div>
    );
  }

  const handleAction = async () => {
    if (node.node_type !== 'action') return;

    // Registro automático de telemetría (Auditoría Estandarizada)
    const { error } = await supabase
      .from('sys_events')
      .insert([{
        event_type: 'NODE_ACTION_EXECUTE',
        tenant_id: tenantId,
        layer_id: 'FRONTEND_DISPATCHER',
        metric_id: node.node_id,
        payload: { 
          label: node.label,
          executed_at: new Date().toISOString()
        }
      }]);

    if (error) console.error("DISPATCH_LOG_FAIL:", error.message);
    
    // Aquí se dispararía la lógica específica contenida en metadata
    alert(`EXECUTING: ${node.label}`);
  };

  return (
    <div 
      onClick={handleAction}
      className={`p-4 border transition-all cursor-pointer ${
        node.node_type === 'action' 
          ? 'border-blue-900/50 hover:bg-blue-950/20' 
          : 'border-zinc-800'
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-widest">{node.label}</span>
        <span className="text-[8px] opacity-40">TYPE_{node.node_type}</span>
      </div>
      {node.metadata?.description && (
        <p className="text-[9px] text-zinc-500 mt-2">{node.metadata.description}</p>
      )}
    </div>
  );
};