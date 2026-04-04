import React from 'react';
import { V51_Visor_Animado } from './layers/ui/V51_Visor_Animado';

function App() {
  // Activos listos para el despliegue
  const activos = [
    "/assets/img/ceo-lima.png",
    "/assets/img/corredor-morado.png"
  ];

  return (
    <div className="bg-black w-full h-screen overflow-hidden">
      <V51_Visor_Animado
        slides={activos}
        frasePrincipal="Liderazgo con Calidad Mundial."
        fraseSecundaria="Construyendo el Plan #1 para el Perú."
        posicion="center"
      />
    </div>
  );
}

export default App;