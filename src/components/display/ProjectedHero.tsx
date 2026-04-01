// src/components/display/ProjectedHero.tsx
import React from 'react';

export const ProjectedHero: React.FC<{ config: any }> = ({ config }) => {
  const { headline, rotation_speed = '10s' } = config;

  return (
    <div className="h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Frame que simula un dispositivo móvil en el centro */}
      <div className="w-[320px] h-[580px] border-2 border-zinc-800 rounded-[40px] relative flex items-center justify-center p-6 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        
        {/* Frase con animación de rotación/giro */}
        <div className="text-center">
          <h1 
            className="text-2xl font-black tracking-tighter uppercase animate-spin-slow"
            style={{ animationDuration: rotation_speed }}
          >
            {headline || "WAITING_FOR_DATA..."}
          </h1>
        </div>

        {/* Decoración estética de celular */}
        <div className="absolute top-4 w-20 h-1 bg-zinc-800 rounded-full"></div>
      </div>
    </div>
  );
};