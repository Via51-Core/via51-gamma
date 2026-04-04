// Ubicación: src/services/MediaIngestor.ts
// Nombre: MediaIngestor Service (V51 Gamma Engine Standard)

import { supabase } from '../lib/supabaseClient'; 
import { SCHEMA } from '../lib/constants';

/**
 * MEDIA INGESTOR - SERVICIO DE INGESTA DE BINARIOS
 * Gestiona la subida de archivos al Storage (Bucket 'vault')
 * y prepara el objeto de datos para actualizar [sys_registry].
 */
export const ingestMedia = async (
  file: File, 
  nodeId: string, 
  type: 'audio' | 'video'
) => {
  // Obtenemos el slug desde las variables de entorno (Vite)
  const activeSlug = import.meta.env.VITE_DEV_CLIENT_SLUG || 'default';
  
  // 1. Generación de Ruta en Storage (Estructura Agnóstica)
  // Ruta resultante: vault/{slug}/{type}/{uuid}.ext
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${activeSlug}/${type}/${fileName}`;

  // 2. Subida del Binario al Bucket 'vault'
  const { error: storageError } = await supabase
    .storage
    .from('vault')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (storageError) {
    console.error("[Storage Error]:", storageError.message);
    throw storageError;
  }

  // 3. Obtención de URL Pública
  const { data: { publicUrl } } = supabase
    .storage
    .from('vault')
    .getPublicUrl(filePath);

  // 4. Preparación de Metadatos para el Nodo en [sys_registry]
  // Este objeto es el que luego se inyecta en 'arbol_nodos_json' via RPC o Update
  return {
    id: nodeId,
    type: `${type}_node`,
    data: {
      src: publicUrl,
      fileName: file.name,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      origin: SCHEMA.TABLES.ORGANIZATIONS // Referencia a la tabla de origen
    }
  };
};