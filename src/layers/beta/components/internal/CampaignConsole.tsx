// src/components/internal/CampaignConsole.tsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface CampaignConsoleProps {
  tenantId: string;
  currentConfig: any;
}

export const CampaignConsole: React.FC<CampaignConsoleProps> = ({ tenantId, currentConfig }) => {
  const [inputPhrase, setInputPhrase] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const updateNarrative = async () => {
    setIsUpdating(true);
    const updatedPhrases = [...(currentConfig.campaign_phrases || []), inputPhrase];
    
    const { error } = await supabase
      .from('sys_registry')
      .update({ 
        configuration: { ...currentConfig, campaign_phrases: updatedPhrases } 
      })
      .eq('id', tenantId);

    if (!error) setInputPhrase('');
    setIsUpdating(false);
  };

  return (
    <div className="p-4 border border-zinc-800 bg-zinc-950 font-mono">
      <h3 className="text-[10px] text-blue-500 font-bold mb-4 uppercase">NARRATIVE_INJECTOR_V1</h3>
      <div className="flex gap-2">
        <input 
          value={inputPhrase}
          onChange={(e) => setInputPhrase(e.target.value)}
          placeholder="ENTER_NEW_CAMPAIGN_PHRASE..."
          className="flex-1 bg-black border border-zinc-800 p-2 text-xs focus:border-white outline-none"
        />
        <button 
          onClick={updateNarrative}
          disabled={isUpdating}
          className="bg-white text-black px-4 py-2 text-[10px] font-black hover:bg-zinc-200 transition-all"
        >
          {isUpdating ? 'SYNCING...' : 'INJECT'}
        </button>
      </div>
    </div>
  );
};