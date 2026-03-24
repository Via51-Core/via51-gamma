"use client";
import React, { useState, useEffect } from 'react';

export default function PantallaAlfa({ data }) {
  const [visitante, setVisitante] = useState({ city: 'LIMA', ip: 'DETECTANDO...' });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(info => setVisitante({ city: info.city, ip: info.ip }))
      .catch(() => setVisitante({ city: 'LIMA', ip: 'RADAR ACTIVO' }));
  }, []);

  const titulo = data?.titulo_que || "MESÍAS GUEVARA";
  const desc = data?.descripcion_como || "Liderazgo técnico y político para la transformación del Perú 2026.";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-4xl border border-yellow-500/20 rounded-[40px] p-16 text-center bg-black">
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.4em] text-yellow-500 uppercase font-black">
            {visitante.city} // {visitante.ip}
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-10">
          <span className="text-yellow-500">{titulo}</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 italic max-w-2xl mx-auto border-l-4 border-yellow-600/20 pl-6">
          "{desc}"
        </p>
      </main>
    </div>
  );
}