/* Path: src/components/DataEntrySeed
   Name: DataEntrySeed
   Description: Generic data entry matrix for the Vía51 Axis (Political, Social, Productive).
   Compatibility: React 18+ / Vite
*/

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './DataEntrySeed.css';

const DataEntrySeed = ({ axis = 'General', slug = 'core_entry' }) => {
  const [entry, setEntry] = useState({
    title: '',
    content: '',
    metadata: {}
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: 'info', msg: 'Syncing with Gamma Engine...' });

    // Logical Upsert via Supabase
    const { error } = await supabase
      .from('core_nodes')
      .upsert({
        slug: slug,
        title: entry.title,
        description: entry.content,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' });

    setLoading(false);
    if (error) {
      setFeedback({ type: 'error', msg: `Error: ${error.message}` });
    } else {
      setFeedback({ type: 'success', msg: `✅ ${axis} Registry updated successfully.` });
      // Reset after success
      setTimeout(() => setFeedback({ type: '', msg: '' }), 3000);
    }
  };

  return (
    <div className="seed-container">
      <form className="seed-form" onSubmit={handleUpdate}>
        <header className="seed-header">
          <span className="axis-label">{axis.toUpperCase()} AXIS</span>
          <h2>Data Registry Seed</h2>
          <div className="separator"></div>
        </header>

        <div className="field-group">
          <label htmlFor="title">Reason of Being (Identity):</label>
          <input
            id="title"
            type="text"
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            placeholder="Define the purpose..."
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="content">Operational Transformation (Social/Prod):</label>
          <textarea
            id="content"
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            placeholder="Describe the action and impact..."
            rows="6"
            required
          />
        </div>

        <button className="sync-btn" type="submit" disabled={loading}>
          {loading ? 'PROCESSING...' : 'SYNC WITH ALFA OUTPUT'}
        </button>

        {feedback.msg && (
          <div className={`feedback-banner ${feedback.type}`}>
            {feedback.msg}
          </div>
        )}
      </form>
    </div>
  );
};

export default DataEntrySeed;
