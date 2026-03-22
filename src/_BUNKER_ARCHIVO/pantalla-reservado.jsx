import React, { useState } from 'react';

const PantallaReservado = () => {
  const [mostrarLista, setMostrarLista] = useState(false);

  // Data estratégica de los candidatos (Cifra Repartidora)
  const candidatos = [
    { n: 1, nombre: "Anfitrión N°1", perfil: "Estratega / Gestión Pública", expertise: "Garante del Proceso" },
    { n: 2, nombre: "Candidato Profesional", perfil: "Ingeniero / Infraestructura", expertise: "Ex-Gestor Regional" },
    { n: 3, nombre: "Candidata Técnica", perfil: "Economista / Salud", expertise: "Especialista en Presupuesto" },
  ];

  return (
    <div className="bg-white p-8 rounded-xl border-l-8 border-purple-500 shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-purple-700 text-white p-3 rounded-full font-bold text-xl">1</div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Habla el N°1 de la Lista</h2>
          <p className="text-sm text-slate-500">Garante de la Selección Técnica</p>
        </div>
      </div>

      <blockquote className="border-l-4 border-slate-200 pl-4 italic text-slate-600 mb-8">
        "Entiendo tu reserva. En política abundan los invitados de último minuto. Por eso, mi primer compromiso es presentarte a un equipo que ha pasado el mismo filtro que nuestro Plan #1. Aquí no hay favores, hay mérito."
      </blockquote>

      {!mostrarLista ? (
        <button 
          onClick={() => setMostrarLista(true)}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-lg transition-all"
        >
          REVISAR HOJAS DE VIDA (AUDITORÍA)
        </button>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold uppercase text-purple-700 tracking-widest">Cuadros Técnicos Confirmados:</h3>
          {candidatos.map((c) => (
            <div key={c.n} className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200">
              <div>
                <p className="font-bold text-slate-800">{c.n}. {c.nombre}</p>
                <p className="text-xs text-slate-500">{c.perfil} | {c.expertise}</p>
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">APTO</span>
            </div>
          ))}
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg text-center">
            <p className="text-sm text-purple-900 mb-4 font-medium">
              ¿Viste suficiente? Este es el equipo que cargará las andas del desarrollo.
            </p>
            <button className="text-purple-700 font-bold underline">
              CONFIRMAR QUE ESTE EQUIPO ES DE CALIDAD
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
          Validado por el Plan de Gobierno #1 (Videnza 16.5)
        </p>
      </div>
    </div>
  );
};

export default PantallaReservado;