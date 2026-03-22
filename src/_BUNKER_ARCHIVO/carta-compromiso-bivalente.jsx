import React, { useState } from 'react';

const carta-compromiso-bivalente = ({ datos }) => {
  const [firmado, setFirmado] = useState(false);

  const handleFirma = () => {
    // Aquí se conectaría con Supabase/Firebase en el futuro
    setFirmado(true);
    console.log(`Compromiso registrado para el candidato: ${datos.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest text-white">
        {datos.compromiso.titulo}
      </h2>
      
      <div className="bg-black/40 p-6 rounded-lg mb-6 text-sm leading-relaxed text-gray-200 border-l-4 border-blue-500">
        <p className="mb-4">
          Yo, ciudadano consciente de la realidad de <strong>{datos.geoContext.region}</strong>, 
          valido la solvencia técnica de <strong>{datos.nombre}</strong> basada en la 
          evidencia presentada ({datos.geoContext.evidenciaTecnica}).
        </p>
        <p>
          Me comprometo a actuar como <strong>Colaborante Activo</strong>, transformando 
          mi escepticismo inicial en vigilancia técnica participativa.
        </p>
      </div>

      {!firmado ? (
        <button 
          onClick={handleFirma}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
        >
          {datos.compromiso.cta}
        </button>
      ) : (
        <div className="text-center animate-bounce">
          <span className="text-green-400 font-bold text-xl">✓ COMPROMISO VINCULADO</span>
          <p className="text-[10px] mt-2 opacity-50">ID DE TRANSACCIÓN: V51-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default carta-compromiso-bivalente;