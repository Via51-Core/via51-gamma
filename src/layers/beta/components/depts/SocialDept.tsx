// Path: C:/via51_ecosistema/via51-nodo-central/src/components/depts/SocialDept.tsx
// Name: V51_Alpha_SocialDept_Refined
// Identity: Comas, Lima, Peru | 2026-03-31 19:35:12

import React from 'react';

export const SocialDept: React.FC = () => {
  const subNodes = [
    { title: 'Community_Manager', status: 'ONLINE', color: 'border-blue-500' },
    { title: 'Public_Relations', status: 'STANDBY', color: 'border-purple-500' },
    { title: 'Social_Impact', status: 'ACTIVE', color: 'border-cyan-500' }
  ];

  return (
    <section className="relative overflow-hidden p-1 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/5 shadow-2xl">
      <div className="bg-black/80 backdrop-blur-xl p-8 rounded-[14px]">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 uppercase italic">
              Social_Dept <span className="text-xs font-mono text-white/40 not-italic">V51.6</span>
            </h2>
            <p className="text-[10px] font-mono tracking-[0.3em] text-blue-500/80 mt-1 uppercase">
              Fractal Level: ALFA // Ecosystem: VIA51
            </p>
          </div>
          <div className="px-3 py-1 border border-blue-500/50 rounded-full text-[9px] font-bold text-blue-400 animate-pulse">
            PRIMARY_NODE
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subNodes.map((node) => (
            <div 
              key={node.title}
              className={`group relative p-6 border-l-2 ${node.color} bg-white/5 hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-4xl font-black italic">{node.title[0]}</span>
              </div>
              
              <span className="text-[10px] font-mono text-white/40 block mb-2 tracking-widest">
                SYSTEM_ACCESS // {node.status}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                {node.title.replace('_', ' ')}
              </h3>
              
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-transparent transition-all duration-700" />
            </div>
          ))}
        </div>

        <footer className="mt-12 flex items-center justify-between opacity-40">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[9px] font-mono uppercase tracking-tighter text-white">
              Connection: Stable | Sec_Level: RLS_ENFORCED
            </span>
          </div>
          <span className="text-[9px] font-mono italic text-white/50">Via51_Orchestration_v2.0</span>
        </footer>
      </div>
    </section>
  );
};

export default SocialDept;