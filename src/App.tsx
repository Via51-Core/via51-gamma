/**
 * FUNCTION: Main Application Entry Point
 * LOCATION: /src/App.tsx
 * DATE: 2026-04-03
 * TIME: 07:48:32
 * DESCRIPTION: Root component of the Operación 12-A. Implements a fractal 
 * UI structure that adapts to the detected NodeLevel.
 */

import React, { useEffect, useState } from 'react';
import { getExecutionNode, NodeLevel } from './core/context/NodeOrchestrator';

const App: React.FC = () => {
  const [node, setNode] = useState<{ level: NodeLevel; alias: string } | null>(null);

  useEffect(() => {
    const currentContext = getExecutionNode();
    setNode(currentContext);

    // Notify the system of successful initialization
    console.info(`%c Operación 12-A: Node ${currentContext.level} Online`, "color: #00ff00; font-weight: bold;");
  }, []);

  if (!node) return <div className="h-screen w-screen bg-black flex items-center justify-center text-white">Initializing Orbit...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Fractal UI Layout */}
      <header className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tighter uppercase">
          Ecosystem <span className="text-blue-500">{node.level}</span>
        </h1>
        <div className="text-xs font-mono text-slate-500">
          Node: {node.alias} | 2026-04-03
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Triad Representation (Level 2 Example) */}
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Political</h3>
            <p className="text-sm text-slate-400">Governance and consensus protocols.</p>
          </div>
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Social</h3>
            <p className="text-sm text-slate-400">Human interaction and identity layers.</p>
          </div>
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Productive</h3>
            <p className="text-sm text-slate-400">Value generation and resource management.</p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-4 left-4 right-4 text-center text-[10px] text-slate-600 uppercase tracking-widest">
        Antigravity Philosophy | Sovereignty in Code
      </footer>
    </div>
  );
};

export default App;