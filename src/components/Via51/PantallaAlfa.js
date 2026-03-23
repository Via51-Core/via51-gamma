import React, { useState, useEffect } from 'react';

const PantallaAlfa = () => {
  const [pressTimer, setPressTimer] = useState(null);
  const [esHorizontal, setEsHorizontal] = useState(false);

  useEffect(() => {
    // RADAR DE INTELIGENCIA
    const capturarInteligencia = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        console.log("📍 RADAR VÍA 51:", data.city, data.ip);
      } catch (e) { console.error("Radar Offline"); }
    };
    capturarInteligencia();
  }, []);

  const handleStart = () => {
    const timer = setTimeout(() => { window.location.href = "https://via51.org"; }, 2000);
    setPressTimer(timer);
  };
  const handleEnd = () => { if (pressTimer) { clearTimeout(pressTimer); setPressTimer(null); } };

  return (
    <div className="flex h-screen w-screen bg-black items-center justify-center overflow-hidden font-sans">
      
      {/* BOTÓN DE VISTA: Discreto y elegante */}
      <button 
        onClick={() => setEsHorizontal(!esHorizontal)}
        className="absolute top-6 right-6 z-[100] bg-white/5 hover:bg-white/20 text-white text-[10px] py-2 px-4 rounded-full border border-white/10 transition-all backdrop-blur-md uppercase tracking-[0.2em]"
      >
        {esHorizontal ? "📱 MODO VERTICAL" : "🖥️ MODO CINE"}
      </button>

      {/* MARCO LIMITATORIO: Ahora con luz de contorno para PC */}
      <div 
        className={`relative transition-all duration-1000 ease-in-out 
          ${esHorizontal 
            ? 'w-full h-full border-none' 
            : 'aspect-[9/16] h-[92vh] rounded-[2.5rem] border-[1px] border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.2)] overflow-hidden'
          }`}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
      >
        
        {/* CAPA MULTIMEDIA (Optimizado para iOS) */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <video 
            autoPlay muted loop playsInline
            className="h-full w-full object-cover opacity-70"
          >
            <source src="/media/video-fondo.mp4" type="video/mp4" />
            <img src="/media/ceo-lima.png" alt="Respaldo" className="h-full w-full object-cover" />
          </video>
          {/* Degradado para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </div>

        {/* TEXTOS DINÁMICOS */}
        <div className="absolute bottom-14 left-0 w-full px-10 z-20">
          <p className="text-blue-500 text-[10px] tracking-[0.5em] font-bold mb-2 animate-pulse">
            SISTEMA ACTIVO
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-6">
            EL QUÉ
          </h1>
          <div className="p-5 backdrop-blur-2xl bg-white/5 rounded-xl border-l-2 border-blue-600">
            <p className="text-white/90 text-lg md:text-xl font-extralight leading-tight italic">
              "El cómo es nuestra ventaja técnica. Sin ruidos, solo resultados."
            </p>
          </div>
        </div>

        {/* INDICADOR DE PROGRESO DE SALIDA (Aparece al presionar) */}
        {pressTimer && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-600/20 backdrop-blur-sm transition-all">
            <p className="text-white font-bold tracking-widest animate-bounce">LIBERANDO NODO...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PantallaAlfa;