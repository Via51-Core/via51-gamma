"use client";
import React, { useState, useEffect } from 'react';

export default function PantallaAlfa({ data }) {
  const [visitante, setVisitante] = useState({ city: 'LIMA', ip: '...' });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(info => setVisitante({ city: info.city, ip: info.ip }))
      .catch(() => setVisitante({ city: 'LIMA', ip: '181.233.24.229' }));
  }, []);

  return (
    <div style={{backgroundColor:'black', color:'white', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', fontFamily:'sans-serif'}}>
      <div style={{border:'1px solid #ca8a04', borderRadius:'40px', padding:'60px'}}>
        <p style={{color:'#eab308', fontSize:'12px', letterSpacing:'4px'}}>{visitante.city} // {visitante.ip}</p>
        <h1 style={{fontSize:'60px', fontWeight:'900'}}>{data?.titulo_que || "MESÍAS GUEVARA"}</h1>
        <p style={{fontSize:'24px', color:'#9ca3af', fontStyle:'italic'}}>"{data?.descripcion_como || "Liderazgo técnico y político."}"</p>
      </div>
    </div>
  );
}