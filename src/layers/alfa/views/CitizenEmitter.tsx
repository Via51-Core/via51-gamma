/**
 * FUNCIÓN: Componente de Captación de Sentimiento (Nodo BETA - Ciudadano)
 * LUGAR: /views/CitizenEmitter.tsx
 * FECHA: 02-Abr-2026 | 18:15
 * DESCRIPCIÓN: Interfaz de entrada para el votante con validación de tipos y persistencia UUID.
 * ARQUITECTURA: React 18 + TypeScript + Framer Motion + Supabase.
 * OPERACIÓN: 12-A (Ecosistema Vía51)
 */

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * IDENTIFICADOR SOBERANO:
 * UUID v5 derivado de la cadena "12-A". 
 * Garantiza integridad referencial en la base de datos PostgreSQL.
 */
const OPERACION_UUID = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

// Definición de Esquema de Datos
interface InteractionForm {
    sender_name: string;
    content: string;
}

type NodeStatus = 'idle' | 'transmitting' | 'success' | 'error';

const CitizenEmitter: React.FC = () => {
    // Estado inicial del formulario
    const [fields, setFields] = useState<InteractionForm>({
        sender_name: '',
        content: ''
    });

    // Estado de flujo de red
    const [status, setStatus] = useState<NodeStatus>('idle');

    // Lógica de Validación (Fricción Cero)
    const isReady: boolean =
        fields.sender_name.trim().length >= 3 &&
        fields.content.trim().length >= 5;

    /**
     * Manejador de entrada de datos con tipado seguro
     */
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Envío de datos al Nodo Central (Supabase)
     */
    const dispatchInteraction = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        if (!isReady || status === 'transmitting') return;

        setStatus('transmitting');

        try {
            const { error } = await supabase
                .from('sys_interactions')
                .insert([
                    {
                        sender_name: fields.sender_name,
                        content: fields.content,
                        status: 'pending',
                        tenant_id: OPERACION_UUID
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFields({ sender_name: '', content: '' });

            // Retorno al estado de escucha tras 3 segundos
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error("[ERROR_NODO_BETA]: Fallo en transmisión", err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col min-h-[80vh] px-2 py-4 justify-between"
        >
            {/* Header de Propuesta */}
            <div className="space-y-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                    TU VOZ <br />
                    <span className="text-blue-600 uppercase">ES EL PUENTE.</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[280px]">
                    Envía tu idea. El Nodo Gamma validará tu mensaje para el muro público.
                </p>
            </div>

            {/* Formulario de Interacción */}
            <form onSubmit={dispatchInteraction} className="space-y-6 mt-8">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Identificación (Alias)
                    </label>
                    <input
                        name="sender_name"
                        type="text"
                        value={fields.sender_name}
                        onChange={handleInputChange}
                        placeholder="Ej. VecinoActivo_51"
                        disabled={status !== 'idle'}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-slate-800"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Propuesta de Mejora
                    </label>
                    <textarea
                        name="content"
                        rows={6}
                        value={fields.content}
                        onChange={handleInputChange}
                        placeholder="Escribe aquí tu visión..."
                        disabled={status !== 'idle'}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-slate-800 resize-none"
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.button
                        key={status}
                        type="submit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        disabled={!isReady || status === 'transmitting' || status === 'success'}
                        className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95
              ${status === 'success'
                                ? 'bg-green-500 text-white shadow-green-200'
                                : status === 'error'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 disabled:opacity-40 disabled:grayscale'
                            }`}
                    >
                        {status === 'idle' && 'Transmitir Propuesta'}
                        {status === 'transmitting' && 'Sincronizando Nodos...'}
                        {status === 'success' && '¡Mensaje en el Puente!'}
                        {status === 'error' && 'Fallo de Red - Reintentar'}
                    </motion.button>
                </AnimatePresence>
            </form>

            {/* Footer de Integridad Operativa */}
            <footer className="mt-12 flex flex-col items-center space-y-3">
                <div className="h-px w-12 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Soberanía de Datos: Nodo 12-A Activo
                    </span>
                </div>
            </footer>
        </motion.section>
    );
};

export default CitizenEmitter;