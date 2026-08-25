import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Cpu, 
  BarChart3, 
  Coins, 
  FileCheck2, 
  Eye, 
  Users,
  Building2
} from 'lucide-react';
import { useApp } from '../services/stateService';

interface LandingPageProps {
  onNavigate: (route: string, projectId?: string) => void;
  onOpenDonateModal: (projectId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenDonateModal }) => {
  const { projects } = useApp();
  const featuredProject = projects[0]; // ShikshaSetu

  const demoMetrics = [
    { label: 'Funds Tracked', value: '₹10L+', subtext: 'On Polygon Amoy', icon: <Coins className="w-5 h-5 text-indigo-400" /> },
    { label: 'Social Projects', value: '25', subtext: 'Active nationwide', icon: <Building2 className="w-5 h-5 text-emerald-400" /> },
    { label: 'Beneficiaries', value: '5,000+', subtext: 'Directly reached', icon: <Users className="w-5 h-5 text-purple-400" /> },
    { label: 'Verified Records', value: '98%', subtext: 'Tamper-evident on-chain', icon: <ShieldCheck className="w-5 h-5 text-emerald-400" /> },
  ];

  const pillars = [
    {
      title: 'Blockchain = Trust',
      badge: 'Tamper-Evident Ledger',
      description: 'Every rupee donated is anchored into smart contracts on Polygon Amoy. Immutable receipts ensure allocations cannot be retroactively modified or hidden.',
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      color: 'from-indigo-900/40 to-slate-900/80 border-indigo-500/30'
    },
    {
      title: 'AI = Intelligence',
      badge: 'Hybrid Anomaly Engine',
      description: 'Automated pattern checks analyze vendor invoices, duplicate claims, budget variances, and historical averages before disbursement approval.',
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-900/40 to-slate-900/80 border-purple-500/30'
    },
    {
      title: 'Impact Score = Outcome',
      badge: 'Verifiable Results (0-100)',
      description: 'A 5-pillar mathematical score calculated from fund utilization, biometric beneficiary counts, milestone completion, and proof authenticity.',
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-900/40 to-slate-900/80 border-emerald-500/30'
    }
  ];

  const fundJourneySteps = [
    { label: '1. Donor', desc: 'Contributes in INR', icon: <Coins className="w-4 h-4" /> },
    { label: '2. Smart Contract', desc: 'Milestone escrow lock', icon: <Lock className="w-4 h-4" /> },
    { label: '3. Blockchain Record', desc: 'Polygon Amoy Tx', icon: <FileCheck2 className="w-4 h-4" /> },
    { label: '4. NGO Fund Use', desc: 'Procures supplies', icon: <Building2 className="w-4 h-4" /> },
    { label: '5. Proof Upload', desc: 'SHA-256 doc hash', icon: <FileCheck2 className="w-4 h-4" /> },
    { label: '6. AI Verification', desc: 'Anomaly risk check', icon: <Cpu className="w-4 h-4" /> },
    { label: '7. Impact Score', desc: 'Outcome evaluation', icon: <BarChart3 className="w-4 h-4" /> },
    { label: '8. Donor Dashboard', desc: 'Full transparency', icon: <Eye className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-r from-indigo-600/15 via-emerald-500/15 to-purple-600/15 blur-3xl pointer-events-none -z-10 rounded-full"></div>

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Hackathon theme pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-medium backdrop-blur-md shadow-lg shadow-indigo-950/40">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold">Hackathon Prototype</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-300">Blockchain for Social Impact</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Every Rupee. Every Impact.{' '}
            <span className="gradient-text-emerald block sm:inline">Verifiable.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Blockchain-powered transparency for social-impact funding. Tamper-evident fund records, AI-assisted anomaly detection, and real-world outcome scoring.
          </p>

          {/* Primary / Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 group transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Demo Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {demoMetrics.map((metric, i) => (
            <div
              key={i}
              className="glass-panel p-5 rounded-2xl border border-slate-800/90 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                  {metric.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {metric.value}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-400">&bull;</span>
                {metric.subtext}
              </div>
              <div className="absolute bottom-1 right-2 text-[9px] text-slate-600 uppercase tracking-widest font-mono">
                [Demo Data]
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Three Pillars of ImpactChain
          </h2>
          <p className="text-sm text-slate-400">
            A comprehensive integrity architecture combining cryptographic proofs, automated intelligence, and outcome verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-b ${pillar.color} border backdrop-blur-sm space-y-4 hover:scale-[1.02] transition-transform`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center shadow-lg">
                {pillar.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {pillar.badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Fund Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                End-to-End Traceability
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Visual Fund Journey
              </h2>
            </div>
            <button
              onClick={() => onNavigate('fund-tracking')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Explore Interactive Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Journey Steps Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {fundJourneySteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-indigo-500/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {step.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">
              Donor contributions are verifiable at every milestone with cryptographic proof hashes.
            </span>
          </div>
        </div>
      </section>

      {/* Featured Showcase: ShikshaSetu Foundation */}
      {featuredProject && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-surface to-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wide">
                    Featured Initiative
                  </span>
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified On-Chain
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {featuredProject.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredProject.shortDescription}
                </p>

                {/* Progress Indicators */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      Raised: <strong className="text-white">₹{featuredProject.raisedAmount.toLocaleString('en-IN')}</strong> / ₹{featuredProject.targetAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {Math.round((featuredProject.raisedAmount / featuredProject.targetAmount) * 100)}% Funded
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                      style={{ width: `${(featuredProject.raisedAmount / featuredProject.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Impact Score Box & Actions */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4 shrink-0 lg:w-72 text-center">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Verified Impact Score
                  </span>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    {featuredProject.impactScore}<span className="text-lg text-slate-500">/100</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    {featuredProject.reachedBeneficiaries} of {featuredProject.targetBeneficiaries} students reached
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onOpenDonateModal(featuredProject.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    Donate & Verify (₹100)
                  </button>

                  <button
                    onClick={() => onNavigate('project-detail', featuredProject.id)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    View Project Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
