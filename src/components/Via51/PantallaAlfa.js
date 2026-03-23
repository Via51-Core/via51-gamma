import React, { useState, useEffect } from 'react';

const PantallaAlfa = ({ alSeleccionar, config }) => {
  const [pressed, setPressed] = useState(false);
  let pressTimer;

  // Lógica de Salida: Long Press 2 segundos
  const handleStart = () => {
    pressTimer = setTimeout(() => {
      window.location.href = "https://via51.org"; // O la ruta de retorno
    }, 2000);
  };

  const handleEnd = () => clearTimeout(pressTimer);

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden bg-black select-none"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      {/* EL QUÉ: Media al 100% */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="h-full w-full object-cover opacity-80"
        >
          <source src="/media/ceo-lima-v2.mp4" type="video/mp4" />
          {/* Fallback a imagen si no hay video */}
          <img src="/media/ceo-lima.png" alt="Vía 51 Alfa" className="h-full w-full object-cover" />
        </video>
      </div>

      {/* EL CÓMO: Capa de Mensajería Discreta/Destacada */}
      <div className="absolute bottom-10 left-0 w-full px-8 z-10">
        <div className="max-w-xl animate-fade-in-up">
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight drop-shadow-2xl">
            EL QUÉ <span className="block text-2xl font-thin opacity-70 mt-2 text-blue-400">Impacto Inmediato</span>
          </h1>
          
          <div className="mt-6 p-4 backdrop-blur-md bg-white/10 rounded-lg border-l-4 border-blue-500">
            <p className="text-white text-lg md:text-xl font-light leading-relaxed">
              <span className="font-bold text-blue-300">EL CÓMO:</span> Aquí se detalla la propuesta técnica. 
              Elegancia, precisión y gestión de calidad mundial para el Perú del 2026.
            </p>
          </div>
        </div>
      </div>

      {/* Marca de Agua Discreta */}
      <div className="absolute top-8 right-8 z-10 opacity-40">
        <p className="text-white text-xs tracking-[0.5em] font-bold">VÍA 51 | NODO ALFA</p>
      </div>
    </div>
  );
};

export default PantallaAlfa;