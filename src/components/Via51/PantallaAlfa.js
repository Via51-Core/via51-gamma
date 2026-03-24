import React, { useEffect } from 'react';

const PantallaAlfa = ({ data, host }) => {
  // LOG PARA EL RADAR DE LIMA
  useEffect(() => {
    console.log("%c📍 RADAR VÍA 51: NODO LIMA IDENTIFICADO", "color: #EAB308; font-weight: bold; font-size: 12px;");
  }, []);

  // DATA FALLBACK PRO: Si Supabase falla o hay chisporroteo, el sistema NO muestra "EL QUÉ"
  const displayTitle = data?.titulo_que || "Presidente: Mesías Guevara";
  const displayDesc = data?.descripcion_como || "Liderazgo técnico y político para la transformación del Perú 2026.";

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* CAPA DE RADAR PRO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-yellow-500/5 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-500/10 rounded-full animate-[ping_10s_linear_infinite]" />
      </div>

      <main className="relative z-10 w-full max-w-4xl bg-black/80 backdrop-blur-3xl border border-yellow-500/10 rounded-[40px] p-16 md:p-28 shadow-[0_0_100px_-20px_rgba(234,179,8,0.2)]">
        <div className="flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 mb-12">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-[9px] tracking-[0.5em] font-black text-yellow-500 uppercase">Nodo Lima Activo</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8 italic">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-yellow-500 to-yellow-900 drop-shadow-2xl">
              {displayTitle}
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed italic border-l-2 border-yellow-600/30 pl-6">
            "{displayDesc}"
          </p>

          <div className="mt-20 opacity-30">
            <div className="text-[10px] tracking-[1em] text-yellow-200 uppercase font-bold">Vía 51 Holding</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PantallaAlfa;