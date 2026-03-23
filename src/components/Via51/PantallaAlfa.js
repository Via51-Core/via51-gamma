import React from 'react';
import fondoCeo from '../../assets/ceo-lima.png'; 

const PantallaAlfa = ({ onSeleccionar }) => {
  const TEXTO_APOYO_BOTON = "ERES DE LOS QUE SABEN"; 

  const botones = [
    { tipo: 'VERDE', color: 'green', titulo: 'INDISCUTIBLE' },
    { tipo: 'AMBAR', color: 'yellow', titulo: 'PUEDE SER' },
    { tipo: 'ROJO', color: 'red', titulo: 'DIFÍCIL' },
  ];

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center hero-bg overflow-hidden"
      style={{ backgroundImage: `url(${fondoCeo})` }}
    >
      <div className="absolute inset-0 bg-black/25" /> 
      
      {/* Reducimos el pt-8 a pt-4 para subir un poco el titular y alejarlo de la cabeza */}
      <div className="relative z-10 flex flex-col items-center h-full w-full pt-4 pb-12">
        
        {/* BLOQUE TITULAR SUPERIOR: Subido para no tocar la coronilla */}
        <div className="text-center animate-fade-in-down px-4">
          <p className="text-gray-200 font-light text-[12px] tracking-[0.6em] uppercase mb-1 opacity-90">
            EL ÚLTIMO EN LA CÉDULA DE VOTACIÓN
          </p>
          <h1 className="text-white text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter uppercase whitespace-nowrap">
            PRIMERO EN LAS CALIFICACIONES
          </h1>
        </div>

        {/* BLOQUE INFERIOR: Bajado al máximo hacia la mesa */}
        <div className="mt-auto w-full flex flex-col items-center gap-4">
          
          {/* Interpelación: Encima de los botones y con espaciado elegante */}
          <div className="bg-black/50 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full mb-2">
            <p className="text-gray-300 italic text-xs md:text-sm tracking-wide">
              Ante la evidencia... ¿Tú qué piensas? ¿Cómo te consideras?
            </p>
          </div>

          {/* Botones: Bajados con pb-12 en el contenedor padre */}
          <div className="contenedor-semaforo px-6 scale-90 md:scale-100">
            {botones.map((btn) => (
              <button
                key={btn.tipo}
                onClick={() => onSeleccionar(btn.tipo)}
                className={`boton-ceo border-${btn.color}-500/30 hover:border-${btn.color}-500 transition-all duration-300 shadow-2xl`}
              >
                <span className={`text-${btn.color}-500 font-black text-2xl block mb-1 tracking-tighter uppercase`}>
                  {btn.titulo}
                </span>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                  {TEXTO_APOYO_BOTON}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PantallaAlfa;