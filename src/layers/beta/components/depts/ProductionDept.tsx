// path: src/components/depts/ProductionDept.tsx
export const ProductionDept = ({ config }: { config: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="p-6 border border-white/10 bg-black/40 hover:border-purple-500/50 transition-colors">
      <h3 className="text-xs font-mono text-purple-400 mb-4 tracking-widest">ASSET_MAPPING</h3>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-sm text-gray-400">Parcela_00{i}</span>
            <span className="text-sm font-bold text-white">VALIDADO</span>
          </div>
        ))}
      </div>
    </div>
    
    <div className="p-6 border border-white/10 bg-black/40 flex flex-col justify-center items-center">
      <div className="text-5xl font-black text-white">{config?.roi || '12.4'}%</div>
      <div className="text-[10px] font-mono text-gray-500 mt-2">INDEXED_GROWTH_RATE</div>
    </div>
  </div>
);