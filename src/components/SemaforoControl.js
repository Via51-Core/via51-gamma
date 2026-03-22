import React, { useState } from 'react';
import { CAMPAIGN_DATA } from '../data/JS/candidato-config';

const SemaforoControl = () => {
    const [verInterfaz, setVerInterfaz] = useState(true);

    // Layout Blindado
    const layout = {
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        backgroundColor: '#000',
        fontFamily: 'Arial, sans-serif'
    };

    return (
        <div style={layout}>
            {/* CAPA 1: EL CENIT (FONDO) */}
            <div style={{
                position: 'absolute', 
                width: '100%', 
                height: '100%', 
                backgroundImage: `url(${CAMPAIGN_DATA.assets.heroImage})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                zIndex: 1
            }} />

            {/* CAPA 2: BOTÓN RETORNO (FLOTANTE) */}
            {!verInterfaz && (
                <button 
                    onClick={() => setVerInterfaz(true)}
                    style={{
                        position: 'fixed', top: '30px', left: '30px', zIndex: 9999,
                        width: '65px', height: '65px', borderRadius: '50%',
                        backgroundColor: '#622d91', color: 'white', border: '3px solid white',
                        fontSize: '35px', cursor: 'pointer', fontWeight: 'bold',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.6)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    ←
                </button>
            )}

            {/* CAPA 3: INTERFAZ ALFA (CONTROL) */}
            {verInterfaz && (
                <div style={{
                    position: 'relative', zIndex: 10, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex',
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>
                        {CAMPAIGN_DATA.cenit.linea1}
                    </h1>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {CAMPAIGN_DATA.botones.map((btn) => (
                            <button 
                                key={btn.id} 
                                onClick={() => setVerInterfaz(false)}
                                style={{ 
                                    padding: '22px 55px', backgroundColor: btn.color, 
                                    color: 'white', border: 'none', borderRadius: '12px', 
                                    fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                                }}
                            >
                                {btn.etiqueta.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SemaforoControl;