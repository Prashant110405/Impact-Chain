import React from 'react';
import { 
  HelpCircle, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  BarChart3, 
  Building2, 
  Coins, 
  FileCheck2, 
  Layers, 
  Database, 
  UserX
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'NGO Registers Social Project',
      desc: 'Certified non-profits create verified project listings with milestone budgets, target beneficiaries, and smart contract escrow addresses.',
      icon: <Building2 className="w-5 h-5 text-indigo-400" />
    },
    {
      num: '02',
      title: 'Donor Contributes in INR',
      desc: 'Donors contribute micro-funds via standard UPI/INR or Web3 wallets. The transaction is instantly batched to Polygon Amoy.',
      icon: <Coins className="w-5 h-5 text-emerald-400" />
    },
    {
      num: '03',
      title: 'Donation Anchored on Blockchain',
      desc: 'An immutable tamper-evident receipt with transaction hash is generated on-chain, eliminating hidden or diverted pools.',
      icon: <Lock className="w-5 h-5 text-indigo-400" />
    },
    {
      num: '04',
      title: 'NGO Records Fund Allocations',
      desc: 'As supplies are procured (kits, transport, labs), expenditures are assigned to milestone budget categories under multisig rules.',
      icon: <Layers className="w-5 h-5 text-purple-400" />
    },
    {
      num: '05',
      title: 'Proof Invoices Hashed & Anchored',
      desc: 'Vendor invoices and biometric attendance sheets are hashed into SHA-256 digests and anchored into smart contract receipts.',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-400" />
    },
    {
      num: '06',
      title: 'AI-Assisted Anomaly Checks',
      desc: 'Pattern heuristics inspect submitted invoices against duplicate records, approved budget caps, and historical price spikes.',
      icon: <Cpu className="w-5 h-5 text-purple-400" />
    },
    {
      num: '07',
      title: 'Outcome Tracking & Impact Score',
      desc: 'Donors monitor live progress on the dashboard with our 5-factor mathematical Impact Score verifying physical social outcomes.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />
    }
  ];

  const onChainItems = [
    'Donation transaction records & amounts',
    'Fund allocation events to vendors',
    'Milestone definitions & completion states',
    'Unique project & contract identifiers',
    'Cryptographic SHA-256 proof hashes',
    'Block timestamps and gas receipts'
  ];

  const offChainItems = [
    'Original invoice PDF / image files',
    'Personally identifiable beneficiary names & photos',
    'Sensitive medical or biometric identity files',
    'High-resolution site media and videos',
    'Application caching & UI metadata'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Product Architecture & Workflow
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How ImpactChain Works
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            The complete lifecycle from micro-donation to cryptographic proof anchoring and outcome verification.
          </p>
        </div>

        <button
          onClick={() => onNavigate('projects')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all self-start md:self-auto"
        >
          Explore Live Projects
        </button>
      </div>

      {/* 7-Step Lifecycle Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">The 7-Step Transparency Lifecycle</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-slate-600 group-hover:text-indigo-400 transition-colors font-mono">
                  {step.num}
                </span>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What Goes On-Chain vs Off-Chain Comparison */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">
            What Goes On-Chain vs. Off-Chain?
          </h2>
          <p className="text-xs text-slate-400">
            Privacy-preserving Web3 design ensures verifiable integrity without exposing sensitive beneficiary identities on a public ledger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* On-Chain Column */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-300 font-bold text-base border-b border-slate-800 pb-3">
              <Lock className="w-5 h-5 text-indigo-400" />
              <span>ON-CHAIN (Polygon Amoy Testnet)</span>
            </div>
            <p className="text-xs text-slate-300">
              Immutable, publicly verifiable cryptographic proofs and state transitions:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {onChainItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Off-Chain Column */}
          <div className="bg-gradient-to-br from-slate-900 to-purple-950/30 p-6 rounded-2xl border border-purple-500/30 space-y-4">
            <div className="flex items-center gap-2.5 text-purple-300 font-bold text-base border-b border-slate-800 pb-3">
              <UserX className="w-5 h-5 text-purple-400" />
              <span>OFF-CHAIN (Privacy Protected Storage)</span>
            </div>
            <p className="text-xs text-slate-300">
              Private records kept off the public ledger to protect beneficiary dignity and GDPR/privacy compliance:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {offChainItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
