import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-client';

const supabase = createClient('SU_URL', 'SU_KEY_ANON');

const DashboardMetricas = () => {
  const [metricas, setMetricas] = useState([]);
  const [totalVisitas, setTotalVisitas] = useState(0);

  useEffect(() => {
    const fetchMetricas = async () => {
      // 1. Obtener conteo agrupado por cliente y ciudad
      const { data, error } = await supabase
        .from('radar_eventos')
        .select('cliente_id(nombre_comercial), ubicacion, dispositivo');

      if (data) {
        setTotalVisitas(data.length);
        // Procesamos los datos para la tabla de control
        const resumen = data.reduce((acc, curr) => {
          const nombre = curr.cliente_id.nombre_comercial;
          acc[nombre] = (acc[nombre] || 0) + 1;
          return acc;
        }, {});
        setMetricas(Object.entries(resumen));
      }
    };

    fetchMetricas();
    // Suscripción en tiempo real para ver los impactos mientras ocurren
    const sub = supabase.channel('radar-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'radar_eventos' }, 
      payload => fetchMetricas())
      .subscribe();

    return () => supabase.removeChannel(sub);
  }, []);

  return (
    <div className="p-8 bg-[#050505] min-h-screen text-white font-mono">
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">VÍA 51 | CONTROL DE TRÁFICO</h2>
          <p className="text-blue-500 text-xs mt-1">SISTEMA MULTI-TENANT ACTIVO</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-white">{totalVisitas}</p>
          <p className="text-[10px] opacity-50 tracking-widest uppercase font-bold">Impactos Totales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TABLA DE RENDIMIENTO POR CLIENTE */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 shadow-2xl">
          <h3 className="text-sm font-bold mb-6 opacity-40 uppercase tracking-widest">Performance por Cliente</h3>
          {metricas.map(([cliente, visitas]) => (
            <div key={cliente} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
              <span className="text-lg font-light">{cliente}</span>
              <div className="flex items-center gap-4">
                <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${(visitas/totalVisitas)*100}%` }} />
                </div>
                <span className="font-bold text-blue-400">{visitas}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MAPA DE CALOR LÓGICO (LOGS) */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold mb-6 opacity-40 uppercase tracking-widest">Últimas Detecciones (Radar)</h3>
          <div className="space-y-3 text-[10px]">
            {/* Aquí se listan los últimos 10 eventos con ciudad y hora */}
            <div className="p-2 bg-green-500/10 text-green-400 rounded border border-green-500/20">
              [20:15:30] IMPACTO DETECTADO: Lima, Miraflores - Dispositivo: iPhone
            </div>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
              [20:15:42] IMPACTO DETECTADO: Arequipa, Cercado - Dispositivo: Android
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricas;
