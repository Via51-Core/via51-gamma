// Ubicación: src/components/NodeController.tsx (Resumen de lógica)

export const NodeController: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const { tenant } = useTenant();
  
  // Extraemos el nodo actual del mapa que subimos a Supabase
  const currentNode = tenant?.nodeTree?.[nodeId];

  if (!currentNode) return <div>Nodo no encontrado en el Archivador.</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{currentNode.data.label}</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Si es un nodo de audio, mostramos el reproductor */}
        {currentNode.type === 'audio_node' && (
          <audio controls src={currentNode.data.src} className="w-full" />
        )}

        {/* Si tiene hijos, renderizamos los botones de navegación (Nivel N) */}
        {currentNode.children?.map((childId: string) => (
          <button 
            key={childId}
            className="p-4 bg-slate-100 rounded border hover:bg-slate-200"
          >
            Abrir Gaveta: {tenant.nodeTree[childId]?.data.label}
          </button>
        ))}
      </div>
    </div>
  );
};