import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PantallaAlfa from './components/Via51/PantallaAlfa';
import Pacha from './pages/Pacha'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PantallaAlfa />} />
        <Route path="/pacha" element={<Pacha />} />
      </Routes>
    </Router>
  );
}

export default App;