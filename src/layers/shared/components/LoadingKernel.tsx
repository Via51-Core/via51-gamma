import React from 'react';

const LoadingKernel = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center">
    {/* Animación de Sincronización */}
    <div className="relative w-20 h-20 mb-6">
      <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-r-2 border-red-500/30 rounded-full animate-pulse"></div>
    </div>
    
    <div className="text-center">
      <h3 className="text-zinc-500 font-bold tracking-[0.5em] text-[10px] uppercase mb-2">
        Gamma Engine v3.0
      </h3>
      <p className="text-white/40 font-light text-[9px] uppercase tracking-widest">
        Sincronizando Pilares del Holding...
      </p>
    </div>
  </div>
);

export default LoadingKernel;
