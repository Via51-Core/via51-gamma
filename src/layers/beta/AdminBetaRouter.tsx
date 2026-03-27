import React, { useEffect } from 'react';
import { usePachaStream } from '../shared/hooks/usePachaStream';

export default function AdminBetaRouter() {
  // Invocamos el Hook con las credenciales que encontramos
  const { data, loading } = usePachaStream();

  useEffect(() => {
    if (!loading) {
      console.log("--- TEST DE CONEXIÓN VÍA51 ---");
      console.log("Estado: Nodo Central Sincronizado");
      console.log("Registros detectados en Pacha:", data.length);
      console.table(data); // Esto mostrará los datos en una tabla limpia en consola
    }
  }, [data, loading]);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#050505', color: '#00ff00', fontFamily: 'monospace', minHeight: '100vh' }}>
      <h1>CAPA BETA: MÓDULO DE INGRESO</h1>
      <hr border-color="#333" />
      <div style={{ marginTop: '1rem' }}>
        {loading ? (
          <p>Buscando pulso de Pacha...</p>
        ) : (
          <p>Conexión Exitosa. Se han detectado {data.length} nodos activos.</p>
        )}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '2rem' }}>
        Presione F12 y revise la pestaña "Console" para ver el ADN de los datos.
      </p>
    </div>
  );
}
