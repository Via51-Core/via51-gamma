import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, Download } from 'lucide-react';

const CartaReconocimientoBivalente = ({ alCerrar, emailUsuario }) => {
  const [autorizado, setAutorizado] = useState(false);
  const fecha = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

  // Simulación de validación de respaldo por email (Se activa al cargar)
  useEffect(() => {
    const timer = setTimeout(() => setAutorizado(true), 2500); // 2.5s de solemnidad
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#FDFCF0] max-w-2xl w-full p-8 md:p-12 border-t-[12px] border-purple-900 shadow-2xl relative font-serif text-slate-800 print:shadow-none print:border-none"
        >
          
          {/* Badge de Estado de Autorización (Oculto en impresión) */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-sans font-bold print:hidden">
            {autorizado ? (
              <>
                <CheckCircle size={14} className="text-green-600" />
                <span className="text-green-700">RESPALDO CONFIRMADO TÁCTICAMENTE</span>
              </>
            ) : (
              <>
                <Mail size={14} className="text-purple-600 animate-pulse" />
                <span className="text-purple-700">SOLICITANDO AUTORIZACIÓN A PRESIDENCIA...</span>
              </>
            )}
          </div>

          <div className="text-center mb-10 border-b border-slate-200 pb-6">
            <h1 className="text-2xl font-black uppercase text-purple-950 tracking-tighter">Certificado de Adherencia Bivalente</h1>
            <p className="text-[10px] font-sans font-bold text-slate-400 mt-1 uppercase tracking-widest">Partido Morado - Nodo Central Vía 51</p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-justify relative z-10">
            <p>
              Por la presente, la <strong>Plancha Presidencial del Partido Morado</strong>, en virtud de la autoridad conferida por la visión de desarrollo nacional y con el respaldo validado del email 
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-purple-900 mx-1">{emailUsuario || 'usuario@auditor.pe'}</span>, reconoce su adhesión voluntaria.
            </p>
            <p className="italic bg-slate-50 p-4 border-l-4 border-purple-900">
              "Usted ha identificado con precisión técnica la ubicación de nuestra propuesta en el último lugar de la cédula. Este acto lo acredita como <strong>Auditor Ciudadano de Calidad Mundial</strong> para la gestión que liderará el Perú hacia el desarrollo sostenible en una generación."
            </p>
          </div>

          {/* SECCIÓN DE FIRMAS BIVALENTES */}
          <div className="mt-16 grid grid-cols-2 gap-10 relative z-10 print:mt-12">
            
            {/* Firma Candidato (Con Efecto Tinta Fresca) */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-48 relative flex items-center justify-center border-b border-slate-300">
                <AnimatePresence>
                  {autorizado && (
                    <motion.img 
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      src="/assets/firma-mesias.png" 
                      alt="Firma Mesías Guevara" 
                      className="h-12 object-contain absolute bottom-1 print:h-10"
                    />
                  )}
                </AnimatePresence>
                {!autorizado && (
                   <span className="text-[9px] text-slate-300 font-sans uppercase animate-pulse">Esperando Sello</span>
                )}
              </div>
              <p className="text-[10px] font-sans font-black mt-2 uppercase tracking-wider">Mesías Guevara</p>
              <p className="text-[8px] font-sans text-slate-500 uppercase">Candidato Presidente</p>
            </div>

            {/* Firma Ciudadano (Huella Digital Simbólica) */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-48 border-b border-slate-300 flex items-center justify-center pb-1 relative">
                <CheckCircle className="text-purple-900/10" size={50} strokeWidth={1} />
                <span className="absolute bottom-1 font-mono text-[9px] text-purple-950/40">ID-AUDITOR-CONFIRMADO</span>
              </div>
              <p className="text-[10px] font-sans font-black mt-2 uppercase text-slate-400 italic">Sello Digital Citizen</p>
              <p className="text-[8px] font-sans text-slate-500 uppercase font-bold">Ciudadano Auditor</p>
            </div>
          </div>

          <p className="text-center text-[9px] text-slate-400 font-sans mt-8 uppercase print:mt-6">Emitido en Lima, Perú, el {fecha}.</p>

          {/* BOTONES DE ACCIÓN (Ocultos al imprimir) */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-center gap-4 print:hidden relative z-10">
            <button 
              onClick={() => window.print()} 
              className="flex items-center gap-2 border-2 border-slate-900 px-6 py-2.5 text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all rounded-sm"
            >
              <Download size={14} /> Descargar Copia
            </button>
            <button 
              onClick={alCerrar} 
              className="bg-purple-950 text-white px-8 py-2.5 text-[10px] font-black uppercase hover:bg-purple-800 transition-colors rounded-sm shadow-md"
            >
              Finalizar Proceso y Salir
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartaReconocimientoBivalente;