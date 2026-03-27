import React from 'react';
import { nodeTree } from '../data/nodeTree';
import { CaptureEngine } from '../engines/CaptureEngine';
import { RenderEngine } from '../engines/RenderEngine';

interface Props {
  nodeId: string;
  onNavigate: (id: string) => void;
}

export const NodeController: React.FC<Props> = ({ nodeId, onNavigate }) => {
  const node = nodeTree[nodeId];

  // Si el nodo no existe en nodeTree.ts, mostramos un error elegante
  if (!node) return <div style={{color: '#f00', padding: '20px'}}>Error: Nodo {nodeId} no definido.</div>;

  return (
    <div className="node-shell" style={{ backgroundImage: `url(/assets/${node.background})` }}>
      <div className="overlay">
        <h1>{node.label}</h1>
        
        {node.type === 'folder' ? (
          <div className="nav-menu">
            {node.children?.map(childId => (
              <button key={childId} onClick={() => onNavigate(childId)}>
                ACCEDER A {nodeTree[childId]?.label || childId}
              </button>
            ))}
            {nodeId !== '0' && (
              <button className="btn-back" onClick={() => onNavigate('0')}>
                VOLVER AL NODO CENTRAL
              </button>
            )}
          </div>
        ) : (
          <div className="engine-container">
            <RenderEngine 
              capaId={node.id} 
              variableName={node.variable!} 
              tituloMonitor="ESTADO ACTUAL" 
            />
            <CaptureEngine 
              capaId={node.id} 
              variableName={node.variable!} 
              tituloFormulario="INYECCIÓN ALPHA" 
            />
            <button onClick={() => onNavigate('1.2')}>CERRAR MONITOR</button>
          </div>
        )}
      </div>
    </div>
  );
};