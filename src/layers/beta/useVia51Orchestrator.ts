// Path: C:/via51_ecosistema/via51-nodo-central/src/hooks/useVia51Orchestrator.ts
// Name: V51_Beta_Orchestrator_Hook
// Identity: Comas, Lima, Peru | 2026-03-31 19:24:40

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Importación corregida

export const useVia51Orchestrator = () => {
  const [node, setNode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Lógica de Resolución Fractal:
     * Identifica el subdominio para determinar si estamos en 
     * ALFA (Pol, FJ, Mesias) o GAMMA (Ard).
     */
    const resolveFractalLevel = () => {
      const host = window.location.hostname;
      if (host.startsWith('ard.')) return 'GAMMA_CONTROL';
      if (host.startsWith('pol.')) return 'ALFA_POLITICS';
      if (host.startsWith('fj.')) return 'ALFA_PRODUCTIVE';
      if (host.startsWith('mesias.')) return 'ALFA_CANDIDATE';
      return 'PORTAL_HUB';
    };

    setNode(resolveFractalLevel());
    setLoading(false);
    
    console.log(`V51_ORCHESTRATOR: Node Resolved as ${resolveFractalLevel()}`);
  }, []);

  return { node, loading, supabase };
};