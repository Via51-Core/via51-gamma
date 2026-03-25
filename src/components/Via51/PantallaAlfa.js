import React, { useState, useEffect } from 'react';

export default function PantallaAlfa({ data }) {
  const [visitante, setVisitante] = useState({ city: 'LIMA', ip: '...' });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(info => setVisitante({ city: info.city, ip: info.ip }))
      .catch(() => setVisitante({ city: 'LIMA', ip: 'RADAR ACTIVO' }));
  }, []);

  const titulo = data?.titulo_que || "MESÍAS GUEVARA";
  const desc = data?.descripcion_como || "Liderazgo técnico y político para la transformación del Perú 2026.";

  return (
    <div style={{backgroundColor:'black', color:'white', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', fontFamily:'sans-serif', padding:'20px'}}>
      <div style={{border:'1px solid rgba(234, 179, 8, 0.2)', borderRadius:'40px', padding:'60px', maxWidth:'800px'}}>
        <div style={{marginBottom:'40px'}}>
          <span style={{fontSize:'10px', letterSpacing:'4px', color:'#eab308', fontWeight:'900'}}>
            {visitante.city} // {visitante.ip}
          </span>
        </div>
        <h1 style={{fontSize:'clamp(3rem, 10vw, 5rem)', fontWeight:'900', textTransform:'uppercase', fontStyle:'italic', marginBottom:'40px'}}>
          <span style={{color:'#eab308'}}>{titulo}</span>
        </h1>
        <p style={{fontSize:'1.5rem', color:'#9ca3af', fontStyle:'italic', maxWidth:'600px', margin:'0 auto', borderLeft:'4px solid rgba(234, 179, 8, 0.2)', paddingLeft:'20px'}}>
          "{desc}"
        </p>
      </div>
    </div>
  );
}