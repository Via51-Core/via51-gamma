"use client";
import React, { useState, useEffect } from 'react';

export default function PantallaAlfa({ data }) {
  const [visitante, setVisitante] = useState({ city: 'LIMA', ip: '181.233.24.229' });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(info => setVisitante({ city: info.city, ip: info.ip }))
      .catch(() => setVisitante({ city: 'LIMA', ip: 'RADAR ACTIVO' }));
  }, []);

  const titulo = data?.titulo_que || "MESÍAS GUEVARA";
  const desc = data?.descripcion_como || "Liderazgo técnico y político para la transformación del Perú 2026.";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans italic">
      <main className="w-full max-w-4xl border border-yellow-500/20 rounded-[40px] p-16 text-center bg-black/50 backdrop-blur-xl">
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.4em] text-yellow-500 uppercase font-black">
            {visitante.city} // {visitante.ip}
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-yellow-400 to-yellow-600">
            {titulo}
          </span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto border-l-4 border-yellow-600/30 pl-6 leading-relaxed">
          "{desc}"
        </p>
      </main>
    </div>
  );
}