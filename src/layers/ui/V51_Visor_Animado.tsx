/**
 * RUTA: src/layers/ui/V51_Visor_Animado.tsx
 * LUGAR: Comas, Lima, Perú
 * FECHA: 2026-04-04 | HORA: 13:30
 * INTENCIÓN: Activo del CORE - Visor Universal Adaptativo.
 */

import React, { useState, useEffect } from 'react';

interface V51VisorProps {
    slides: string[];
    frasePrincipal: string;
    fraseSecundaria: string;
    posicion?: 'left' | 'center' | 'right';
}

// IMPORTANTE: El nombre debe coincidir exactamente con la importación en App.tsx
export const V51_Visor_Animado: React.FC<V51VisorProps> = ({
    slides,
    frasePrincipal,
    fraseSecundaria,
    posicion = 'center'
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides]);

    const justifyConfig = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    };

    return (
        <div className={`flex h-screen w-full bg-[#050505] items-center p-4 md:p-12 ${justifyConfig[posicion]}`}>

            {/* Luz de Respiración (Efecto de profundidad) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0047AB]/10 via-transparent to-transparent pointer-events-none" />

            {/* CELULAR CENTRADO */}
            <div className="relative h-full aspect-[9/16] max-h-[85vh] bg-black shadow-[0_0_80px_rgba(0,71,171,0.4)] rounded-[3rem] border-[10px] border-zinc-900 overflow-hidden z-20">
                {slides.map((img, i) => (
                    <img
                        key={img}
                        src={img}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}

                {/* Marquee para Mobile */}
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-md py-4 lg:hidden">
                    <p className="animate-marquee-loop text-white text-[10px] tracking-widest uppercase">
                        {fraseSecundaria} • {fraseSecundaria}
                    </p>
                </div>
            </div>

            {/* TEXTOS LATERALES (Configurables por el Orquestador) */}
            <aside className="hidden lg:flex flex-col px-12 z-30 max-w-md">
                <h2 className="text-white text-4xl font-light border-l-4 border-[#0047AB] pl-6 mb-4 animate-reveal-right">
                    {frasePrincipal}
                </h2>
                <p className="text-white/40 font-mono text-xs uppercase tracking-[0.5em]">
                    Vía51 • Soberanía Tecnológica
                </p>
            </aside>
        </div>
    );
};