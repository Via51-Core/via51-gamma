import React from 'react';

const PantallaAlfa = ({ data, host }) => {
  // Datos por defecto si Supabase aún no sincroniza
  const titulo = data?.titulo_que || "Presidente: Mesías Guevara";
  const descripcion = data?.descripcion_como || "Liderazgo técnico para la transformación del Perú 2026.";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Efecto Radar de Fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-900/10 rounded-full animate-[ping_7s_linear_infinite]" />
      </div>

      <main className="relative z-10 w-full max-w-3xl bg-black/60 backdrop-blur-3xl border border-yellow-900/20 rounded-[2.5rem] p-12 md:p-20 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          
          {/* Identificador de Radar */}
          <div className="mb-10 flex items-center gap-2 bg-yellow-950/30 px-4 py-1 rounded-full border border-yellow-700/20">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.5em] font-bold text-yellow-500/80 uppercase">
              RADAR LIMA ACTIVO
            </span>
          </div>

          {/* Nombre Presidencial */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-yellow-500 to-yellow-800">
              {titulo}
            </span>
          </h1>

          <div className="w-20 h-1 bg-yellow-600 mb-10 rounded-full" />

          {/* Eslogan Estratégico */}
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed italic">
            "{descripcion}"
          </p>

          {/* Footer del Holding */}
          <footer className="mt-16 text-[9px] tracking-[0.8em] text-gray-600 uppercase font-bold">
            Vía 51 Digital Holding
          </footer>
        </div>
      </main>
    </div>
  );
};

export default PantallaAlfa;