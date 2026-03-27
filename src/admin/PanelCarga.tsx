import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-client';
import Papa from 'papaparse';

const supabase = createClient('SU_URL', 'SU_KEY_ANON');

const PanelCarga = ({ clienteId }) => {
  const [datos, setDatos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  // 1. PROCESAR EL ARCHIVO (Excel convertido a CSV)
  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    Papa.parse(archivo, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setDatos(results.data);
        console.log("Datos listos para mapear:", results.data);
      }
    });
  };

  // 2. SUBIDA MASIVA A SUPABASE
  const ejecutarCarga = async () => {
    setSubiendo(true);
    
    // Mapeo dinámico: Transformamos las filas del Excel al esquema del SaaS
    const nodosParaSubir = datos.map(fila => ({
      cliente_id: clienteId,
      titulo_que: fila.nombre || fila.producto || fila.servicio,
      descripcion_como: fila.descripcion || fila.propuesta,
      url_media: fila.imagen_url,
      tipo_media: fila.tipo || 'imagen',
      // Todo lo demás se va al JSONB de metadatos
      metadatos: {
        precio: fila.precio,
        stock: fila.stock,
        categoria: fila.categoria,
        piso: fila.piso, // Para inmobiliaria
        estado: fila.estado
      }
    }));

    const { error } = await supabase.from('nodos_alfa').insert(nodosParaSubir);

    if (error) alert("Error en carga: " + error.message);
    else alert(`¡Éxito! ${nodosParaSubir.length} Nodos Alfa creados.`);
    
    setSubiendo(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white font-sans">
      <h2 className="text-2xl font-bold mb-6">ADMINISTRADOR DE NODOS - VÍA 51</h2>
      
      <div className="border-2 border-dashed border-gray-700 p-10 rounded-xl text-center bg-gray-800/50">
        <input 
          type="file" 
          accept=".csv" 
          onChange={manejarArchivo}
          className="mb-4 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <p className="text-gray-500">Cargue el inventario (CSV) del cliente.</p>
      </div>

      {datos.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4">Previsualización de {datos.length} ítems</h3>
          <div className="max-h-60 overflow-y-auto bg-black p-4 rounded-lg border border-gray-700">
             <pre className="text-[10px] text-green-400">{JSON.stringify(datos[0], null, 2)}</pre>
          </div>
          <button 
            onClick={ejecutarCarga}
            disabled={subiendo}
            className="mt-6 w-full bg-blue-600 p-4 rounded-lg font-bold hover:bg-blue-500 transition-colors"
          >
            {subiendo ? "SINCRONIZANDO CON NODO ALFA..." : "LANZAR AL AIRE (CONEXIÓN SUPABASE)"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PanelCarga;
