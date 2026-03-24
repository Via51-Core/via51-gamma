import React from 'react';

const PantallaAlfa = ({ data, host }) => {
  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-600">Sincronizando Radar Vía 51...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* EFECTO RADAR EN EL FONDO (Atmósfera) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-yellow-950/10 rounded-full animate-[ping_6s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-950/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-950/5 rounded-full blur-3xl" />
      </div>

      {/* CONTENEDOR CENTRAL (Interfaz de Mando) */}
      <main className="relative z-10 w-full max-w-4xl border border-yellow-900/10 bg-black/50 backdrop-blur-2xl rounded-3xl p-12 md:p-24 shadow-[0_0_60px_-15px_rgba(234,179,8,0.15)]">
        
        <div className="flex flex-col items-center text-center">
          
          {/* INDICADOR DE NODO ACTIVO (Radar Tag) */}
          <div className="flex items-center gap-3 mb-16 border border-yellow-700/20 px-4 py-1.5 rounded-full bg-yellow-950/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-600"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.6em] text-yellow-200/90 uppercase">
              RADAR ACTIVO: {host || 'VIA51.ORG'}
            </span>
          </div>

          {/* TITULAR PRESIDENCIAL (Dorado Presidencial) */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-100 via-yellow-500 to-yellow-800 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              {data.titulo_que}
            </span>
          </h1>

          {/* DESCRIPCIÓN ESTRATÉGICA (Estilo Sobrio) */}
          <p className="text-2xl md:text-3xl text-gray-300 font-extralight tracking-tight leading-relaxed max-w-2xl">
            {data.descripcion_como}
          </p>

          {/* SELLO DE IDENTIDAD (Pie) */}
          <div className="mt-20 w-full flex flex-col items-center gap-5 border-t border-yellow-900/10 pt-10">
            <div className="text-[10px] tracking-[0.7em] text-gray-600 font-medium uppercase">
              Hacia la Transformación Nacional
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PantallaAlfa;