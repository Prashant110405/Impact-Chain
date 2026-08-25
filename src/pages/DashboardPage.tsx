import React from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Coins, 
  Users, 
  CheckCircle2, 
  Award,
  PieChart,
  Info,
  Calendar
} from 'lucide-react';
import { SHIKSHA_IMPACT_SCORE_BREAKDOWN } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (route: string, projectId?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const formula = SHIKSHA_IMPACT_SCORE_BREAKDOWN;

  // Category breakdown for chart
  const categoriesData = [
    { label: 'Education Kits', amount: 70000, percent: 70, color: 'bg-emerald-400' },
    { label: 'Logistics & Transport', amount: 20000, percent: 20, color: 'bg-indigo-400' },
    { label: 'Distribution & Audit', amount: 10000, percent: 10, color: 'bg-purple-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <BarChart3 className="w-3.5 h-3.5" />
            Social Impact Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Impact & Transparency Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time multi-dimensional overview of funds, cryptographic proofs, and audited beneficiary outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('fund-tracking')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Fund Journey Map
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-colors"
          >
            Explore Projects
          </button>
        </div>
      </div>

      {/* 5 Top-Level Benchmark Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Funding</span>
            <Coins className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            ₹1,00,000
          </div>
          <span className="text-[11px] text-indigo-400 block font-medium">
            100% Escrow Allocated
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Verified Used</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            ₹87,400
          </div>
          <span className="text-[11px] text-slate-400 block font-medium">
            87.4% With On-Chain Proofs
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Beneficiaries</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            174 <span className="text-sm font-normal text-slate-500">/ 200</span>
          </div>
          <span className="text-[11px] text-purple-400 block font-medium">
            Biometrically Verified
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Completion</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            87%
          </div>
          <span className="text-[11px] text-teal-400 block font-medium">
            Milestones 1 & 2 Completed
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 col-span-2 lg:col-span-1 bg-emerald-950/20 border-emerald-500/30">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Impact Score</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            91<span className="text-sm text-slate-500">/100</span>
          </div>
          <span className="text-[11px] text-emerald-300 block font-semibold">
            Top Tier Transparency
          </span>
        </div>
      </div>

      {/* Middle Section: Impact Score Formula Card + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Transparent Impact Score Formula Box */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Transparent Impact Score Formula
                </h2>
                <p className="text-xs text-slate-400">Weighted Mathematical Model (0–100)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-400">{formula.finalScore}</span>
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>

          {/* 5 Weighted Components Breakdown */}
          <div className="space-y-3.5 text-xs">
            {/* 1. Fund Utilization */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  1. Fund Utilization (25% Weight)
                </span>
                <span className="font-bold text-emerald-400">95 / 100 &bull; Contribution: 23.75 pts</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">Funds disbursed strictly in alignment with smart contract milestone escrow.</span>
            </div>

            {/* 2. Beneficiary Verification */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  2. Beneficiary Verification (25% Weight)
                </span>
                <span className="font-bold text-emerald-400">90 / 100 &bull; Contribution: 22.50 pts</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">174 of 200 student recipients verified with biometric attendance logs.</span>
            </div>

            {/* 3. Milestone Completion */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  3. Milestone Completion (20% Weight)
                </span>
                <span className="font-bold text-indigo-400">85 / 100 &bull; Contribution: 17.00 pts</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">2 of 3 milestones fulfilled on schedule with verified vendor receipts.</span>
            </div>

            {/* 4. Proof Verification */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  4. Proof Verification (15% Weight)
                </span>
                <span className="font-bold text-emerald-400">100 / 100 &bull; Contribution: 15.00 pts</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">100% of invoices match on-chain SHA-256 hashes with 0 tamper flags.</span>
            </div>

            {/* 5. Spending Consistency */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  5. Spending Consistency (15% Weight)
                </span>
                <span className="font-bold text-indigo-400">88 / 100 &bull; Contribution: 13.20 pts</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">Category unit costs fall squarely within regional historical benchmarks.</span>
            </div>
          </div>

          {/* Mathematical Formula Sum & Disclaimer */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span>Final Impact Score:</span>
              <span className="font-bold text-emerald-400">
                23.75 + 22.50 + 17.00 + 15.00 + 13.20 = 91.45 &rarr; 91/100
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Decision-Support Metric:</strong> The Impact Score provides verifiable programmatic assurance of milestone execution, not a legal guarantee of real-world socio-economic impact.
              </span>
            </div>
          </div>
        </div>

        {/* Charts & Breakdown Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Chart 1: Fund Allocation by Category */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-400" />
                Fund Allocation by Category
              </h3>
              <span className="text-[11px] text-slate-400">Total: ₹1,00,000</span>
            </div>

            {/* Stacked Percentage Bar */}
            <div className="space-y-3">
              <div className="w-full h-5 bg-slate-900 rounded-xl overflow-hidden flex p-0.5 border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-l-lg transition-all" style={{ width: '70%' }} title="Education Kits 70%"></div>
                <div className="bg-indigo-500 h-full transition-all" style={{ width: '20%' }} title="Transport 20%"></div>
                <div className="bg-purple-500 h-full rounded-r-lg transition-all" style={{ width: '10%' }} title="Distribution 10%"></div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {categoriesData.map((cat, i) => (
                  <div key={i} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                      <span className="text-[11px] text-slate-400 truncate">{cat.label}</span>
                    </div>
                    <div className="font-bold text-white text-sm">
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500">{cat.percent}% allocation</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 2: Milestone Progress Tracker */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Milestone Execution Progress
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold">2 of 3 Completed</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">Milestone 1: Kit Procurement (70 Kits)</span>
                </div>
                <span className="badge-verified px-2 py-0.5 rounded text-[10px] font-bold">₹35,000 Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">Milestone 2: School Distribution (104 Kits)</span>
                </div>
                <span className="badge-verified px-2 py-0.5 rounded text-[10px] font-bold">₹37,000 Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-400 animate-pulse"></div>
                  <span className="font-medium text-slate-300">Milestone 3: Final Batch (26 Kits)</span>
                </div>
                <span className="text-[10px] text-indigo-400 font-mono">₹28,000 In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
