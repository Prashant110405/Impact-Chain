import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Wallet,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, BlockchainTransaction } from '../../types';
import { useApp } from '../../services/stateService';
import { simulateDonationTransaction, getExplorerUrl } from '../../services/blockchainService';
import { formatHash } from '../../services/cryptoService';

interface DonationModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onDonationSuccess?: (tx: BlockchainTransaction) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  project,
  isOpen,
  onClose,
  onDonationSuccess
}) => {
  const { wallet, connectWallet, addDonation, showToast } = useApp();

  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('500');
  const [step, setStep] = useState<'input' | 'processing' | 'confirmed'>('input');
  const [confirmedTx, setConfirmedTx] = useState<BlockchainTransaction | null>(null);
  const [copiedTx, setCopiedTx] = useState(false);

  if (!isOpen || !project) return null;

  const PRESET_AMOUNTS = [100, 500, 1000, 5000];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setAmount(val ? parseInt(val, 10) : 0);
  };

  const handleDonate = async () => {
    if (amount <= 0) {
      showToast({
        type: 'warning',
        title: 'Invalid Amount',
        message: 'Please enter a valid donation amount (minimum ₹10).'
      });
      return;
    }

    if (!wallet.isConnected) {
      await connectWallet();
    }

    setStep('processing');

    try {
      const tx = await simulateDonationTransaction({
        amountINR: amount,
        projectId: project.id,
        projectName: project.title,
        donorAddress: wallet.address || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        ngoAddress: project.smartContractAddress
      });

      addDonation(project.id, amount, tx);
      setConfirmedTx(tx);
      setStep('confirmed');

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast({
        type: 'success',
        title: 'Donation Verified On-Chain',
        message: `₹${amount.toLocaleString('en-IN')} committed to ${project.title}.`,
        txHash: tx.txHash
      });

      if (onDonationSuccess) {
        onDonationSuccess(tx);
      }
    } catch (err) {
      setStep('input');
      showToast({
        type: 'error',
        title: 'Transaction Error',
        message: 'Could not complete simulated transaction.'
      });
    }
  };

  const handleReset = () => {
    setStep('input');
    setConfirmedTx(null);
    onClose();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-surface border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Heart className="w-5 h-5 fill-emerald-500/20" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Transparent Giving</h3>
              <p className="text-xs text-slate-400 truncate max-w-[260px] sm:max-w-xs">{project.title}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'input' && (
          <div className="space-y-5">
            {/* Beneficiary & destination card */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Recipient Organization</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {project.ngoName}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Smart Contract Escrow</span>
                <span className="font-mono text-slate-300">{formatHash(project.smartContractAddress, 6, 6)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Funds are locked into milestone-based disbursement contracts.</span>
              </div>
            </div>

            {/* Preset Amount Chips */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Select Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAmountSelect(val)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      amount === val
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                Or Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Transparent Use Preview */}
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-3 text-xs space-y-1.5">
              <span className="font-semibold text-indigo-300 block">Where this donation goes:</span>
              <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                <li>~70% Educational kits & STEM study resources</li>
                <li>~15% Last-mile transport to remote tribal schools</li>
                <li>~15% Teacher coordination & independent verification</li>
              </ul>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleDonate}
              disabled={amount <= 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Donate ₹{amount ? amount.toLocaleString('en-IN') : 0} & Verify on Blockchain</span>
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-8 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping"></div>
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border-2 border-indigo-500 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Anchoring to Polygon Amoy...</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Executing smart contract escrow deposit & creating tamper-evident donation receipt.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Simulating block inclusion & state transition...
            </div>
          </div>
        )}

        {step === 'confirmed' && confirmedTx && (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Donation Verified!</h4>
              <p className="text-xs text-emerald-400 font-semibold">
                Recorded on Polygon Amoy Testnet &bull; Block #{confirmedTx.blockNumber}
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Verified Amount</span>
                <span className="text-emerald-400 font-bold text-base">
                  ₹{confirmedTx.amount?.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Network</span>
                <span className="text-slate-200 font-medium">{confirmedTx.network}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Timestamp</span>
                <span className="text-slate-200">{confirmedTx.timestamp}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Transaction Hash</span>
                  <button
                    onClick={() => handleCopy(confirmedTx.txHash)}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
                  >
                    {copiedTx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-slate-300 break-all select-all">
                  {confirmedTx.txHash}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={getExplorerUrl(confirmedTx.txHash)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-colors"
              >
                <span>View on Blockchain</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleReset}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
