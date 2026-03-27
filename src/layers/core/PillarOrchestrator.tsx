import React, { useState } from 'react';
import AlphaMutationView from '../alfa/AlphaMutationView';
import SystemCommand from './SystemCommand';

export type PillarType = 'POLITICO' | 'SOCIAL' | 'PRODUCTIVO';

const PillarOrchestrator: React.FC = () => {
  const [activePillar, setActivePillar] = useState<PillarType | null>(null);
  const [isMutationOpen, setIsMutationOpen] = useState(false);

  const handlePillarClick = (pillar: PillarType) => {
    setActivePillar(pillar);
    setIsMutationOpen(true);
  };

  const handleClose = () => {
    setIsMutationOpen(false);
    setTimeout(() => setActivePillar(null), 400); 
  };

  return (
    <div className="hero-bg">
      <SystemCommand 
        command={activePillar ? `ACTIVATING_${activePillar}` : 'WAITING_CEO_INPUT'} 
        status={activePillar ? 'active' : 'idle'} 
      />

      <nav className="contenedor-semaforo">
        <button className="boton-ceo" onClick={() => handlePillarClick('POLITICO')}>EJE POLÍTICO</button>
        <button className="boton-ceo" onClick={() => handlePillarClick('SOCIAL')}>EJE SOCIAL</button>
        <button className="boton-ceo" onClick={() => handlePillarClick('PRODUCTIVO')}>EJE PRODUCTIVO</button>
      </nav>

      <AlphaMutationView 
        isOpen={isMutationOpen} 
        pillar={activePillar} 
        onClose={handleClose} 
      />
    </div>
  );
};

export default PillarOrchestrator;