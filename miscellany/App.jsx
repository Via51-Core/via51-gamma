/* Path: src/App.jsx
   Name: App.jsx - Vía51 Central Router
*/

import React, { useState } from 'react';
import DataEntrySeed from '../src/components/DataEntrySeed';
import './App.css';

function App() {
  const [activeAxis, setActiveAxis] = useState(null); // null = Navegación Global

  const axes = [
    { id: 'pol', name: 'Political', color: '#2563eb', label: 'Identity & Purpose' },
    { id: 'soc', name: 'Social', color: '#059669', label: 'Relationships & Community' },
    { id: 'prod', name: 'Productive', color: '#d97706', label: 'Transformation & Value' }
  ];

  const handleAxisClick = (axisId) => {
    setActiveAxis(axisId);
    // Trigger audio feedback (Musiquita de fondo / Pulse)
    const audio = new Audio('/assets/audio/axis_pulse.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio waiting for user interaction"));
  };

  return (
    <div className={`cosmos-container ${activeAxis ? 'immersion-active' : ''}`}>
      {!activeAxis ? (
        <nav className="global-nav">
          <header className="main-header">
            <h1>VÍA51</h1>
            <p>Hacia un desarrollo de calidad mundial</p>
          </header>
          <div className="axis-grid">
            {axes.map(axis => (
              <div 
                key={axis.id} 
                className="axis-card" 
                onClick={() => handleAxisClick(axis.id)}
                style={{ '--axis-color': axis.color }}
              >
                <div className="pulse-dot"></div>
                <h3>{axis.name}</h3>
                <span>{axis.label}</span>
              </div>
            ))}
          </div>
        </nav>
      ) : (
        <section className="axis-immersion">
          <button className="back-btn" onClick={() => setActiveAxis(null)}>← BACK TO COSMOS</button>
          {/* Aquí inyectamos la Semilla de Registro según el eje pulsado */}
          <DataEntrySeed 
            axis={axes.find(a => a.id === activeAxis).name} 
            slug={activeAxis} 
          />
        </section>
      )}
    </div>
  );
}

export default App;