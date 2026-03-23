import React from 'react';

const PantallaCenit = ({ config, onRetornar }) => {
  if (!config) return null;

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 animate-in fade-in"
      style={{ backgroundImage: `url(${config.fondo})` }}
    >
      {/* Botón de Retorno Táctico */}
      <button
        onClick={onRetornar}
        className="absolute top-8 left-6 z-50 p-4 bg-black/30 backdrop-blur-xl rounded-full text-white border border-white/20 active:scale-90 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Capa Antigravity: Fondo Limpio */}
    </div>
  );
};

export default PantallaCenit;