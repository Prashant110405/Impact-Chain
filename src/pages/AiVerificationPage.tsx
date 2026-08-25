import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  AlertOctagon, 
  Info,
  FileSpreadsheet
} from 'lucide-react';
import { analyzeExpenseAnomaly, ExpenseInput } from '../services/aiService';
import { DEMO_PRELOADED_EXPENSES } from '../data/mockData';
import { AnomalyAnalysisResult } from '../types';

export const AiVerificationPage: React.FC = () => {
  const [formData, setFormData] = useState<ExpenseInput>({
    expenseCategory: 'Education Kits Procurement',
    amount: 18500,
    approvedBudget: 15000,
    invoiceId: 'INV-8821-DUP',
    beneficiaryCount: 22,
    historicalAverage: 12500
  });

  const [analysisResult, setAnalysisResult] = useState<AnomalyAnalysisResult>(() => {
    return analyzeExpenseAnomaly({
      expenseCategory: 'Education Kits Procurement',
      amount: 18500,
      approvedBudget: 15000,
      invoiceId: 'INV-8821-DUP',
      beneficiaryCount: 22,
      historicalAverage: 12500
    });
  });

  const [activePreset, setActivePreset] = useState<'legitimate' | 'suspicious' | 'custom'>('suspicious');

  const handleRunAnalysis = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = analyzeExpenseAnomaly(formData);
    setAnalysisResult(result);
  };

  const handleLoadPreset = (type: 'legitimate' | 'suspicious') => {
    const data = DEMO_PRELOADED_EXPENSES[type];
    setFormData(data);
    setActivePreset(type);
    const res = analyzeExpenseAnomaly(data);
    setAnalysisResult(res);
  };

  const handleChange = (field: keyof ExpenseInput, value: any) => {
    setActivePreset('custom');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const riskBadgeStyles = {
    LOW: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    MEDIUM: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    HIGH: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
  };

  const riskGaugeColors = {
    LOW: 'from-emerald-500 to-teal-400',
    MEDIUM: 'from-amber-500 to-orange-400',
    HIGH: 'from-rose-500 to-red-600'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-purple-500/20">
            <Cpu className="w-3.5 h-3.5" />
            AI-Assisted Hybrid Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Impact & Risk Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Automated pre-disbursement expense screening and fraud pattern heuristics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Live Demo Scenarios:</span>
          <button
            onClick={() => handleLoadPreset('legitimate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activePreset === 'legitimate'
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            1. Legitimate Expense
          </button>
          <button
            onClick={() => handleLoadPreset('suspicious')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activePreset === 'suspicious'
                ? 'bg-rose-600/30 text-rose-300 border-rose-500 shadow-md shadow-rose-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            2. Suspicious Expense
          </button>
        </div>
      </div>

      {/* Positioning Callout Box */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 p-4 sm:p-5 rounded-2xl border border-purple-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider">
          <Info className="w-4 h-4 text-purple-400" />
          Technical Positioning & Architecture
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          “Our prototype uses an AI-assisted anomaly detection layer that combines transaction features, historical patterns, and rule-based signals. As more verified NGO transaction data becomes available, this architecture can be extended with trained machine-learning models.”
        </p>
      </div>

      {/* Main Analysis Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                Expense Submission Form
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Pre-Disbursement Audit
              </span>
            </div>

            <form onSubmit={handleRunAnalysis} className="space-y-4 text-xs">
              {/* Category */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Expense Category
                </label>
                <select
                  value={formData.expenseCategory}
                  onChange={(e) => handleChange('expenseCategory', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Education Kits Procurement">Education Kits Procurement</option>
                  <option value="Logistics & Transport">Logistics & Transport</option>
                  <option value="Solar RO Filter Membranes">Solar RO Filter Membranes</option>
                  <option value="Medical Diagnostic Consumables">Medical Diagnostic Consumables</option>
                </select>
              </div>

              {/* Amount & Approved Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Invoice Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Approved Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.approvedBudget}
                    onChange={(e) => handleChange('approvedBudget', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Invoice ID & Beneficiary Count */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Vendor Invoice ID
                  </label>
                  <input
                    type="text"
                    value={formData.invoiceId}
                    onChange={(e) => handleChange('invoiceId', e.target.value)}
                    placeholder="e.g. INV-8821"
                    className="w-full px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Beneficiary Count
                  </label>
                  <input
                    type="number"
                    value={formData.beneficiaryCount}
                    onChange={(e) => handleChange('beneficiaryCount', parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Historical Average */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Historical Regional Average (₹)
                </label>
                <input
                  type="number"
                  value={formData.historicalAverage}
                  onChange={(e) => handleChange('historicalAverage', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all mt-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Submit for Anomaly Analysis</span>
              </button>
            </form>
          </div>

          {/* Heuristic Rules Reference */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-400">
            <h4 className="font-semibold text-slate-200">Integrated Anomaly Detection Weights:</h4>
            <ul className="space-y-1 list-disc list-inside text-[11px]">
              <li>Duplicate Invoice ID match: <strong className="text-rose-400">+40 Risk</strong></li>
              <li>Historical category spending deviation (&gt;20%): <strong className="text-amber-400">+25 Risk</strong></li>
              <li>Exceeds approved milestone budget cap: <strong className="text-amber-400">+20 Risk</strong></li>
              <li>Unusual unit cost per beneficiary: <strong className="text-purple-400">+15 Risk</strong></li>
            </ul>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all ${
            analysisResult.riskLevel === 'HIGH' 
              ? 'border-rose-500/50 bg-rose-950/10' 
              : analysisResult.riskLevel === 'MEDIUM' 
              ? 'border-amber-500/40 bg-amber-950/10' 
              : 'border-emerald-500/40 bg-emerald-950/10'
          } space-y-6`}>
            {/* Risk Gauge Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Analysis Outcome
                </span>
                <div className="flex items-center gap-3">
                  <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {analysisResult.totalRiskScore}
                    <span className="text-lg text-slate-500 font-normal">/100</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${riskBadgeStyles[analysisResult.riskLevel]}`}>
                    {analysisResult.riskLevel} RISK
                  </span>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400">
                <span>Evaluated at</span>
                <div className="font-mono text-slate-200 font-semibold">{analysisResult.analyzedAt}</div>
              </div>
            </div>

            {/* Risk Score Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Composite Risk Index</span>
                <span className="font-bold text-slate-200">{analysisResult.totalRiskScore}% Threshold</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full bg-gradient-to-r ${riskGaugeColors[analysisResult.riskLevel]} rounded-full transition-all duration-700`}
                  style={{ width: `${Math.max(5, analysisResult.totalRiskScore)}%` }}
                ></div>
              </div>
            </div>

            {/* Signal Breakdown List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Signal Breakdown & Evidence
              </h3>

              <div className="space-y-2.5">
                {analysisResult.triggeredSignals.map((signal) => (
                  <div
                    key={signal.code}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      signal.triggered
                        ? 'bg-rose-950/25 border-rose-500/30'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {signal.triggered ? (
                          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <h4 className="text-xs font-bold text-slate-100">{signal.title}</h4>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        signal.triggered
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {signal.triggered ? `+${signal.riskWeight} Risk` : '0 Risk (Passed)'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-1 pl-6">
                      {signal.evidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action */}
            <div className={`p-4 rounded-xl border ${
              analysisResult.riskLevel === 'HIGH'
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200'
            } space-y-1`}>
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Recommended Automated Action
              </h4>
              <p className="text-xs leading-relaxed text-slate-200">
                {analysisResult.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
