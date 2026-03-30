// src/main.tsx

import React from 'react'; // <--- ESTO FALTA
import ReactDOM from 'react-dom/client';
import V51_Screen_Engine from './engines/V51_Screen_Engine';
import './index.css';

// Asegúrate de que no haya errores de sintaxis aquí
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <V51_Screen_Engine />
  </React.StrictMode>
);