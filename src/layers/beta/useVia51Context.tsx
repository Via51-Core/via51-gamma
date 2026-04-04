// path: src/hooks/useVia51Context.tsx
import { useEffect, useState } from 'react';
import { fetchNodeConfig } from '../lib/supabase';

export const useVia51Context = () => {
  const [node, setNode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNodeConfig()
      .then(setNode)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { node, loading, isAlpha: node?.tier === 'ALPHA' };
};