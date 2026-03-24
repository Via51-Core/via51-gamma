import React from 'react';

const PantallaAlfa = ({ data, host }) => {
  // Estado de carga si la base de datos tarda un segundo
  if (!data) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-yellow-600 tracking-[0.4em] text-[10px] uppercase">
        Sincronizando Radar Vía 51...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Efecto Radar de Fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-900/10 rounded-full animate-[ping_8s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-yellow-900/20 rounded-full" />
      </div>

      <main className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 md:p-24 text-center shadow-2xl">
        
        {/* Radar Tag */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(234,179,8,1)]" />
          <span className="text-[10px] font-bold tracking-[0.6em] text-yellow-600 uppercase">
            RADAR LIMA: {host || 'SISTEMA ACTIVO'}
          </span>
        </div>

        {/* DATA DINÁMICA DE SUPABASE */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-yellow-500 to-yellow-800">
            {data.titulo_que}
          </span>
        </h1>

        <div className="w-20 h-px bg-yellow-900/50 mx-auto mb-10" />

        <p className="text-2xl md:text-3xl text-gray-400 font-extralight tracking-tight leading-relaxed max-w-2xl mx-auto italic">
          "{data.descripcion_como}"
        </p>

        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="text-[9px] tracking-[0.8em] text-gray-700 font-bold uppercase">
            Vía 51 Digital Holding © 2026
          </div>
        </footer>

      </main>
    </div>
  );
};

export default PantallaAlfa;