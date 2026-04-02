/**
 * FUNCIÓN: Punto de Entrada Principal (Main Engine)
 * LUGAR: /src/main.tsx
 * FECHA: 02-Abr-2026 | 18:05
 * DESCRIPCIÓN: Renderizado del Nodo ALFA con StrictMode de React.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Asegura que Tailwind esté cargado

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);