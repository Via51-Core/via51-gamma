/**
 * RUTA: src/layers/ui/V51_Lienzo_Adaptativo.tsx
 * LUGAR: Comas, Lima, Perú
 * FECHA: 2026-04-04 | HORA: 10:45
 * INTENCIÓN: Implementar el Portal Nivel 0. 
 * - Mobile Vertical: 100% Pantalla (Noticia Estelar).
 * - Desktop/Horizontal: Celular centrado con flancos de información.
 */

import React from 'react';

interface V51LienzoProps {
    mediaUrl: string;       // El video del Chaski / Candidato
    infoIzquierda: string;  // Frase "Primeros en calificaciones..."
    infoDerecha: string;    // Frase "Mover el piso..."
    tituloSeccion?: string; // Ej: "ELECCIONES 2026"
}

export const V51_Lienzo_Adaptativo: React.FC<V51LienzoProps> = ({
    mediaUrl,
    infoIzquierda,
    infoDerecha,
    tituloSeccion = "COYUNTURA NIVEL 0"
}) => {
    return (
        <div className="flex h-screen w-full bg-[#050505] overflow-hidden items-center justify-center selection:bg-[#0047AB]/30">

            {/* --- FLANCO IZQUIERDO (Solo visible en pantallas horizontales/grandes) --- */}
            <aside className="hidden lg:flex flex-1 h-full items-center justify-end px-12 z-10 animate-fade-in">
                <div className="max-w-xs text-right border-r-2 border-[#0047AB] pr-8 py-2">
                    <span className="text-[#0047AB] font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">
                        Status_Político
                    </span>
                    <h2 className="text-white text-2xl font-light leading-tight tracking-tight">
                        {infoIzquierda}
                    </h2>
                </div>
            </aside>

            {/* --- LIENZO CENTRAL: EL CELULAR (Protagonismo siempre) --- */}
            <section className="relative h-full w-full lg:w-auto lg:aspect-[9/16] bg-black shadow-[0_0_100px_rgba(0,71,171,0.2)] z-20 overflow-hidden">

                {/* Notch estético para reforzar la idea de celular */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#050505] rounded-b-2xl z-30 hidden lg:block" />

                {/* Media de la Noticia Estelar */}
                <video
                    src={mediaUrl}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Etiqueta de Identidad V51 */}
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
                    <div className="bg-[#0047AB] text-white px-6 py-1 shadow-lg shadow-blue-900/40">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase">
                            {tituloSeccion}
                        </span>
                    </div>
                    <span className="text-white/30 text-[8px] font-mono tracking-widest">
                        VÍA51_CORE_ENGINE_V2
                    </span>
                </div>
            </section>

            {/* --- FLANCO DERECHO (Solo visible en pantallas horizontales/grandes) --- */}
            <aside className="hidden lg:flex flex-1 h-full items-center justify-start px-12 z-10 animate-fade-in">
                <div className="max-w-xs text-left border-l-2 border-white/20 pl-8 py-2">
                    <span className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">
                        Acción_Directa
                    </span>
                    <p className="text-white/80 text-xl italic font-serif leading-snug">
                        "{infoDerecha}"
                    </p>
                </div>
            </aside>

        </div>
    );
};