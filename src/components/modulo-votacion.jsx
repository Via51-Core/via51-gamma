import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Fingerprint, MapPin } from 'lucide-react';

const ModuloVotacion = ({ alConfirmar, alCerrar }) => {
  const [votos, setVotos] = useState({ pres: false });
  const [datos, setDatos] = useState({
    nombre: '',
    dni: '',
    ubigeo_region: '',
    compromiso: 'PARETO_DESARROLLO_GENERACIONAL'
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md overflow-y-auto p-4 flex justify-center">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg overflow-hidden my-auto border-b-8 border-purple-900">
        
        <div className="bg-purple-950 text-white p-4 text-center">
          <h2 className="text-sm font-black tracking-widest uppercase">Registro de Auditor Ciudadano</h2>
          <p className="text-[10px] opacity-70">TABLA: pol_registro_ciudadano</p>
        </div>

        {/* FORMULARIO DE IDENTIFICACIÓN */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              name="nombre" placeholder="Nombre Completo" onChange={manejarCambio}
              className="w-full pl-10 pr-4 py-2 border-2 border-slate-100 focus:border-purple-500 outline-none text-sm uppercase font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Fingerprint className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                name="dni" placeholder="DNI" onChange={manejarCambio} maxLength={8}
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-100 focus:border-purple-500 outline-none text-sm font-mono"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                name="ubigeo_region" placeholder="Región" onChange={manejarCambio}
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-100 focus:border-purple-500 outline-none text-sm uppercase"
              />
            </div>
          </div>
        </div>

        {/* SIMULACIÓN DE CÉDULA (ÚLTIMO LUGAR) */}
        <div className="bg-slate-50 p-4 border-t border-slate-200">
          <p className="text-[9px] font-black text-slate-400 mb-3 text-center uppercase tracking-widest">Posición Final en Cédula</p>
          <div className="flex items-center justify-between bg-white p-4 border-2 border-slate-800 rounded">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-purple-900">PARTIDO MORADO</span>
              <span className="text-[8px] text-slate-500 uppercase">Plancha Presidencial</span>
            </div>
            <motion.div 
              onClick={() => setVotos({ pres: !votos.pres })}
              className="w-16 h-16 border-4 border-slate-900 bg-white flex items-center justify-center relative cursor-pointer"
            >
              <img src="/assets/logo-pm.png" className="w-10 h-10 opacity-80" alt="PM" />
              {votos.pres && (
                <span className="absolute text-6xl font-serif text-purple-900/80 leading-none select-none">X</span>
              )}
            </motion.div>
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN: REGISTRO Y SELLO */}
        {votos.pres && datos.nombre && datos.dni && (
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => alConfirmar(datos)}
            className="w-full bg-green-700 text-white font-black py-5 uppercase tracking-widest hover:bg-green-600 transition-colors"
          >
            Sellar Pacto Bivalente
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ModuloVotacion;