import React from 'react';

const PantallaEsceptico = ({ datos, next }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 animate-fade-in">
      {/* Contenedor de Auditoría */}
      <div className="w-full max-w-md bg-black/80 backdrop-blur-xl border-t-2 border-blue-500 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-400 font-black tracking-tighter text-2xl">AUDITORÍA TÉCNICA</h2>
          <span className="bg-blue-500 text-[10px] px-2 py-1 rounded-full text-white font-bold">VIDENZA VI</span>
        </div>

        {/* Score Principal */}
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-6xl font-black text-white">{datos.auditoria.puntajeVidenza}</span>
          <span className="text-blue-500 font-bold">/ 4.00</span>
        </div>

        {/* Desglose de Dimensiones */}
// Dentro del return de tu componente:
<div className="space-y-4">
  {datos.auditoria.dimensiones.map((item, index) => (
    <div key={index} className="w-full">
      <div className="flex justify-between text-xs mb-1 uppercase">
        <span>{item.area}</span>
        <span className="font-bold text-blue-400">{item.nota}</span>
      </div>
      
      {/* Barra de Progreso Dinámica */}
      <div className="h-1 w-full bg-white/10 rounded-full">
        <div 
          className="h-full bg-blue-500" 
          style={{ width: `${(item.nota / 4) * 100}%` }} // El cálculo técnico
        ></div>
      </div>
    </div>
  ))}
</div>
        {/* Call to Action */}
        <button 
          onClick={next}
          className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 rounded-lg"
        >
          Validar y Firmar Compromiso
        </button>
      </div>
      
      <p className="mt-6 text-[10px] opacity-40 uppercase tracking-[0.2em]">
        Fuente: Evaluación de Planes de Gobierno - Videnza Consultores
      </p>
    </div>
  );
};

export default PantallaEsceptico;
