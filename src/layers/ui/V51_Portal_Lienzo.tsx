/**
 * RUTA: src/layers/ui/V51_Portal_Lienzo.tsx
 * LUGAR: Comas, Lima, Perú
 * FECHA: 2026-04-04 | HORA: 10:15
 * INTENCIÓN: Implementación del Motor Universal de Visualización (Lienzo Nivel 0). 
 * Mantiene verticalidad 9:16 al centro y expande flancos en horizontal. 
 * NO CONTIENE DATOS HARDCODEADOS.
 */

import React from 'react';

interface V51PortalProps {
    /** URL del recurso multimedia (video/imagen) de la noticia estelar */
    mediaUrl: string;
    /** Contenido dinámico para el flanco izquierdo (Modo Horizontal) */
    leftContent?: React.ReactNode;
    /** Contenido dinámico para el flanco derecho (Modo Horizontal) */
    rightContent?: React.ReactNode;
    /** Frase o etiqueta de estado (Opcional) */
    statusTag?: string;
}

export const V51_Portal_Lienzo: React.FC<V51PortalProps> = ({
    mediaUrl,
    leftContent,
    rightContent,
    statusTag = "COYUNTURA ACTIVA"
}) => {
    return (
        <div className="flex h-screen w-full bg-[#050505] overflow-hidden items-center justify-center">

            {/* ALA IZQUIERDA: Se activa en pantallas anchas (Landscape) */}
            <aside className="hidden lg:flex flex-1 h-full items-center justify-center p-10 animate-fade-in">
                <div className="w-full max-w-xs border-l-2 border-[#0047AB] pl-6 py-4">
                    <div className="text-[#0047AB] font-mono text-sm tracking-tighter opacity-80 mb-2">
                        NODO_ALFA_SYSTEM_DATA
                    </div>
                    <div className="text-white/90 text-lg leading-tight">
                        {leftContent}
                    </div>
                </div>
            </aside>

            {/* LIENZO CENTRAL: La "Noticia Estelar" (Celular) */}
            <section className="relative h-full aspect-[9/16] bg-black shadow-[0_0_80px_rgba(0,71,171,0.15)] z-20 overflow-hidden border-x border-white/5">

                {/* Notch/Sensor Visual Superior */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-zinc-800/50 rounded-full z-30" />

                {/* Renderizado de Media */}
                <video
                    key={mediaUrl} // Fuerza recarga si cambia el dominio
                    src={mediaUrl}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Overlay de Soberanía Nivel 0 */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none">
                    <div className="bg-[#0047AB] text-white px-4 py-1.5 rounded-sm shadow-lg">
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase">
                            {statusTag}
                        </span>
                    </div>
                </div>
            </section>

            {/* ALA DERECHA: Se activa en pantallas anchas (Landscape) */}
            <aside className="hidden lg:flex flex-1 h-full items-center justify-center p-10 animate-fade-in">
                <div className="w-full max-w-xs border-r-2 border-white/40 pr-6 py-4 text-right">
                    <div className="text-white/40 font-mono text-[10px] tracking-widest mb-2">
                        NODO_BETA_OPERATIONS
                    </div>
                    <div className="text-white/70 text-base italic font-light">
                        {rightContent}
                    </div>
                </div>
            </aside>

        </div>
    );
};