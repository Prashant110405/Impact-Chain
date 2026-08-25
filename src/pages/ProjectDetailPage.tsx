import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Lock, 
  FileText, 
  Layers, 
  Cpu, 
  ExternalLink,
  Calendar,
  Award
} from 'lucide-react';
import { useApp } from '../services/stateService';
import { formatHash } from '../services/cryptoService';
import { getExplorerUrl } from '../services/blockchainService';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
  onOpenDonateModal: (projectId: string) => void;
  onNavigate: (route: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBack,
  onOpenDonateModal,
  onNavigate
}) => {
  const { getProjectById, transactions, proofs } = useApp();
  const project = getProjectById(projectId) || getProjectById('proj-shiksha-01')!;

  const [activeTab, setActiveTab] = useState<'overview' | 'fund-tracking' | 'proofs' | 'ai-analysis' | 'updates'>('overview');

  const percentRaised = Math.round((project.raisedAmount / project.targetAmount) * 100);
  const percentBeneficiaries = Math.round((project.reachedBeneficiaries / project.targetBeneficiaries) * 100);

  const projectTransactions = transactions.filter(t => t.projectId === project.id);
  const projectProofs = proofs.filter(p => p.projectId === project.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects Directory</span>
      </button>

      {/* Main Project Header Card */}
      <div className="glass-panel rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-verified px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4" />
                Verified Non-Profit
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-xs font-mono">
                Contract: {formatHash(project.smartContractAddress, 6, 4)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1 font-semibold text-slate-200">
                <Building2 className="w-4 h-4 text-indigo-400" />
                {project.ngoName}
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-400">{project.ngoRegistration}</span>
              <span className="text-slate-500">&bull;</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {project.location}
              </span>
            </div>
          </div>

          {/* Right Action & Impact Score Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center min-w-[200px]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                Outcome Impact Score
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                <Award className="w-7 h-7 text-emerald-400" />
                <span>{project.impactScore}</span>
                <span className="text-sm font-normal text-slate-500">/100</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Verified Social Outcomes
              </span>
            </div>

            <button
              onClick={() => onOpenDonateModal(project.id)}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Donate to Project</span>
            </button>
          </div>
        </div>

        {/* 4 Core Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Funds Raised</span>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              ₹{project.raisedAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">
              {percentRaised}% of ₹{project.targetAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Beneficiaries Reached</span>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              {project.reachedBeneficiaries}
            </div>
            <span className="text-[11px] text-indigo-400 font-semibold">
              of {project.targetBeneficiaries} Target Students
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Project Completion</span>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              {percentBeneficiaries}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Phase 1 & 2 Completed
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">On-Chain Checkpoints</span>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              4 / 4
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">
              100% Cryptographically Anchored
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Funding Progress to Milestone 3</span>
            <span className="text-emerald-400 font-bold">{percentRaised}% Funded</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${percentRaised}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Overview & Story', icon: <FileText className="w-4 h-4" /> },
          { id: 'fund-tracking', label: 'Fund Tracking & Breakdown', icon: <Layers className="w-4 h-4" /> },
          { id: 'proofs', label: `Proofs & Hashes (${projectProofs.length})`, icon: <Lock className="w-4 h-4" /> },
          { id: 'ai-analysis', label: 'AI Anomaly Analysis', icon: <Cpu className="w-4 h-4" /> },
          { id: 'updates', label: 'Milestone Timeline', icon: <Calendar className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-emerald-400 text-emerald-400 bg-slate-900/60 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Story & Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white">About the Initiative</h3>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
                  {project.fullStory}
                </div>
              </div>

              {/* Fund Utilization Breakdown Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Fund Utilization Breakdown</h3>
                    <p className="text-xs text-slate-400">Total Approved Budget: ₹1,00,000</p>
                  </div>
                  <button
                    onClick={() => onNavigate('fund-tracking')}
                    className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Ledger</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {project.fundBreakdown.map((item) => (
                    <div key={item.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-200">{item.category}</span>
                        <span className="font-bold text-emerald-400">
                          ₹{item.spentAmount.toLocaleString('en-IN')}{' '}
                          <span className="text-slate-500 font-normal">/ ₹{item.allocatedAmount.toLocaleString('en-IN')}</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{item.description}</p>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(item.spentAmount / item.allocatedAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blockchain Status Checklist Side Column */}
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Blockchain Verification Status</h3>
                    <p className="text-[11px] text-slate-400">Polygon Amoy Testnet (80002)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {project.blockchainChecklist.map((chk, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                          {chk.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          {chk.label}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {chk.completed ? 'ANCHORED' : 'PENDING'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {chk.detail}
                      </p>
                      {chk.txHash && (
                        <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span>Tx: {formatHash(chk.txHash, 6, 4)}</span>
                          <a
                            href={getExplorerUrl(chk.txHash)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Score Component preview */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Impact Metrics</span>
                  <span className="text-emerald-400 font-bold">91/100</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Fund Utilization (25%)</span>
                    <span className="text-slate-200 font-semibold">95/100</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Beneficiary Verification (25%)</span>
                    <span className="text-slate-200 font-semibold">90/100</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Milestone Completion (20%)</span>
                    <span className="text-slate-200 font-semibold">85/100</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Proof Verification (15%)</span>
                    <span className="text-slate-200 font-semibold">100/100</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Spending Consistency (15%)</span>
                    <span className="text-slate-200 font-semibold">88/100</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  View Full Formula in Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fund-tracking' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Project Specific Transactions</h3>
              <button
                onClick={() => onNavigate('fund-tracking')}
                className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Open Full Fund Journey Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Type</th>
                      <th className="p-3.5">Amount / Details</th>
                      <th className="p-3.5">Transaction Hash</th>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {projectTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-semibold text-slate-200">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {tx.amount ? (
                            <span className="font-bold text-emerald-400">
                              ₹{tx.amount.toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-slate-300">{tx.quantityDescription}</span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">
                          <a
                            href={getExplorerUrl(tx.txHash)}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-indigo-300 underline"
                          >
                            {formatHash(tx.txHash, 6, 6)}
                          </a>
                        </td>
                        <td className="p-3.5 text-slate-400">{tx.timestamp}</td>
                        <td className="p-3.5">
                          <span className="badge-verified px-2 py-0.5 rounded-full font-semibold">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proofs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Anchored Proof Documents</h3>
                <p className="text-xs text-slate-400">Invoices, receipts, and beneficiary distribution proofs with SHA-256 hashes.</p>
              </div>
              <button
                onClick={() => onNavigate('proof-verification')}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-colors"
              >
                Test Document Hasher
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectProofs.map((proof) => (
                <div key={proof.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                      {proof.category}
                    </span>
                    <span className="badge-verified px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {proof.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{proof.title}</h4>
                  <p className="text-xs text-slate-400 font-mono truncate">{proof.fileName}</p>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                      SHA-256 Hash Anchor
                    </span>
                    <div className="font-mono text-xs text-emerald-400 break-all select-all">
                      {proof.sha256Hash}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Block #{proof.blockNumber}</span>
                    <span>{proof.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai-analysis' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 text-xs font-semibold mb-1 border border-purple-500/30">
                  <Cpu className="w-3.5 h-3.5" />
                  AI-Assisted Hybrid Anomaly Detection
                </div>
                <h3 className="text-lg font-bold text-white">Expense Anomaly Verification</h3>
              </div>
              <button
                onClick={() => onNavigate('ai-verification')}
                className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-colors self-start sm:self-auto"
              >
                Launch AI Risk Lab
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              All 4 vendor invoices for ShikshaSetu Batch 1 were analyzed by our automated signal checks. 
              No duplicate invoices, budget overruns, or historical price spikes were triggered (Overall Risk: LOW 0/100).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Invoice Duplication</span>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Passed (0 Flags)
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Budget Overrun Variance</span>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Passed (0% variance)
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Beneficiary Cost Ratio</span>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Passed (₹287/student)
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white">Milestone Execution Timeline</h3>
            <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {project.milestones.map((ms) => (
                <div key={ms.id} className="relative pl-9 space-y-2">
                  <div className={`absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-2 ${
                    ms.status === 'Completed' ? 'bg-emerald-400 border-slate-900' : 'bg-slate-800 border-indigo-400 animate-pulse'
                  }`}></div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white">{ms.title}</h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        ms.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        {ms.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-400 pt-1">
                      <div>
                        <span>Disbursed: </span>
                        <strong className="text-slate-200">₹{ms.completedAmount.toLocaleString('en-IN')}</strong> / ₹{ms.targetAmount.toLocaleString('en-IN')}
                      </div>
                      <div>
                        <span>Beneficiaries: </span>
                        <strong className="text-slate-200">{ms.reachedBeneficiaries}</strong> / {ms.targetBeneficiaries}
                      </div>
                      {ms.verifiedAt && (
                        <div>
                          <span>Verified: </span>
                          <strong className="text-emerald-400">{ms.verifiedAt}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
