import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Coins, 
  Building2, 
  Truck, 
  BookOpen, 
  Users,
  Search,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../services/stateService';
import { BlockchainTransaction } from '../types';
import { TransactionVerificationModal } from '../components/blockchain/TransactionVerificationModal';
import { formatHash } from '../services/cryptoService';
import { getExplorerUrl } from '../services/blockchainService';

export const FundTrackingPage: React.FC = () => {
  const { transactions } = useApp();
  const [selectedTx, setSelectedTx] = useState<BlockchainTransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenVerify = (tx: BlockchainTransaction) => {
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  const filteredTransactions = transactions.filter((tx: BlockchainTransaction) => {
    const matchesType = typeFilter === 'All' || tx.type === typeFilter;
    const matchesSearch = tx.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (tx.documentName && tx.documentName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-500/20">
            <Layers className="w-3.5 h-3.5" />
            Transparent Fund Allocation & Ledger
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Where Did The Money Go?
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track the end-to-end lifecycle of every rupee from donor wallet to field procurement and biometric distribution.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-medium self-start md:self-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Cryptographically Traceable</span>
        </div>
      </div>

      {/* Visual Funds Flow Interactive Diagram */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Funds Flow Architecture</h2>
            <p className="text-xs text-slate-400">ShikshaSetu Foundation &bull; Total Allocated: ₹1,00,000</p>
          </div>
          <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
            Smart Contract: 0x3F98...e912
          </span>
        </div>

        {/* Dynamic Visual Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Step 1: Donor Pool */}
          <div className="md:col-span-3 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-5 rounded-2xl border border-indigo-500/30 space-y-3 text-center md:text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                1. Total Inflow
              </span>
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ₹1,00,000
            </div>
            <p className="text-[11px] text-slate-300">
              Aggregated from 72 individual donors via Polygon Amoy micro-transactions.
            </p>
          </div>

          {/* Flow Connector Arrow */}
          <div className="md:col-span-1 flex justify-center text-slate-500 py-1 md:py-0">
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 text-indigo-400 shrink-0" />
          </div>

          {/* Step 2: NGO Escrow Wallet */}
          <div className="md:col-span-3 bg-gradient-to-br from-purple-950/60 to-slate-900 p-5 rounded-2xl border border-purple-500/30 space-y-3 text-center md:text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                2. NGO Multisig Escrow
              </span>
              <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              ShikshaSetu
            </div>
            <p className="text-[11px] text-slate-300">
              Locked in programmatic milestone contracts with 2-of-3 verifier multisig.
            </p>
          </div>

          {/* Flow Connector Arrow */}
          <div className="md:col-span-1 flex justify-center text-slate-500 py-1 md:py-0">
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 text-purple-400 shrink-0" />
          </div>

          {/* Step 3: Three Target Allocations */}
          <div className="md:col-span-4 space-y-2.5">
            {/* Education Kits */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/40 flex items-center justify-between hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Education Kits (70%)</h4>
                  <span className="text-[10px] text-slate-400">200 STEM kits + Solar lamps</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-emerald-400">₹70,000</span>
            </div>

            {/* Transport */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-indigo-500/30 flex items-center justify-between hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Transport (20%)</h4>
                  <span className="text-[10px] text-slate-400">Last-mile tribal logistics</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-indigo-300">₹20,000</span>
            </div>

            {/* Distribution & Volunteers */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-purple-500/30 flex items-center justify-between hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Distribution (10%)</h4>
                  <span className="text-[10px] text-slate-400">Field setup & biometric audit</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-purple-300">₹10,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction & Event Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">On-Chain Event Ledger</h2>
            <p className="text-xs text-slate-400">Real-time immutable log of donations, allocations, purchases, and distributions.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="pl-8 pr-3 py-1.5 bg-slate-900 rounded-lg border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Event Filter */}
            {['All', 'Donation', 'Allocation', 'Purchase', 'Distribution'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                  typeFilter === type
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Event Type</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Amount / Quantity</th>
                  <th className="p-4">Tx Hash</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTransactions.map((tx: BlockchainTransaction) => (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold inline-block">
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-200 block truncate max-w-[180px]">
                        {tx.projectName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {tx.id}
                      </span>
                    </td>
                    <td className="p-4">
                      {tx.amount ? (
                        <span className="font-extrabold text-emerald-400 text-sm">
                          ₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium">
                          {tx.quantityDescription}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-slate-400">
                      <a
                        href={getExplorerUrl(tx.txHash)}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-300 underline inline-flex items-center gap-1"
                      >
                        <span>{formatHash(tx.txHash, 6, 6)}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-4 text-slate-400 whitespace-nowrap">
                      {tx.timestamp}
                    </td>
                    <td className="p-4">
                      <span className="badge-verified px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenVerify(tx)}
                        className="py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-semibold text-xs transition-colors"
                      >
                        Verify Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <TransactionVerificationModal
        transaction={selectedTx}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
