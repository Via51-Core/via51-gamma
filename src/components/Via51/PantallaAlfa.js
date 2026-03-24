import React from 'react';

const PantallaAlfa = ({ data, host }) => {
  // Si la data aún está cargando desde Supabase
  if (!data) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-yellow-600 tracking-[0.5em] text-xs">SINCRONIZANDO RADAR...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Aura de Fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-900/5 rounded-full animate-[ping_8s_linear_infinite]" />
      </div>

      <main className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 md:p-24 text-center shadow-2xl">
        
        {/* Radar Lima Status */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
          <span className="text-[10px] font-bold tracking-[0.6em] text-yellow-600 uppercase">
            RADAR LIMA: {host || 'VIA51.ORG'}
          </span>
        </div>

        {/* DATA DINÁMICA DE SUPABASE */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-yellow-500 to-yellow-800">
            {data.titulo_que}
          </span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-400 font-extralight tracking-tight leading-relaxed max-w-2xl mx-auto italic">
          "{data.descripcion_como}"
        </p>

        <footer className="mt-20 text-[9px] tracking-[0.8em] text-gray-700 font-bold uppercase">
          Vía 51 Digital Holding
        </footer>
      </main>
    </div>
  );
};

export default PantallaAlfa;