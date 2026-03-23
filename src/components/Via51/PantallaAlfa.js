import React, { useState, useEffect } from 'react';

const PantallaAlfa = () => {
  const [pressTimer, setPressTimer] = useState(null);

  // --- RADAR DE INTELIGENCIA (Fase 2: Recolección) ---
  useEffect(() => {
    const capturarInteligencia = async () => {
      try {
        // Captura de ubicación por IP (No pide permiso al usuario)
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        const reporte = {
          evento: "Debate_Presidencial_Lunes",
          ubicacion: `${data.city}, ${data.region}, ${data.country_name}`,
          ip_publica: data.ip,
          isp: data.org, // Proveedor de internet (Claro, Movistar, etc.)
          dispositivo: /iPhone|Android/i.test(navigator.userAgent) ? "Smartphone" : "Desktop",
          referencia: document.referrer || "WhatsApp/Acceso Directo",
          timestamp: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })
        };

        // Registro en Consola de VSC (Para su monitoreo en vivo)
        console.log("📍 RADAR VÍA 51 - DETECCIÓN:", reporte);
        
        // NOTA: Para el miércoles, aquí conectaremos el "Reset a Cero" y el contador masivo.
      } catch (error) {
        console.error("Falla en el radar silencioso:", error);
      }
    };

    capturarInteligencia();
  }, []);

  // --- LÓGICA DE SALIDA (Long Press 2 Segundos) ---
  const handleStart = () => {
    const timer = setTimeout(() => {
      // Retorno a la base (Web Principal)
      window.location.href = "https://via51.org";
    }, 2000);
    setPressTimer(timer);
  };

  const handleEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden bg-black select-none cursor-crosshair"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      {/* EL QUÉ: Media al 100% (Imagen o Video) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/media/ceo-lima.png" 
          alt="Vía 51 Alfa" 
          className="h-full w-full object-cover opacity-90 transition-opacity duration-1000"
        />
        {/* Overlay degradado para lectura de textos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* EL CÓMO: Capa de Mensajería Estratégica */}
      <div className="absolute bottom-16 left-0 w-full px-10 z-10">
        <div className="max-w-2xl">
          <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            EL QUÉ
            <span className="block text-xl md:text-2xl font-light tracking-[0.3em] text-blue-400 mt-2">
              Impacto y Decisión
            </span>
          </h1>
          
          <div className="mt-8 p-6 backdrop-blur-xl bg-white/5 rounded-sm border-l-[1px] border-white/30">
            <p className="text-white text-lg md:text-2xl font-extralight leading-tight">
              <strong className="font-bold text-white">EL CÓMO:</strong> Gestión técnica de precisión. 
              Arquitectura de estado diseñada para la eficiencia. El Perú del 2026 no espera.
            </p>
          </div>
        </div>
      </div>

      {/* Identificador del Nodo */}
      <div className="absolute top-10 right-10 z-10 text-right">
        <p className="text-white text-[10px] tracking-[0.8em] font-bold opacity-50">
          VÍA 51 | CANAL ALFA INMERSIVO
        </p>
        <p className="text-blue-500 text-[8px] tracking-[0.4em] uppercase mt-1">
          Monitor de Inteligencia Activo
        </p>
      </div>

      {/* Indicador de Salida Discreto */}
      <div className="absolute top-10 left-10 z-10 opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-white text-[9px] font-thin">Pulse 2s para salir</p>
      </div>
    </div>
  );
};

export default PantallaAlfa;