import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  Users, 
  Layers, 
  AlertTriangle, 
  Check, 
  Lock
} from 'lucide-react';
import { useApp } from '../services/stateService';
import { BlockchainTransaction, ProofDocument } from '../types';
import { generateTxHash, generateBlockNumber, generateWalletAddress } from '../services/blockchainService';
import { computeSHA256 } from '../services/cryptoService';

export const AdminControlsPage: React.FC = () => {
  const { role, setRole, projects, addTransaction, addProof, updateProjectProgress, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'record-allocation' | 'upload-proof' | 'update-progress' | 'review-flags'>('record-allocation');

  // Form states
  const [allocationForm, setAllocationForm] = useState({
    projectId: projects[0]?.id || '',
    category: 'Education Kits',
    amount: 15000,
    recipient: 'Vidya Education Supplies Pvt Ltd',
    reason: 'Supplementary STEM kits batch 3'
  });

  const [proofForm, setProofForm] = useState({
    projectId: projects[0]?.id || '',
    title: 'Site Delivery Verification Report',
    category: 'Audit Report' as const,
    fileName: 'ZP_School_Nandurbar_Site_Report_2026.pdf',
    vendorName: 'Independent District Auditor'
  });

  const [progressForm, setProgressForm] = useState({
    projectId: projects[0]?.id || '',
    reachedBeneficiaries: 185,
    impactScore: 93
  });

  const [flaggedItems, setFlaggedItems] = useState([
    {
      id: 'flag-01',
      invoiceId: 'INV-8821-DUP',
      vendor: 'EduSupplies North',
      amount: 18500,
      riskScore: 65,
      reason: 'Duplicate invoice flag + 48% deviation from historical baseline.',
      status: 'Under Review'
    }
  ]);

  const handleRecordAllocation = async (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === allocationForm.projectId) || projects[0];
    const txHash = generateTxHash();
    const blockNumber = generateBlockNumber();

    const tx: BlockchainTransaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      projectId: proj.id,
      projectName: proj.title,
      type: 'Allocation',
      amount: allocationForm.amount,
      fromAddress: proj.smartContractAddress,
      toAddress: generateWalletAddress(),
      txHash,
      blockNumber,
      timestamp: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      status: 'Verified',
      tamperEvidentReason: `Direct budget allocation of ₹${allocationForm.amount.toLocaleString('en-IN')} for ${allocationForm.category}.`,
      gasFeeMatic: '0.0031 MATIC',
      network: 'Polygon Amoy Testnet'
    };

    addTransaction(tx);
    showToast({
      type: 'success',
      title: 'Allocation Recorded On-Chain',
      message: `₹${allocationForm.amount.toLocaleString('en-IN')} allocated for ${allocationForm.category}.`,
      txHash
    });
  };

  const handleUploadProof = async (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === proofForm.projectId) || projects[0];
    const sampleDigest = await computeSHA256(proofForm.title + proofForm.fileName + Date.now().toString());
    const txHash = generateTxHash();
    const blockNumber = generateBlockNumber();

    const newProof: ProofDocument = {
      id: `proof-${Date.now().toString().slice(-4)}`,
      title: proofForm.title,
      category: proofForm.category,
      fileName: proofForm.fileName,
      fileSizeBytes: 340000,
      sha256Hash: sampleDigest,
      anchoredTxHash: txHash,
      blockNumber,
      timestamp: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      status: 'Verified',
      projectId: proj.id,
      vendorName: proofForm.vendorName,
      amountINR: 0
    };

    addProof(newProof);
    showToast({
      type: 'success',
      title: 'Proof Document Anchored',
      message: `SHA-256 hash committed to Polygon Amoy for ${proofForm.fileName}.`,
      txHash
    });
  };

  const handleUpdateProgress = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectProgress(progressForm.projectId, progressForm.reachedBeneficiaries, progressForm.impactScore);
  };

  const handleFlagAction = (id: string, action: 'approve' | 'reject') => {
    setFlaggedItems(prev => prev.filter(f => f.id !== id));
    showToast({
      type: action === 'approve' ? 'info' : 'warning',
      title: `Claim ${action === 'approve' ? 'Approved by Verifier' : 'Rejected & Escrow Held'}`,
      message: `Transaction ${id} updated on verification ledger.`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-500/20">
            <Building2 className="w-3.5 h-3.5" />
            Operations & Verifier Console
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            NGO Manager & Admin Portal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Programmatic actions for recording allocations, anchoring proof documents, and resolving flagged claims.
          </p>
        </div>

        {/* Role Toggle Switch */}
        <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex items-center gap-1 self-start md:self-auto">
          <button
            onClick={() => setRole('donor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              role === 'donor' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Donor View
          </button>
          <button
            onClick={() => setRole('ngo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              role === 'ngo' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NGO Manager
          </button>
          <button
            onClick={() => setRole('verifier')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              role === 'verifier' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin Verifier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
        {[
          { id: 'record-allocation', label: '1. Record Allocation', icon: <Layers className="w-4 h-4" /> },
          { id: 'upload-proof', label: '2. Anchor Proof Document', icon: <FileCheck2 className="w-4 h-4" /> },
          { id: 'update-progress', label: '3. Update Beneficiaries & Score', icon: <Users className="w-4 h-4" /> },
          { id: 'review-flags', label: `4. Review Flagged Claims (${flaggedItems.length})`, icon: <AlertTriangle className="w-4 h-4" /> },
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

      {/* Forms Area */}
      <div className="max-w-2xl mx-auto">
        {activeTab === 'record-allocation' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Layers className="w-4 h-4" />
              Record Milestone Budget Allocation
            </div>
            <p className="text-xs text-slate-400">
              Commit a budget expenditure to a milestone escrow sub-wallet on Polygon Amoy.
            </p>

            <form onSubmit={handleRecordAllocation} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Social Project</label>
                <select
                  value={allocationForm.projectId}
                  onChange={(e) => setAllocationForm(prev => ({ ...prev, projectId: e.target.value }))}
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.ngoName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category</label>
                  <input
                    type="text"
                    value={allocationForm.category}
                    onChange={(e) => setAllocationForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={allocationForm.amount}
                    onChange={(e) => setAllocationForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Recipient Vendor / Entity</label>
                <input
                  type="text"
                  value={allocationForm.recipient}
                  onChange={(e) => setAllocationForm(prev => ({ ...prev, recipient: e.target.value }))}
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Execute On-Chain Allocation Record</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'upload-proof' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <FileCheck2 className="w-4 h-4" />
              Anchor Cryptographic Proof Document
            </div>
            <p className="text-xs text-slate-400">
              Calculate client SHA-256 hash and anchor commitment into smart contract.
            </p>

            <form onSubmit={handleUploadProof} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Project</label>
                <select
                  value={proofForm.projectId}
                  onChange={(e) => setProofForm(prev => ({ ...prev, projectId: e.target.value }))}
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Proof Document Title</label>
                <input
                  type="text"
                  value={proofForm.title}
                  onChange={(e) => setProofForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category</label>
                  <select
                    value={proofForm.category}
                    onChange={(e) => setProofForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                  >
                    <option value="Invoice">Invoice</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Beneficiary Roster">Beneficiary Roster</option>
                    <option value="Audit Report">Audit Report</option>
                    <option value="Site Photo">Site Photo</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">File Name</label>
                  <input
                    type="text"
                    value={proofForm.fileName}
                    onChange={(e) => setProofForm(prev => ({ ...prev, fileName: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Vendor / Issuing Authority</label>
                <input
                  type="text"
                  value={proofForm.vendorName}
                  onChange={(e) => setProofForm(prev => ({ ...prev, vendorName: e.target.value }))}
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all mt-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Calculate SHA-256 & Anchor to Polygon Amoy</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'update-progress' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Users className="w-4 h-4" />
              Update Verified Beneficiary Progress
            </div>

            <form onSubmit={handleUpdateProgress} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Project</label>
                <select
                  value={progressForm.projectId}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, projectId: e.target.value }))}
                  className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Reached Beneficiaries</label>
                  <input
                    type="number"
                    value={progressForm.reachedBeneficiaries}
                    onChange={(e) => setProgressForm(prev => ({ ...prev, reachedBeneficiaries: parseInt(e.target.value, 10) || 0 }))}
                    className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Recalculated Impact Score</label>
                  <input
                    type="number"
                    value={progressForm.impactScore}
                    onChange={(e) => setProgressForm(prev => ({ ...prev, impactScore: parseInt(e.target.value, 10) || 0 }))}
                    className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold text-emerald-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all mt-2"
              >
                <Check className="w-4 h-4" />
                <span>Publish Verified Outcomes</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'review-flags' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Pending Flagged Claims</h3>
            {flaggedItems.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">All Clear!</div>
                <p>No anomaly-flagged transactions currently pending audit.</p>
              </div>
            ) : (
              flaggedItems.map((flag) => (
                <div key={flag.id} className="glass-panel p-5 rounded-2xl border border-rose-500/40 bg-rose-950/15 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-rose-300 font-bold">{flag.invoiceId}</span>
                    <span className="badge-risk-high px-2.5 py-0.5 rounded-full font-bold">
                      Risk Score: {flag.riskScore}/100
                    </span>
                  </div>

                  <div className="text-slate-300 space-y-1">
                    <div>Vendor: <strong className="text-white">{flag.vendor}</strong></div>
                    <div>Amount: <strong className="text-rose-400">₹{flag.amount.toLocaleString('en-IN')}</strong></div>
                    <div className="text-slate-400">{flag.reason}</div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleFlagAction(flag.id, 'approve')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                    >
                      Override & Approve
                    </button>
                    <button
                      onClick={() => handleFlagAction(flag.id, 'reject')}
                      className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors"
                    >
                      Reject & Freeze Escrow
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
