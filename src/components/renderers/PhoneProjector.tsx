// src/components/renderers/PhoneProjector.tsx
import React, { useState, useEffect } from 'react';

interface PhoneProjectorProps {
  phrases: string[];
  rotationSpeed?: number;
}

export const PhoneProjector: React.FC<PhoneProjectorProps> = ({ phrases, rotationSpeed = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, rotationSpeed);
    return () => clearInterval(interval);
  }, [phrases, rotationSpeed]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      {/* Container con Aspect Ratio de Celular */}
      <div className="relative w-[320px] h-[580px] border-[6px] border-zinc-900 rounded-[40px] bg-zinc-950 overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 w-full h-10 flex justify-center items-end">
          <div className="w-20 h-4 bg-zinc-900 rounded-full"></div> {/* Notch Sim */}
        </div>
        
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="relative h-40 w-full flex items-center justify-center">
            {phrases.length > 0 ? (
              <h2 key={index} className="text-2xl font-black tracking-tighter leading-tight animate-in fade-in zoom-in duration-700 uppercase">
                {phrases[index]}
              </h2>
            ) : (
              <span className="text-[10px] text-zinc-700 animate-pulse">WAITING_FOR_DATA_STREAM...</span>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 w-full flex justify-center">
          <div className="w-10 h-1 bg-zinc-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};