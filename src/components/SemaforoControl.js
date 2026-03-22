import React, { useState } from 'react';
import { CAMPAIGN_DATA } from '../data/JS/candidato-config';

const SemaforoControl = () => {
    const [estaOculto, setEstaOculto] = useState(false);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
            
            {/* 1. EL FONDO (PANTALLA CENIT) */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${CAMPAIGN_DATA.assets.heroImage})`,
                backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1
            }} />

            {/* 2. LA FLECHA DE RETORNO (Siempre presente pero solo visible en Cenit) */}
            <button 
                onClick={() => setEstaOculto(false)}
                style={{
                    position: 'fixed', top: '20px', left: '20px', zIndex: 9999,
                    width: '50px', height: '50px', borderRadius: '50%',
                    backgroundColor: 'white', color: 'black', border: 'none',
                    fontSize: '30px', cursor: 'pointer',
                    display: estaOculto ? 'flex' : 'none', // Solo aparece si está oculto
                    justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                }}
            >
                &#8592;
            </button>

            {/* 3. LA INTERFAZ (PANTALLA ALFA) */}
            <div style={{ 
                position: 'relative', zIndex: 10, width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                transition: 'all 0.5s ease',
                opacity: estaOculto ? 0 : 1,             // Se vuelve transparente
                pointerEvents: estaOculto ? 'none' : 'auto' // No se puede tocar si es transparente
            }}>
                <h1 style={{ color: 'white', textAlign: 'center', padding: '0 20px' }}>
                    {CAMPAIGN_DATA.cenit.linea1}
                </h1>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                    {CAMPAIGN_DATA.botones.map((btn) => (
                        <button 
                            key={btn.id} 
                            onClick={() => setEstaOculto(true)}
                            style={{ 
                                padding: '15px 40px', backgroundColor: btn.color, 
                                color: 'white', border: '2px solid rgba(255,255,255,0.2)', 
                                borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
                                minWidth: '250px'
                            }}
                        >
                            {btn.etiqueta}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SemaforoControl;ccc