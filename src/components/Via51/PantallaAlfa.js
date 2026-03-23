import React, { useState, useEffect } from 'react';

const PantallaAlfa = () => {
  const [pressTimer, setPressTimer] = useState(null);
  const [esHorizontal, setEsHorizontal] = useState(false);

  useEffect(() => {
    // 1. RADAR DE INTELIGENCIA Y COMPATIBILIDAD
    const capturarInteligencia = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        console.log("📍 RADAR VÍA 51 - DETECCIÓN:", {
          ubicacion: `${data.city}, ${data.country_name}`,
          dispositivo: /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "Apple iOS" : "Otros",
          sistema: navigator.platform
        });
      } catch (e) { console.error("Error Radar"); }
    };
    capturarInteligencia();
  }, []);

  // 2. LÓGICA DE SALIDA (2 Segundos)
  const handleStart = () => {
    const timer = setTimeout(() => { window.location.href = "https://via51.org"; }, 2000);
    setPressTimer(timer);
  };
  const handleEnd = () => { if (pressTimer) { clearTimeout(pressTimer); setPressTimer(null); } };

  return (
    <div className="flex h-screen w-screen bg-[#050505] items-center justify-center overflow-hidden">
      
      {/* BOTÓN DE SOLICITUD HORIZONTAL (Discreto en la esquina) */}
      <button 
        onClick={() => setEsHorizontal(!esHorizontal)}
        className="absolute top-5 right-5 z-[100] bg-white/10 hover:bg-white/20 text-white text-[9px] py-1 px-3 rounded-full border border-white/20 transition-all uppercase tracking-widest"
      >
        {esHorizontal ? "Fijar Vertical" : "Expandir Vista"}
      </button>

      {/* MARCO LIMITATORIO (Container Dinámico) */}
      <div 
        className={`relative transition-all duration-700 ease-in-out shadow-2xl border-x border-white/5 
          ${esHorizontal ? 'w-full h-full' : 'aspect-[9/16] h-[95vh] rounded-[3rem] overflow-hidden'}`}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
      >
        
        {/* MEDIA LAYER (Inclusión Apple: playsInline + muted para AutoPlay) */}
        <div className="absolute inset-0 bg-black">
          <img 
            src="/media/ceo-lima.png" 
            alt="Vía 51" 
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* TEXTO ESTRATÉGICO */}
        <div className="absolute bottom-12 left-0 w-full px-8 z-20">
          <h1 className="text-white text-5xl font-black leading-none mb-4 tracking-tighter uppercase">
            EL QUÉ
          </h1>
          <div className="p-4 backdrop-blur-md bg-black/40 rounded-2xl border border-white/10">
            <p className="text-white text-lg font-extralight leading-snug">
              <span className="text-blue-400 font-bold italic">EL CÓMO:</span> Gestión de precisión para el 2026. 
              Calidad mundial sin exclusión.
            </p>
          </div>
        </div>

        {/* INDICADOR DE CARGA / SALIDA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <div className={`w-20 h-20 rounded-full border-2 border-white/30 ${pressTimer ? 'animate-ping' : ''}`} />
        </div>

      </div>
    </div>
  );
};

export default PantallaAlfa;