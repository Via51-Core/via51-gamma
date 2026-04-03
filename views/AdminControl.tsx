/**
 * FUNCIÓN: Panel de Control Estratégico (Nodo GAMMA)
 * LUGAR: /views/AdminControl.tsx
 * FECHA: 02-Abr-2026 | 18:15
 * DESCRIPCIÓN: Dashboard de moderación con analítica de sentimiento en tiempo real.
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import SentimentChart from '../components/charts/SentimentChart';
import { motion, AnimatePresence } from 'framer-motion';

interface Interaction {
    id: string;
    content: string;
    sender_name: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

const AdminControl: React.FC = () => {
    const [items, setItems] = useState<Interaction[]>([]);
    const [chartData, setChartData] = useState<{ time: string, volumen: number }[]>([]);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('sys_interactions')
            .select('*')
            .order('created_at', { ascending: true });

        if (!error && data) {
            setItems(data.filter(i => i.status === 'pending'));

            // Transformación de datos para la gráfica (Agrupado por minutos)
            const groups = data.reduce((acc: any, item) => {
                const time = new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                acc[time] = (acc[time] || 0) + 1;
                return acc;
            }, {});

            const formatted = Object.keys(groups).map(time => ({
                time,
                volumen: groups[time]
            }));
            setChartData(formatted);
        }
    };

    const handleAction = async (id: string, newStatus: 'approved' | 'rejected') => {
        const { error } = await supabase
            .from('sys_interactions')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) fetchData();
    };

    useEffect(() => {
        fetchData();
        // Suscripción Real-time para la gráfica
        const channel = supabase.channel('schema-db-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'sys_interactions' }, () => fetchData())
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-1">Métricas de Operación</h2>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Panel Gamma</h1>
            </header>

            {/* Gráfica de Sentimiento / Volumen */}
            <SentimentChart data={chartData} />

            <section className="space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cola de Moderación ({items.length})</h3>
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm"
                        >
                            <div className="flex justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter">{item.sender_name}</span>
                                <span className="text-[9px] font-mono text-slate-300">{new Date(item.created_at).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-slate-600 text-sm mb-5 leading-relaxed italic">"{item.content}"</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => handleAction(item.id, 'rejected')} className="py-3 text-[10px] font-bold uppercase bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all">Descartar</button>
                                <button onClick={() => handleAction(item.id, 'approved')} className="py-3 text-[10px] font-bold uppercase bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all">Aprobar</button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>
        </div>
    );
};

export default AdminControl;