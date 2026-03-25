import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PantallaAlfa from './components/Via51/PantallaAlfa';
import Pacha from './pages/Pacha'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* URL normal y subdominios: muestra la web pública */}
        <Route path="/" element={<PantallaAlfa />} />
        
        {/* URL /pacha: muestra el panel de edición */}
        <Route path="/pacha" element={<Pacha />} />
      </Routes>
    </Router>
  );
}

export default App;