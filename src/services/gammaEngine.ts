/* Ruta: src/services/gammaEngine
   Nombre: gammaEngine
   Descripción: Motor lógico (Gamma) del Holding Digital Vía51.
   Gobierna la validación de los tres pilares.
*/

import supabase from '../supabaseClient';

const GammaEngine = {
  // 1. Lógica de "Modo Coyuntura"
  // Determina si Alfa debe mostrar los 3 pilares o dedicarse a un evento excepcional
  checkCoyuntura: async () => {
    const { data } = await supabase
      .from('configuracion_global')
      .select('modo_emergencia')
      .single();
    return data?.modo_emergencia || false;
  },

  // 2. Validador de Consistencia de Pilares
  // Gamma asegura que no se guarde información vacía que debilite el plano
  validarPilar: (datos) => {
    if (!datos.titulo_que || datos.titulo_que.length < 5) {
      throw new Error("El propósito (Título) es insuficiente para sostener el pilar.");
    }
    if (!datos.descripcion_como || datos.descripcion_como.length < 10) {
      throw new Error("La interrelación (Descripción) carece de sustancia técnica.");
    }
    return true;
  },

  // 3. Procesador de Sincronización
  // Ejecuta la transformación de Beta a Alfa pasando por los filtros de Gamma
  sincronizarNodo: async (slug, contenido) => {
    try {
      GammaEngine.validarPilar(contenido);
      
      const { data, error } = await supabase
        .from('nodos')
        .upsert({ 
          slug, 
          ...contenido,
          ultima_revision_gamma: new Date().toISOString() 
        }, { onConflict: 'slug' });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

export default GammaEngine;
