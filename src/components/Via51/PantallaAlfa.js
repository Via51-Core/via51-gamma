import React from 'react';

const PantallaAlfa = ({ data, host }) => {
  // Si no hay data aún, mostramos un estado de carga elegante
  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-600">Iniciando Nodo...</div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Decorativo: Un aura sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-16 shadow-2xl">
        
        <div className="flex flex-col items-center text-center">
          
          {/* TAG DEL SUBDOMINIO (Discreto arriba) */}
          <span className="text-[10px] tracking-[0.4em] uppercase text-yellow-600/60 mb-8 border border-yellow-600/20 px-3 py-1 rounded-full">
            {host || 'NODO CENTRAL'}
          </span>

          {/* EL QUÉ: Identidad Presidencial */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-100 via-yellow-500 to-yellow-800">
              {data.titulo_que || "Presidente: Mesías Guevara"}
            </span>
          </h1>

          {/* DIVISOR ESTÉTICO */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent my-10" />

          {/* EL CÓMO: Descripción Ejecutiva */}
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl italic">
            "{data.descripcion_como || "Liderazgo técnico para la transformación nacional."}"
          </p>

          {/* PIE DE PÁGINA: Holding Identity */}
          <footer className="mt-16 pt-8 border-t border-white/5 w-full flex justify-between items-center">
            <div className="text-[9px] tracking-widest text-gray-600 uppercase">
              Vía 51 Digital Holding © 2026
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-yellow-900" />
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default PantallaAlfa;