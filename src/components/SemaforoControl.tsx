import React, { useState } from 'react';
import { CAMPAIGN_DATA } from '../data/JS/candidato-config';

const SemaforoControl = () => {
    const [alfaActiva, setAlfaActiva] = useState(true);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: '#000' }}>
            
            {/* CAPA 1: FONDO CENIT (SIEMPRE AL FONDO) */}
            <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backgroundImage: `url(${CAMPAIGN_DATA.assets.heroImage})`,
                backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1
            }} />

            {/* CAPA 2: FLECHA DE RETROCESO (APARECE SI ALFA SE LIMPIA) */}
            {!alfaActiva && (
                <div 
                    onClick={() => setAlfaActiva(true)} 
                    style={{
                        position: 'fixed', top: '30px', left: '30px', zIndex: 99999,
                        width: '60px', height: '60px', borderRadius: '50%',
                        backgroundColor: '#622d91', color: 'white', border: '3px solid white',
                        fontSize: '40px', cursor: 'pointer', fontWeight: 'bold',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: '0 0 25px rgba(0,0,0,0.8)'
                    }}
                >
                    &#8592;
                </div>
            )}

            {/* CAPA 3: INTERFAZ ALFA (BOTONES) */}
            {alfaActiva && (
                <div style={{
                    position: 'relative', zIndex: 100, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>
                        {CAMPAIGN_DATA.cenit.linea1}
                    </h1>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {CAMPAIGN_DATA.botones.map((btn) => (
                            <button 
                                key={btn.id} 
                                onClick={() => setAlfaActiva(false)} // LIMPIA ALFA Y PONE FLECHA
                                style={{ 
                                    padding: '20px 60px', backgroundColor: btn.color, 
                                    color: 'white', border: 'none', borderRadius: '12px', 
                                    fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer'
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
