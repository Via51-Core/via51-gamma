/**
 * ARCHIVO: src/main.tsx
 * DESCRIPCIÓN: Punto de entrada absoluto. 
 * LIMPIEZA: Se purga cualquier enrutador viejo o llamado a V51_Screen_Engine.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Asegúrate de que esta sea la ruta correcta a tus estilos de Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);