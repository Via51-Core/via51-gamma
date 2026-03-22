import React, { useState } from 'react'; // Eliminado useEffect por ahora
import { CAMPAIGN_DATA } from './data/candidato-config';

import './styles/App.css';
//import './App.css';

// Componente temporal de Capa 0 (Semaforo)
const SemaforoControl = ({ onVote, datos }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-between pt-2 pb-12">
    
    {/* BLOQUE CENIT: Ajustado para rozar la frente */}
    <div className="text-center mt-2 scale-90 md:scale-100"> 
      <h2 className="text-white/80 font-light text-base tracking-[0.4em] uppercase mb-0">
        {datos.cenit.linea1}
      </h2>
      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.8]">
        {datos.cenit.linea2}
      </h1>
    </div>

    {/* BLOQUE INFERIOR: Interpelación y Botones */}
    <div className="w-full flex flex-col items-center">
      <p className="text-blue-400 italic text-lg mb-6 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
        {datos.cenit.interpelacion}
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 px-6">
        {datos.botones.map((btn) => (
          <button 
            key={btn.id}
            onClick={() => onVote(btn.id)} 
            className={`boton-ceo border-${btn.color}-500/40 hover:bg-${btn.color}-500/10`}
          >
            <span className={`text-${btn.color}-500 font-black text-xl tracking-widest`}>
              {btn.etiqueta}
            </span>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
              {btn.subtexto}
            </p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// src/App.js

function App() {
  const [fase, setFase] = useState(0);
  // Asegúrese de que CAMPAIGN_DATA esté bien importado arriba
  const [perfil] = useState(CAMPAIGN_DATA); 

  return (
    <main 
      className="relative min-h-screen bg-black bg-cover bg-top"
      style={{ backgroundImage: `url(${perfil.assets.heroImage})` }}
    >
      {/* Filtro de oscuridad para que el texto resalte */}
      <div className="absolute inset-0 bg-black/40" /> 

      {/* CAPA 0: EL SEMÁFORO */}
      {fase === 0 && (
        <SemaforoControl 
          onVote={(id) => setFase(1)} 
          datos={perfil} 
        />
      )}
      
      {/* ... resto de las fases */}
    </main>
  );
}

export default App;