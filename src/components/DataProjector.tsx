// Path: C:/via51_ecosistema/via51-nodo-central/src/components/DataProjector.tsx
// Name: V51_Alpha_DataProjector_Core
// Identity: Comas, Lima, Peru | 2026-03-31 19:10:24

import React, { Suspense } from "react";
// Implementación de Lazy Loading para optimizar los nodos ALFA
const SocialDept = React.lazy(() => import("./depts/SocialDept"));
const PoliticsDept = React.lazy(() => import("./depts/PoliticsDept"));
const ProductionDept = React.lazy(() => import("./depts/ProductionDept"));

/**
 * Interface de Proyección de Departamentos
 * Gestiona la visibilidad según el contexto del nodo Alfa.
 */
interface DataProjectorProps {
  activeNode: 'SOCIAL' | 'POLITICAL' | 'PRODUCTIVE';
}

export const DataProjector: React.FC<DataProjectorProps> = ({ activeNode }) => {
  return (
    <div className="v51-projection-container bg-antigravity-900 min-h-screen">
      <Suspense fallback={<div className="animate-pulse text-white">Loading V51 Node...</div>}>
        {activeNode === 'SOCIAL' && <SocialDept />}
        {activeNode === 'POLITICAL' && <PoliticsDept />}
        {activeNode === 'PRODUCTIVE' && <ProductionDept />}
      </Suspense>
    </div>
  );
};

export default DataProjector;