/**
 * FUNCIÓN: Conmutador Lógico de Nodo por Hostname
 * LUGAR: /core-tools/NodeSwitcher.jsx
 * FECHA: 02-Abr-2026 | 15:45
 * DESCRIPCIÓN: Detecta el subdominio para bifurcar la experiencia entre Ciudadano y Propietario.
 */

import React, { useEffect, useState } from 'react';
import PublicFeed from '../views/PublicFeed';
import AdminControl from '../views/AdminControl';

const NodeSwitcher = () => {
    const [nodeType, setNodeType] = useState('loading');

    useEffect(() => {
        const hostname = window.location.hostname;

        // Lógica de detección de soberanía
        if (hostname.startsWith('gamma.')) {
            setNodeType('GAMMA');
        } else {
            setNodeType('ALFA');
        }
    }, []);

    if (nodeType === 'loading') return null;

    return (
        <>
            {nodeType === 'GAMMA' ? <AdminControl /> : <PublicFeed />}
        </>
    );
};

export default NodeSwitcher;