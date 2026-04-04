/**
 * FUNCIÓN: Feed Público de Interacciones (Nodo ALFA)
 * LUGAR: /views/PublicFeed.jsx
 * FECHA: 02-Abr-2026 | 16:05
 * DESCRIPCIÓN: Visualización pública de mensajes aprobados. Efecto 'Timeline'.
 */

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const PublicFeed = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchApproved = async () => {
            const { data } = await supabase
                .from('sys_interactions')
                .select('id, content, sender_name, created_at')
                .eq('status', 'approved') // RLS garantiza que esto es lo único accesible
                .order('created_at', { ascending: false });
            setMessages(data || []);
        };

        fetchApproved();

        // Suscripción en tiempo real para dinamismo en el Nodo ALFA
        const channel = supabase
            .channel('public_feed')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sys_interactions' }, fetchApproved)
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    return (
        <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">En Vivo: Propuestas Ciudadanas</h2>
            </div>

            {messages.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-200 rounded-full animate-ping" />
                    </div>
                    <p className="text-slate-400 text-xs italic">Esperando nuevas voces...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <article key={msg.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow animate-in slide-in-from-left-4 duration-500">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-slate-800">{msg.sender_name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {msg.content}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicFeed;