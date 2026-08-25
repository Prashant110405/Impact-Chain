import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, BarChart3, RotateCcw } from 'lucide-react';
import { useApp } from '../../services/stateService';

interface DemoBannerProps {
  onNavigate: (route: string, projectId?: string) => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ onNavigate }) => {
  const { resetDemoData } = useApp();

  return (
    <div className="bg-gradient-to-r from-indigo-950/80 via-surface-lighter/70 to-emerald-950/80 border-b border-indigo-500/20 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
            Hackathon Demo Mode
          </span>
          <span className="hidden sm:inline text-slate-400">
            Simulated Polygon Amoy Testnet &bull; Prototype Test Data
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <span className="text-slate-400 hidden md:inline">Quick Demo Flow:</span>
          
          <button
            onClick={() => onNavigate('project-detail', 'proj-shiksha-01')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 transition-colors"
          >
            <span>1. Donate ₹100</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => onNavigate('fund-tracking')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <span>2. Track Funds</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => onNavigate('ai-verification')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 transition-colors"
          >
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>3. AI Anomaly Test</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => onNavigate('proof-verification')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>4. Tamper Check</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <BarChart3 className="w-3 h-3 text-emerald-400" />
            <span>5. Impact Score (91)</span>
          </button>

          <button
            onClick={resetDemoData}
            title="Reset to benchmark prototype data"
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors ml-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
