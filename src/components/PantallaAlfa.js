/* Ruta: src/components/PantallaAlfa.js
Nombre: PantallaAlfa.js
*/

// Dentro del useEffect de suscripción:
const subscription = supabase
  .channel('cambios-alfa')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'nodos', filter: "slug=eq.pol" }, 
    (payload) => {
      console.log('Cambio detectado en ALFA:', payload.new);
      setNodo(payload.new); // Actualiza la UI instantáneamente
    }
  )
  .subscribe();