/**
 * FUNCIÓN: Panel de Control Soberano (Aprobación Rápida)
 * LUGAR: /views/AdminControl.jsx
 * FECHA: 02-Abr-2026 | 15:50
 * DESCRIPCIÓN: Interfaz quirúrgica para moderación de interacciones en tiempo real.
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Basado en infraestructura Supabase activa

const AdminControl = () => {
    const [interactions, setInteractions] = useState([]);

    // Carga de interacciones pendientes
    const fetchPending = async () => {
        const { data } = await supabase
            .from('sys_interactions')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });
        setInteractions(data || []);
    };

    const handleAction = async (id, newStatus) => {
        const { error } = await supabase
            .from('sys_interactions')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setInteractions(prev => prev.filter(item => item.id !== id));
        }
    };

    useEffect(() => { fetchPending(); }, []);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Moderación Crítica</h2>

            {interactions.length === 0 && (
                <div className="text-center py-20 text-slate-400 text-sm">No hay mensajes pendientes de validación.</div>
            )}

            {interactions.map((item) => (
                <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-tighter">
                        {item.sender_name || 'Anónimo'}
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        "{item.content}"
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleAction(item.id, 'rejected')}
                            className="py-3 bg-white border border-red-100 text-red-500 rounded-xl font-bold text-xs uppercase hover:bg-red-50 transition-colors"
                        >
                            Descartar
                        </button>
                        <button
                            onClick={() => handleAction(item.id, 'approved')}
                            className="py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase shadow-lg shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-95"
                        >
                            Aprobar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminControl;
