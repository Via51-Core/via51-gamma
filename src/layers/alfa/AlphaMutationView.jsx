import React from 'react';

// Este componente solo se renderiza cuando config.is_critical_mode === true
// Recibe 'eventData' directamente desde el hook useSystemStream en App.jsx
const AlphaMutationView = ({ eventData }) => {
  
  // Datos de Respaldo (Fallback) por si la base de datos no tiene contenido
  const defaultEvent = {
    title: "EVENTO CRÍTICO EN DESARROLLO",
    description: "Sincronizando información estratégica del Holding Digital... El Motor Gamma está operativo.",
    // Imagen de fondo dramática por defecto (Sobria y Gris)
    media_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1920&auto=format&fit=crop" 
  };

  // Usamos los datos reales o los de respaldo si están vacíos
  const content = eventData || defaultEvent;

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* LAYER 1: Fondo Cinemático (Imagen con Filtro) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-105 animate-subtle-pulse"
        style={{
          backgroundImage: `url(${content.media_url || defaultEvent.media_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) grayscale(100%)' // Efecto dramático: Desenfoque y Escala de Grises
        }}
      />

      {/* LAYER 2: Superposición de Gradiente (Overlay de Emergencia) */}
      {/* Crea una viñeta oscura que resalta el texto y da sensación de crisis sobria */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-red-950/20 to-black opacity-90" />

      {/* LAYER 3: Contenido Principal - Monolítico y Centrado */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6 md:p-16 text-center">
        
        {/* Indicador Técnico de Alerta (Alta Visibilidad) */}
        <div className="flex items-center gap-3 mb-10 border border-red-500/50 px-8 py-3 rounded-full bg-red-950/40 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          <div className="h-3 w-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
          <span className="text-sm font-black text-red-100 uppercase tracking-[0.5em]">
            Alerta de Coyuntura - Alfa
          </span>
        </div>

        {/* TÍTULO MONUMENTAL (El mensaje que usted escribe) */}
        {/* Usamos tracking-tighter y leading-none para un efecto de bloque de texto macizo */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-8 max-w-7xl animate-mutation-entry">
          {content.title}
        </h1>

        {/* Línea divisoria de alta tensión */}
        <div className="h-1 w-32 bg-red-600 mb-10 rounded-full shadow-[0_0_25px_rgba(220,38,38,1)]"></div>

        {/* DESCRIPCIÓN O MENSAJE (El cuerpo del texto) */}
        {/* Font-light para contraste con el título y tracking-tight para elegancia */}
        <p className="text-xl md:text-2xl text-red-100 font-light max-w-4xl leading-relaxed tracking-tight animate-content-fade">
          {content.description}
        </p>

        {/* Indicador de procedencia agnóstico (Erradicación de Pacha) */}
        <footer className="absolute bottom-12 text-[10px] text-zinc-600 uppercase tracking-[0.8em]">
          Procedencia: Gamma Engine v3.0 // Holding Digital Root
        </footer>
      </main>
    </div>
  );
};

export default AlphaMutationView;