import React from 'react';

const PillarOrchestrator = ({ political, social, productive }) => {
  const pillars = [
    { id: 'pol', label: 'Eje Político', data: political, color: 'border-blue-500' },
    { id: 'soc', label: 'Eje Social', data: social, color: 'border-red-500' },
    { id: 'pro', label: 'Eje Productivo', data: productive, color: 'border-green-500' }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {pillars.map((pillar) => (
        <section 
          key={pillar.id}
          className={`flex-1 flex flex-col items-center justify-center p-8 border-t-4 md:border-t-0 md:border-l-2 ${pillar.color} hover:bg-zinc-900 transition-all duration-500 group`}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4">
            Pilar de Desarrollo
          </span>
          <h2 className="text-2xl font-light tracking-widest uppercase mb-6 group-hover:scale-110 transition-transform">
            {pillar.label}
          </h2>
          
          <div className="text-center max-w-xs">
            <p className="text-zinc-400 text-sm leading-relaxed">
              {pillar.data?.description || "Sincronizando datos del eje..."}
            </p>
          </div>

          {/* Indicador visual de actividad */}
          <div className="mt-10 h-1 w-12 bg-zinc-800 group-hover:w-24 group-hover:bg-white transition-all"></div>
        </section>
      ))}
    </div>
  );
};

export default PillarOrchestrator;