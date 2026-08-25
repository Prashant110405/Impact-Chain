import React, { useState } from 'react';
import { X, ShieldCheck, ExternalLink, Copy, Check, Lock, Cpu, Layers } from 'lucide-react';
import { BlockchainTransaction } from '../../types';
import { getExplorerUrl, getAddressExplorerUrl } from '../../services/blockchainService';
import { formatHash } from '../../services/cryptoService';

interface TransactionVerificationModalProps {
  transaction: BlockchainTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionVerificationModal: React.FC<TransactionVerificationModalProps> = ({
  transaction,
  isOpen,
  onClose
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen || !transaction) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-surface border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                On-Chain Verification Record
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {transaction.status}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Polygon Amoy Testnet &bull; Block #{transaction.blockNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Details Table */}
        <div className="space-y-3 bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400">Event ID</span>
            <span className="font-mono text-slate-200 font-medium">{transaction.id}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400">Event Type</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-medium">
              {transaction.type}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400">Project</span>
            <span className="text-slate-200 font-semibold">{transaction.projectName}</span>
          </div>

          {transaction.amount && (
            <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Recorded Amount</span>
              <span className="text-emerald-400 font-bold text-sm">
                ₹{transaction.amount.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          {transaction.quantityDescription && (
            <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Milestone Quantity</span>
              <span className="text-slate-200 font-medium">{transaction.quantityDescription}</span>
            </div>
          )}

          <div className="py-1 border-b border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>Transaction Hash (TxHash)</span>
              <button
                onClick={() => handleCopy(transaction.txHash)}
                className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
              >
                {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedHash ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800 break-all text-slate-300 select-all">
              {transaction.txHash}
            </div>
          </div>

          {transaction.proofHash && (
            <div className="py-1 border-b border-slate-800/80 space-y-1">
              <span className="text-slate-400 block">Anchored Document SHA-256 Hash</span>
              <div className="font-mono text-[11px] bg-slate-950 p-2 rounded border border-emerald-900/40 text-emerald-300 break-all select-all">
                {transaction.proofHash}
              </div>
              {transaction.documentName && (
                <span className="text-[11px] text-slate-400 block mt-1">
                  Document: <strong className="text-slate-300">{transaction.documentName}</strong>
                </span>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div>
              <span className="text-slate-400 block">Network & Block</span>
              <span className="text-slate-300 font-medium">Polygon Amoy #{transaction.blockNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Timestamp</span>
              <span className="text-slate-300 font-medium">{transaction.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Tamper-evident Record Explanation */}
        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3.5 space-y-1.5">
          <h4 className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            Tamper-Evident Record Assurance
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {transaction.tamperEvidentReason}
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Once committed to Polygon Amoy smart contract, this event's receipt cannot be edited, rewritten, or deleted by any individual or NGO trustee.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <a
            href={getExplorerUrl(transaction.txHash)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-colors"
          >
            <span>View on PolygonScan Amoy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
