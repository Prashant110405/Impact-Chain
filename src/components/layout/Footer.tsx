import React from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Lock, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-surface border-t border-slate-800 text-slate-400 text-sm mt-20">
      {/* Core Statement Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ImpactChain Product Mission
          </div>
          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
            “ImpactChain uses blockchain to make donation and fund-utilization records verifiable, AI to flag suspicious activity, and an Impact Score to show whether promised social outcomes were achieved.”
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Impact<span className="text-emerald-400">Chain</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decentralized integrity & outcome tracking for non-profit and social-impact initiatives.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Polygon Amoy Testnet (80002)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-emerald-400 transition-colors">
                  Explore Social Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fund-tracking')} className="hover:text-emerald-400 transition-colors">
                  Where Did The Money Go?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-verification')} className="hover:text-emerald-400 transition-colors">
                  AI Anomaly Detection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('proof-verification')} className="hover:text-emerald-400 transition-colors">
                  Document Integrity Checker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Donor Impact Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Integrity Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Integrity Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-300">Tamper-evident Ledger:</strong> Polygon smart contracts record fund movements.</span>
              </li>
              <li className="flex items-start gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-300">AI Risk Signals:</strong> Flags invoice duplicates and budget variances.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-300">Impact Score:</strong> 5-component weighted metric measuring physical outcomes.</span>
              </li>
            </ul>
          </div>

          {/* Responsible Positioning Disclaimers */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Positioning & Privacy
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>&bull; <strong className="text-slate-300">Tamper-Evident:</strong> Blockchain verifies historical consistency without claiming to eliminate human fraud.</li>
              <li>&bull; <strong className="text-slate-300">AI-Assisted:</strong> Hybrid rule & pattern engine for decision support.</li>
              <li>&bull; <strong className="text-slate-300">Privacy First:</strong> No sensitive beneficiary identity data is ever stored on-chain.</li>
              <li>&bull; <strong className="text-slate-300">Demo Prototype:</strong> Values are mock testnet instances for hackathon evaluation.</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ImpactChain Prototype &bull; Built for Blockchain for Social Impact Hackathon.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('how-it-works')} className="hover:text-slate-300 transition-colors">
              How It Works
            </button>
            <a 
              href="https://amoy.polygonscan.com" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <span>PolygonScan Amoy</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
