import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PantallaAlfa from './components/Via51/PantallaAlfa';
import Pacha from './pages/Pacha'; // Asegúrate de que el archivo existe en src/pages/

function App() {
  return (
    <Router>
      <Routes>
        {/* La mesa pública */}
        <Route path="/" element={<PantallaAlfa />} />
        
        {/* El panel de edición */}
        <Route path="/pacha" element={<Pacha />} />
      </Routes>
    </Router>
  );
}

export default App;