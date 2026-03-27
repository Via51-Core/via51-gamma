import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Ajusta la ruta si es necesario

interface AlphaProps {
  isOpen: boolean;
  pillar: string | null;
  onClose: () => void;
}

const AlphaMutationView: React.FC<AlphaProps> = ({ isOpen, pillar, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aquí iría tu lógica de insert en Supabase
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className={`alpha-mutation-overlay ${isOpen ? 'active' : ''}`}>
      <div className="form-semilla-card">
        <h3>MUTACIÓN: {pillar}</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="Propósito de la Semilla" required />
          <textarea placeholder="Marco Legal" rows={3} required />
          <input placeholder="Línea de Acción" required />
          
          <div className="form-actions">
            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? 'SINCRONIZANDO...' : 'INYECTAR'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>ABORTAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlphaMutationView;