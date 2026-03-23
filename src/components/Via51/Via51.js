import React, { useState, useRef } from 'react';
import OPCIONES_CENIT from '../../config/via51'; 
import PantallaAlfa from './PantallaAlfa';
import PantallaCenit from './PantallaCenit';

const Via51 = () => {
  const [estado, setEstado] = useState({ pantalla: 'ALFA', config: null });
  const audioRef = useRef(null);

  const manejarSeleccion = (tipo) => {
    const seleccion = OPCIONES_CENIT[tipo];
    
    // Detener audio anterior si existe
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Crear la nueva instancia de audio
    const nuevoAudio = new Audio(seleccion.audio);

    // --- AJUSTE TÁCTICO DE AUDIO ---
    // Si seleccionamos el botón que lleva a Palacio de Gobierno (VERDE),
    // saltamos el silencio inicial. Ajuste el 7.5 según sea necesario.
    if (tipo === 'VERDE') {
      nuevoAudio.currentTime = 7.5; 
    }
    // -------------------------------

    audioRef.current = nuevoAudio;
    audioRef.current.play().catch(e => console.log("Audio en espera de interacción"));
    
    setEstado({ pantalla: 'CENIT', config: seleccion });
  };

  const retornar = () => {
    if (audioRef.current) { 
      audioRef.current.pause(); 
      audioRef.current.currentTime = 0; 
    }
    setEstado({ pantalla: 'ALFA', config: null });
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {estado.pantalla === 'ALFA' ? (
        <PantallaAlfa onSeleccionar={manejarSeleccion} />
      ) : (
        <PantallaCenit config={estado.config} onRetornar={retornar} />
      )}
    </div>
  );
};

export default Via51;