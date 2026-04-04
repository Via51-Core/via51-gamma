/**
 * UI COMPONENT: V51_Visor_Animado
 * Función: Renderizado cíclico de activos visuales con transiciones suaves.
 * Capa: UI (Componente Atómico)
 */

import React, { useState, useEffect } from 'react';

interface VisorProps {
    slides: string[];
    frasePrincipal: string;
    fraseSecundaria: string;
    posicion?: 'left' | 'center' | 'right';
}

export const V51_Visor_Animado: React.FC<VisorProps> = ({
    slides,
    frasePrincipal,
    fraseSecundaria,
    posicion = 'center'
}) => {
    const [index, setIndex] = useState(0);

    // Ciclo de transición automática
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            {/* 1. CAPA DE IMAGEN (Soberanía Visual) */}
            {slides.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={`Slide ${i}`}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay de profundidad para legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
            ))}

            {/* 2. CAPA DE TEXTO (Capa Alfa inyectada) */}
            <div className={`absolute bottom-20 w-full px-10 flex flex-col z-10 
        ${posicion === 'center' ? 'items-center text-center' :
                    posicion === 'left' ? 'items-start text-left' : 'items-end text-right'}`}>

                <h2 className="text-white text-2xl font-bold tracking-tighter leading-none mb-2 uppercase italic">
                    {frasePrincipal}
                </h2>

                <div className="h-[2px] w-12 bg-v51-cobalt mb-3" />

                <p className="text-zinc-400 text-xs font-mono tracking-widest uppercase">
                    {fraseSecundaria}
                </p>
            </div>

            {/* 3. INDICADORES FRACTALES */}
            <div className="absolute bottom-8 w-full flex justify-center gap-2 z-10">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-[2px] transition-all duration-500 ${i === index ? 'w-8 bg-v51-cobalt' : 'w-2 bg-zinc-700'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};