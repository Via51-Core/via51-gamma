const MotorHolding = ({ tenantData }) => {
  // Eliminamos cualquier referencia a "Vía 51" en el HTML
  return (
    <div className="h-screen w-screen bg-black overflow-hidden font-sans select-none">
      {/* Marco dinámico sin marcas de agua */}
      <div className={`relative h-full w-full ${tenantData.layout === 'celular' ? 'max-w-md mx-auto border-x border-white/5' : ''}`}>
        
        {/* MEDIA LAYER */}
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src={tenantData.media_url} type="video/mp4" />
        </video>

        {/* CONTENIDO ESPECÍFICO DEL CLIENTE */}
        <div className="absolute bottom-10 left-0 w-full px-8 z-20">
          <h1 className="text-white text-6xl font-black uppercase leading-tight">
            {tenantData.titulo}
          </h1>
          <div className="mt-4 p-4 backdrop-blur-xl bg-black/30 rounded-lg border-l-4" 
               style={{ borderColor: tenantData.color_primario }}>
            <p className="text-white text-lg font-light italic">
              {tenantData.mensaje_fuerza}
            </p>
          </div>
        </div>

        {/* Solo mostramos créditos si el tenant lo permite (en política: OFF) */}
        {tenantData.mostrar_creditos && (
          <div className="absolute top-5 right-5 text-[8px] opacity-20 text-white">
            POWERED BY PACHA
          </div>
        )}
      </div>
    </div>
  );
};
