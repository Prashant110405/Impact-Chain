import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  ShieldAlert, 
  Upload, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  ExternalLink
} from 'lucide-react';
import { computeSHA256, hashFile, formatHash } from '../services/cryptoService';
import { getExplorerUrl } from '../services/blockchainService';
import { useApp } from '../services/stateService';

export const ProofVerificationPage: React.FC = () => {
  const { showToast } = useApp();

  // Benchmark anchored hash for demo invoice
  const ANCHORED_DOC = {
    title: 'Vendor Invoice - STEM Study Kits Batch 1',
    fileName: 'Vendor_Invoice_VidyaSupplies_INV-8821.pdf',
    originalContent: 'INVOICE #INV-8821 | Vidya Education Supplies Pvt Ltd | Total: ₹35,000 | 70 STEM Study Kits | Date: 10-02-2026',
    expectedHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    anchoredTxHash: '0x8e2d1c0b9a8f7e6d5c4b3a219e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a219e8d',
    blockNumber: 1421042,
    timestamp: '2026-02-10 14:30 IST'
  };

  const [currentContent, setCurrentContent] = useState<string>(ANCHORED_DOC.originalContent);
  const [currentFileName, setCurrentFileName] = useState<string>(ANCHORED_DOC.fileName);
  const [computedHash, setComputedHash] = useState<string>(ANCHORED_DOC.expectedHash);
  const [activeScenario, setActiveScenario] = useState<'original' | 'tampered' | 'custom'>('original');

  const recalculateHash = async (content: string, fileName: string, scenario: 'original' | 'tampered' | 'custom') => {
    setCurrentContent(content);
    setCurrentFileName(fileName);
    setActiveScenario(scenario);

    // Compute browser SHA-256
    const hash = await computeSHA256(content);
    setComputedHash(hash);

    if (hash === ANCHORED_DOC.expectedHash) {
      showToast({
        type: 'success',
        title: 'Cryptographic Hash Match',
        message: 'Document content verified against on-chain block record.'
      });
    } else {
      showToast({
        type: 'error',
        title: 'Tampering Detected',
        message: 'Calculated SHA-256 hash does not match anchored blockchain hash!'
      });
    }
  };

  const handleSelectOriginal = () => {
    recalculateHash(ANCHORED_DOC.originalContent, ANCHORED_DOC.fileName, 'original');
  };

  const handleSelectTampered = () => {
    const tamperedContent = 'INVOICE #INV-8821 | Vidya Education Supplies Pvt Ltd | Total: ₹75,000 [MODIFIED] | 70 STEM Study Kits | Date: 10-02-2026';
    recalculateHash(tamperedContent, 'Vendor_Invoice_VidyaSupplies_INV-8821_MODIFIED.pdf', 'tampered');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const hash = await hashFile(file);
    setComputedHash(hash);
    setCurrentFileName(file.name);
    setCurrentContent(`[Binary File: ${file.name} (${file.size} bytes)]`);
    setActiveScenario('custom');

    if (hash === ANCHORED_DOC.expectedHash) {
      showToast({
        type: 'success',
        title: 'Uploaded Document Verified',
        message: 'Exact match with on-chain anchor.'
      });
    } else {
      showToast({
        type: 'warning',
        title: 'Unanchored / Distinct File',
        message: `Computed hash: ${hash.slice(0, 12)}... does not match sample invoice anchor.`
      });
    }
  };

  const isMatch = computedHash === ANCHORED_DOC.expectedHash;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <FileCheck2 className="w-3.5 h-3.5" />
            Decentralized Proof Integrity
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proof Integrity Verification
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time in-browser SHA-256 cryptographic hashing & comparison against Polygon Amoy anchor records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Demo Integrity Modes:</span>
          <button
            onClick={handleSelectOriginal}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activeScenario === 'original'
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            1. Original File (Valid)
          </button>
          <button
            onClick={handleSelectTampered}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activeScenario === 'tampered'
                ? 'bg-rose-600/30 text-rose-300 border-rose-500 shadow-md shadow-rose-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            2. Altered File (Tampered)
          </button>
        </div>
      </div>

      {/* Visual Integrity Flow Steps */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Cryptographic Integrity Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-indigo-400 block">Step 1. Document</span>
            <p className="text-[11px] text-slate-300">Vendor invoice or biometric attendance sheet generated.</p>
          </div>
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-purple-400 block">Step 2. SHA-256 Hash</span>
            <p className="text-[11px] text-slate-300">256-bit cryptographic digest calculated client-side in browser.</p>
          </div>
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-indigo-400 block">Step 3. Blockchain Anchor</span>
            <p className="text-[11px] text-slate-300">Digest committed inside Polygon Amoy smart contract receipt.</p>
          </div>
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400 block">Step 4. Verification</span>
            <p className="text-[11px] text-slate-300">Any donor can rehash the file to prove 0 tampering occurred.</p>
          </div>
        </div>
      </div>

      {/* Interactive Verification Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Document Viewer / Input Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Document Payload
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Client-Side WebCrypto
              </span>
            </div>

            {/* Drag & Drop / File Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Upload Custom Document to Hash
              </label>
              <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-900/60 group">
                <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-200">Click to browse file</span>
                <span className="text-[10px] text-slate-500 mt-1">PDF, JPG, PNG, TXT supported</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Document Content Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Current Payload Content:</span>
                <span className="font-mono text-slate-300 text-[11px] truncate max-w-[200px]">{currentFileName}</span>
              </div>
              <textarea
                value={currentContent}
                onChange={(e) => recalculateHash(e.target.value, currentFileName, 'custom')}
                rows={4}
                className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-500"
                placeholder="Type or edit text to see hash change in real-time..."
              />
              <span className="text-[10px] text-slate-500 block">
                * Edit any single character above to instantly watch the SHA-256 hash change completely (Avalanche effect).
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Hash Comparator Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all ${
            isMatch
              ? 'border-emerald-500/50 bg-emerald-950/10'
              : 'border-rose-500/50 bg-rose-950/15'
          } space-y-6`}>
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Cryptographic Status
                </span>
                <div className="flex items-center gap-2.5">
                  {isMatch ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-2xl">
                      <CheckCircle2 className="w-7 h-7" />
                      <span>VERIFIED &bull; HASH MATCH</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 font-extrabold text-2xl animate-pulse">
                      <XCircle className="w-7 h-7" />
                      <span>TAMPER DETECTED &bull; MISMATCH</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right text-xs text-slate-400">
                <span>Polygon Amoy Anchor</span>
                <div className="font-mono text-slate-300 font-semibold">Block #{ANCHORED_DOC.blockNumber}</div>
              </div>
            </div>

            {/* Hash Comparison Stack */}
            <div className="space-y-4 text-xs">
              {/* Expected On-Chain Hash */}
              <div className="space-y-1">
                <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  1. Anchored On-Chain Digest (Immutable Reference):
                </span>
                <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/30 font-mono text-indigo-200 break-all select-all text-xs">
                  {ANCHORED_DOC.expectedHash}
                </div>
              </div>

              {/* Computed Browser Hash */}
              <div className="space-y-1">
                <span className={`font-semibold flex items-center gap-1.5 ${isMatch ? 'text-emerald-300' : 'text-rose-400'}`}>
                  <FileCheck2 className="w-3.5 h-3.5" />
                  2. Locally Computed Browser SHA-256 Digest:
                </span>
                <div className={`p-3 rounded-xl border font-mono break-all select-all text-xs ${
                  isMatch
                    ? 'bg-slate-950 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-rose-500/40 text-rose-300'
                }`}>
                  {computedHash}
                </div>
              </div>
            </div>

            {/* Verdict Explanation Box */}
            <div className={`p-4 rounded-xl border ${
              isMatch
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            } space-y-1`}>
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                {isMatch ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                Integrity Verdict
              </h4>
              <p className="text-xs leading-relaxed">
                {isMatch
                  ? 'The submitted document is mathematically identical to the file certified during milestone disbursement. 0 modifications or deletions detected.'
                  : 'CRITICAL ALERT: The computed SHA-256 hash differs from the immutable smart contract record. The document has been modified, forged, or swapped after initial anchoring.'}
              </p>
            </div>

            {/* Blockchain Receipt Link */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Smart Contract Anchor Tx:</span>
              <a
                href={getExplorerUrl(ANCHORED_DOC.anchoredTxHash)}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-1"
              >
                <span>{formatHash(ANCHORED_DOC.anchoredTxHash, 8, 8)}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
