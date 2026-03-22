// src/components/PantallaConvencido.js
import React from 'react';

const PantallaConvencido = () => {
  return (
    <div className="bg-slate-900 min-h-screen p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl border-8 border-purple-600/20">
        
        {/* ENCABEZADO MORADO */}
        <div className="bg-purple-800 p-8 text-center">
          <h2 className="text-white font-black tracking-[0.2em] text-sm uppercase">Nodo Político Vía 51</h2>
          <p className="text-purple-300 text-[10px] font-bold mt-1 uppercase">Mesías Guevara Liderazgo</p>
        </div>

        {/* CUERPO DEL ACUERDO */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase tracking-tighter">
            <div className="bg-purple-50 p-2 text-purple-900 rounded-md text-center border border-purple-100 italic">Presidente</div>
            <div className="bg-purple-50 p-2 text-purple-900 rounded-md text-center border border-purple-100 italic">Senadores</div>
            <div className="bg-purple-50 p-2 text-purple-900 rounded-md text-center border border-purple-100 italic">Diputados</div>
            <div className="bg-purple-50 p-2 text-purple-900 rounded-md text-center border border-purple-100 italic">P. Andino</div>
          </div>

          <div className="space-y-4">
            <input type="text" placeholder="Nombres y Apellidos" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-purple-600 transition-all outline-none" />
            <input type="text" placeholder="D.N.I. (8 dígitos)" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-purple-600 transition-all outline-none" />
            <input type="text" placeholder="WhatsApp" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-purple-600 transition-all outline-none" />
          </div>

          <button className="w-full py-5 bg-purple-900 hover:bg-purple-800 text-white rounded-3xl font-black italic uppercase text-sm shadow-xl transition-all active:scale-95 border-b-4 border-purple-950">
            Sellar Acuerdo Político
            <span className="block text-[8px] opacity-60 font-bold">Vía 51 | Mesías Guevara</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PantallaConvencido;