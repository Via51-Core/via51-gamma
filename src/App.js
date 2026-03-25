import React from 'react';
import PantallaAlfa from './components/Via51/PantallaAlfa';
import Pacha from './pages/Pacha'; 

function App() {
  // El sistema detecta si estás en el subdominio de edición
  const hostname = window.location.hostname;
  const esPanelControl = hostname.includes('pacha');

  // Si el dominio es pacha.via51.org, entrega el editor. 
  // Si es via51.org o pol.via51.org, entrega la web pública.
  return (
    <>
      {esPanelControl ? <Pacha /> : <PantallaAlfa />}
    </>
  );
}

export default App;