import heroImage from '../assets/ceo-lima.png';

export const CAMPAIGN_DATA = {
  assets: {
    heroImage: heroImage,
  },
  
  // Mensajes en el Cenit (Rozando la frente)
  cenit: {
    linea1: "EL ÚLTIMO EN LA CÉDULA DE VOTACIÓN",
    linea2: "PRIMERO EN LAS CALIFICACIONES",
    interpelacion: "Ante la evidencia... ¿Tú qué piensas? ¿Cómo te consideras?"
  },

  // La Tríada de Botones (Estilo CEO)
  botones: [
    { id: 'convencido', etiqueta: 'INDISCUTIBLE', subtexto: 'FIRMAR COMPROMISO', color: 'green' },
    { id: 'desconfiado', etiqueta: 'PUEDE SER', subtexto: 'VER DATA VIDENZA', color: 'blue' },
    { id: 'esceptico', etiqueta: 'DIFÍCIL', subtexto: 'PONER A PRUEBA', color: 'red' }
  ], // <--- LA COMA QUE CURA EL ERROR

  // Data de Auditoría del PDF de Videnza
  auditoria: {
    puntajeVidenza: "3.12",
    dimensiones: [
      { area: "Salud", nota: 3.40 },
      { area: "Educación", nota: 2.80 },
      { area: "Economía", nota: 3.10 },
      { area: "Seguridad", nota: 3.05 }
    ]
  }
};
