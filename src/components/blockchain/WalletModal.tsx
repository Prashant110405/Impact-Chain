import React, { useState } from 'react';
import { X, Wallet, ShieldCheck, Copy, Check, ExternalLink, Zap, RefreshCw } from 'lucide-react';
import { useApp } from '../../services/stateService';
import { getAddressExplorerUrl } from '../../services/blockchainService';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { wallet, connectWallet, disconnectWallet, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast({
        type: 'info',
        title: 'Address Copied',
        message: 'Wallet address copied to clipboard.'
      });
    }
  };

  const handleConnect = async (isMetaMask: boolean) => {
    setIsConnecting(true);
    await connectWallet(isMetaMask);
    setIsConnecting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-surface border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Web3 & Demo Wallet</h3>
              <p className="text-xs text-slate-400">Polygon Amoy Testnet Environment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current State */}
        {wallet.isConnected ? (
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Network Status</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Polygon Amoy (80002)
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                  Connected Address
                </span>
                <div className="flex items-center justify-between bg-surface-lighter px-3 py-2 rounded-lg border border-slate-700 font-mono text-xs text-slate-200">
                  <span className="truncate pr-2">{wallet.address}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={handleCopy}
                      title="Copy Address"
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {wallet.address && (
                      <a
                        href={getAddressExplorerUrl(wallet.address)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-surface p-3 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">INR Demo Balance</span>
                  <span className="text-base font-bold text-white">
                    ₹{wallet.balanceINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-surface p-3 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Gas Balance</span>
                  <span className="text-base font-bold text-purple-300">
                    {wallet.balanceMatic} MATIC
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleConnect(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Switch Demo Account</span>
              </button>

              <button
                onClick={() => {
                  disconnectWallet();
                  onClose();
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold border border-rose-800/40 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect to test micro-donations, on-chain milestone escrow locks, and decentralized proof verification.
            </p>

            {/* Instant Demo Option */}
            <button
              onClick={() => handleConnect(false)}
              disabled={isConnecting}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-900/60 to-surface border border-indigo-500/40 hover:border-indigo-400 text-left group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Instant Demo Mode
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                      Recommended
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">Pre-funded Polygon Amoy demo wallet (No setup required)</p>
                </div>
              </div>
            </button>

            {/* MetaMask Option */}
            <button
              onClick={() => handleConnect(true)}
              disabled={isConnecting}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-lighter hover:bg-slate-800 border border-slate-700 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">MetaMask Browser Wallet</h4>
                  <p className="text-xs text-slate-400">Connect your Web3 extension (Polygon Amoy)</p>
                </div>
              </div>
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Smart Contract: ShikshaSetu Escrow</span>
          <span className="font-mono text-slate-400">0x3F98...e912</span>
        </div>
      </div>
    </div>
  );
};
