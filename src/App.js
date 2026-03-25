import React from 'react';
import PantallaAlfa from './components/Via51/PantallaAlfa';
import Pacha from './pages/Pacha'; 

function App() {
  // Detectamos si el usuario entró por pacha.via51.org o via51.org/pacha
  const isPacha = window.location.hostname.includes('pacha') || 
                  window.location.pathname.includes('pacha');

  return (
    <div className="App">
      {isPacha ? <Pacha /> : <PantallaAlfa />}
    </div>
  );
}

export default App;