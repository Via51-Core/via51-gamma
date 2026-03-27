// src/App.tsx
import React, { useState } from 'react';
import { NodeController } from './components/NodeController';
import './styles/App.css';

const App: React.FC = () => {
  // Estado que guarda el ID del nodo actual (Inicia en '0' = Vía51)
  const [currentNodeId, setCurrentNodeId] = useState<string>('0');

  return (
    <div className="via51-global-wrapper">
      {/* El NodeController toma el mando basándose en el ID actual */}
      <NodeController 
        nodeId={currentNodeId} 
        onNavigate={(nextId) => setCurrentNodeId(nextId)} 
      />
      
      {/* Barra de estado inferior opcional (Calidad Mundial) */}
      <footer className="system-status">
        STATUS: ONLINE | TERMINAL_ID: NODE_CENTRAL | LEVEL: {currentNodeId}
      </footer>
    </div>
  );
};

export default App;