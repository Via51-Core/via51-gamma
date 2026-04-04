// src/components/NodeController.tsx
import React, { useMemo } from 'react';
import { useTenant } from '../context/TenantContext';
import { NodeDispatcher } from './NodeDispatcher';

interface NodeControllerProps {
  nodeId: string;
  onNavigate: (id: string) => void;
  userLevel: number; // Obtenido de user_permissions.hierarchy_level
}

export const NodeController: React.FC<NodeControllerProps> = ({ nodeId, onNavigate, userLevel }) => {
  const { tenant } = useTenant();

  // Función de filtrado recursivo: Si el usuario no tiene nivel, el nodo y sus hijos mueren.
  const authorizedTree = useMemo(() => {
    if (!tenant?.nodeTree?.root) return null;

    const filterNodes = (node: any): any | null => {
      // Regla de Oro: Si el nivel del nodo es mayor al del usuario, se elimina.
      if (node.access_level > userLevel) return null;

      return {
        ...node,
        children: node.children
          ? node.children.map(filterNodes).filter((n: any) => n !== null)
          : []
      };
    };

    return filterNodes(tenant.nodeTree.root);
  }, [tenant, userLevel]);

  // Buscador de nodo actual dentro del árbol ya filtrado
  const currentNode = useMemo(() => {
    if (!authorizedTree) return null;
    
    const findNode = (node: any, id: string): any => {
      if (node.node_id === id) return node;
      for (const child of node.children || []) {
        const found = findNode(child, id);
        if (found) return found;
      }
      return null;
    };

    return findNode(authorizedTree, nodeId);
  }, [authorizedTree, nodeId]);

  if (!currentNode) return (
    <div className="p-10 text-[10px] text-zinc-500 uppercase animate-pulse">
      ERR_SCOPE_OUT_OF_BOUNDS: Nodo no encontrado o nivel insuficiente.
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8 border-b border-zinc-800 pb-4">
        <h2 className="text-xs text-blue-500 font-bold tracking-[0.2em] mb-1">
          LOCATION: {currentNode.node_id.toUpperCase()}
        </h2>
        <h1 className="text-2xl font-black">{currentNode.label}</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentNode.children.map((child: any) => (
          <div key={child.node_id} className="group">
            {child.node_type === 'category' ? (
              <button 
                onClick={() => onNavigate(child.node_id)}
                className="w-full text-left p-4 border border-zinc-800 hover:border-white transition-colors"
              >
                <span className="text-[9px] opacity-40 block mb-1">DIR_SUB_LEVEL</span>
                <span className="font-bold">{child.label}</span>
              </button>
            ) : (
              <NodeDispatcher 
                node={child} 
                userLevel={userLevel} 
                tenantId={tenant?.id || ''} 
              />
            )}
          </div>
        ))}
      </div>

      {nodeId !== 'root' && (
        <button 
          onClick={() => onNavigate('root')}
          className="mt-8 text-[10px] text-zinc-600 hover:text-white underline underline-offset-4"
        >
          RETURN_TO_ROOT
        </button>
      )}
    </div>
  );
};