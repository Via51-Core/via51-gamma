/**
 * FUNCIÓN: Contenedor Maestro Universal (Mobile-First)
 * LUGAR: /src/components/layout/UniversalLayout.tsx
 * IDENTIDAD: V51-CORE | 03-Abr-2026
 * DESCRIPCIÓN: Implementa la estética de "Puente de Escucha" (Cobalto/Limpio).
 */

import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const UniversalLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex justify-center items-start antialiased font-sans">
            {/* Contenedor tipo App: Centrado en PC, Full width en Móvil */}
            <main className="w-full max-w-md min-h-screen bg-white shadow-2xl border-x border-slate-100 flex flex-col relative">

                {/* Header de Identidad Blanca/Limpia */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
                        <span className="font-bold tracking-tight text-slate-800 uppercase text-sm">Sistema Activo</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">NODE_ID: 12-A</div>
                </header>

                {/* Área de Contenido Dinámico */}
                <section className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
                    {children}
                </section>

                {/* Footer Minimalista */}
                <footer className="p-6 text-center">
                    <p className="text-[11px] text-slate-300 uppercase tracking-widest font-medium">
                        Infraestructura de Escucha Ciudadana
                    </p>
                    <p className="text-[9px] text-slate-200 mt-1 font-mono">V51.6_BETA_DEPLOY</p>
                </footer>
            </main>
        </div>
    );
};

export default UniversalLayout;