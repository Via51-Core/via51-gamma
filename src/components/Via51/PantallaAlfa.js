import React, { useState, useEffect } from 'react';

const PantallaAlfa = ({ data, host }) => {
  const [visitante, setVisitante] = useState({ city: 'Detectando...', ip: '...' });

  useEffect(() => {
    // Capturamos la inteligencia del visitante sin chocar con la data de la campaña
    const capturarInteligencia = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const info = await res.json();
        setVisitante({ city: info.city, ip: info.ip });
        console.log(`%c📍 RADAR ACTIVO: ${info.city} [${info.ip}]`, "color: #EAB308; font-weight: bold;");
      } catch (e) {
        console.error("Radar de IP Offline");
      }
    };
    capturarInteligencia();
  }, []);

  // Prioridad Presidencial: Si Supabase no llega, no mostramos "EL QUÉ"
  const titulo = data?.titulo_que || "Presidente: Mesías Guevara";
  const desc = data?.descripcion_como || "Liderazgo técnico y político para la transformación del Perú 2026.";

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Radar FX */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-600 rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 w-full max-w-4xl bg-black/60 backdrop-blur-3xl border border-yellow-500/10 rounded-[40px] p-16 md:p-24 text-center">
        
        {/* Badge Dinámico */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 mb-12">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
          <span className="text-[10px] tracking-[0.4em] font-black text-yellow-500 uppercase">
            {visitante.city} // {host || 'VIA51.ORG'}
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-yellow-400 to-yellow-700">
            {titulo}
          </span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-400 font-light italic max-w-2xl mx-auto leading-relaxed border-l-4 border-yellow-600/20 pl-6">
          "{desc}"
        </p>

        <footer className="mt-20 opacity-20 text-[9px] tracking-[1em] font-bold uppercase">
          Vía 51 Digital Holding
        </footer>
      </main>
    </div>
  );
};

export default PantallaAlfa;