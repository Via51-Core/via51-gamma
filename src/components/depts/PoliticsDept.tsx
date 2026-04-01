// path: src/components/depts/PoliticsDept.tsx
export const PoliticsDept = ({ config }: { config: any }) => (
  <div className="space-y-6 animate-in zoom-in-95 duration-700">
    <div className="w-full h-2 bg-white/5 overflow-hidden">
      <div className="h-full bg-cyan-500 w-[65%] shadow-[0_0_15px_cyan]" />
    </div>
    <div className="flex justify-between font-mono text-[10px]">
      <span>TERRITORIAL_REACH</span>
      <span className="text-cyan-400">65% / 100%</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {['DISTRITO_A', 'DISTRITO_B', 'DISTRITO_C'].map(d => (
        <div key={d} className="p-4 border border-white/5 text-center text-[10px] hover:bg-white/5 transition-all">
          {d}
        </div>
      ))}
    </div>
  </div>
);