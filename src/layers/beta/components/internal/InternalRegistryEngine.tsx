// ==========================================
// PATH: src/components/internal/InternalRegistryEngine.tsx
// COMPONENT: Classified Entity Engine (Input Mode)
// STANDARD: AG-Agnostic / Section Routing
// ==========================================
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const InternalRegistryEngine: React.FC<{ on_action_complete: () => void; on_abort: () => void }> = ({ on_action_complete, on_abort }) => {
  const [is_processing, set_is_processing] = useState(false);
  const [form, set_form] = useState({
    target_section: 'SECTION_BETA', // BETA = Desarrollo, GAMMA = Ciencia
    entity_class: 'PERSON_NATURAL',
    identity_label: '',
    content_phrase: ''
  });

  const execute_transaction = async (e: React.FormEvent) => {
    e.preventDefault();
    set_is_processing(true);

    try {
      const system_payload = {
        meta: { section: form.target_section },
        identity: { class: form.entity_class, label: form.identity_label },
        content: { phrase: form.content_phrase, timestamp: new Date().toISOString() }
      };

      const { error } = await supabase
        .from('sys_registry')
        .insert([{ 
          slug: `${form.target_section.toLowerCase()}-${Date.now()}`, 
          configuracion_json: system_payload 
        }]);

      if (error) throw error;
      on_action_complete();
    } catch (err) {
      console.error("TX_ERR:", err);
    } finally { set_is_processing(false); }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg w-full max-w-xl font-mono text-left">
      <header className="mb-6 border-b border-zinc-800 pb-4">
        <h2 className="text-white font-bold uppercase italic">Internal_Entity_Classify</h2>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Targeting System v51</span>
      </header>

      <form onSubmit={execute_transaction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] text-zinc-500 uppercase">Target_Section</label>
            <select 
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-2 rounded-sm outline-none focus:border-blue-500"
              value={form.target_section}
              onChange={e => set_form({...form, target_section: e.target.value})}
            >
              <option value="SECTION_BETA">BETA_DEVELOPMENT</option>
              <option value="SECTION_GAMMA">GAMMA_SCIENCE</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] text-zinc-500 uppercase">Entity_Class</label>
            <select 
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-2 rounded-sm outline-none focus:border-blue-500"
              value={form.entity_class}
              onChange={e => set_form({...form, entity_class: e.target.value})}
            >
              <option value="PERSON_NATURAL">PERSON</option>
              <option value="INSTITUTION_ORG">INSTITUTION</option>
            </select>
          </div>
        </div>

        <input 
          placeholder="IDENTITY_LABEL" 
          required 
          className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-sm outline-none"
          onChange={e => set_form({...form, identity_label: e.target.value})}
        />

        <textarea 
          placeholder="CONTENT_PHRASE" 
          required 
          className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-sm h-24 outline-none resize-none"
          onChange={e => set_form({...form, content_phrase: e.target.value})}
        />

        <div className="flex gap-2 pt-4">
          <button type="button" onClick={on_abort} className="flex-1 bg-zinc-800 text-zinc-400 py-3 text-xs uppercase font-bold">Abort</button>
          <button type="submit" disabled={is_processing} className="flex-1 bg-white text-black py-3 text-xs uppercase font-bold">
            {is_processing ? 'Committing...' : 'Commit_to_Section'}
          </button>
        </div>
      </form>
    </div>
  );
};