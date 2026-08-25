import { AnomalyAnalysisResult, AnomalySignal } from '../types';

// Pre-existing known invoice IDs in the system to detect duplicates
const KNOWN_INVOICES = new Set([
  'INV-8821',
  'INV-8821-DUP',
  'INV-VIDYA-2026-01',
  'MH39-LOGISTICS-4821',
  'RO-MEMBRANE-2026-99'
]);

export interface ExpenseInput {
  expenseCategory: string;
  amount: number;
  approvedBudget: number;
  invoiceId: string;
  beneficiaryCount: number;
  historicalAverage: number;
}

export function analyzeExpenseAnomaly(input: ExpenseInput): AnomalyAnalysisResult {
  const signals: AnomalySignal[] = [];
  let riskScore = 0;

  // Signal 1: Duplicate Invoice Detection (+40 risk)
  const isDuplicate = KNOWN_INVOICES.has(input.invoiceId.trim().toUpperCase()) || 
                      input.invoiceId.toUpperCase().includes('DUP');
  
  if (isDuplicate) {
    riskScore += 40;
    signals.push({
      code: 'SIG_DUP_INVOICE',
      title: 'Duplicate / Previously Recorded Invoice ID',
      description: 'Invoice ID matches an existing on-chain or ledger record.',
      riskWeight: 40,
      triggered: true,
      evidence: `Invoice identifier "${input.invoiceId}" exists in previous project batches or matches known duplicate flag patterns.`
    });
  } else {
    signals.push({
      code: 'SIG_DUP_INVOICE',
      title: 'Invoice ID Uniqueness',
      description: 'Invoice identifier is unique across the verification ledger.',
      riskWeight: 40,
      triggered: false,
      evidence: `Invoice identifier "${input.invoiceId}" is unique and uncommitted.`
    });
  }

  // Signal 2: Budget Overrun (+20 risk)
  const budgetRatio = input.approvedBudget > 0 ? (input.amount / input.approvedBudget) : 1;
  const isOverBudget = input.amount > input.approvedBudget;
  
  if (isOverBudget) {
    riskScore += 20;
    const overPercent = Math.round((budgetRatio - 1) * 100);
    signals.push({
      code: 'SIG_BUDGET_OVERRUN',
      title: 'Expense Exceeds Approved Milestone Budget',
      description: 'Submitted amount is greater than the smart contract locked allocation.',
      riskWeight: 20,
      triggered: true,
      evidence: `Requested ₹${input.amount.toLocaleString('en-IN')} is ${overPercent}% above approved budget ₹${input.approvedBudget.toLocaleString('en-IN')}.`
    });
  } else {
    signals.push({
      code: 'SIG_BUDGET_OVERRUN',
      title: 'Milestone Budget Adherence',
      description: 'Submitted amount is within approved budget bounds.',
      riskWeight: 20,
      triggered: false,
      evidence: `Requested ₹${input.amount.toLocaleString('en-IN')} is within approved cap of ₹${input.approvedBudget.toLocaleString('en-IN')}.`
    });
  }

  // Signal 3: Historical Spending Deviation (+25 risk)
  const histDeviation = input.historicalAverage > 0 ? (input.amount - input.historicalAverage) / input.historicalAverage : 0;
  const isHistoricalSpike = histDeviation > 0.20; // > 20% higher than historical average
  
  if (isHistoricalSpike) {
    riskScore += 25;
    const spikePercent = Math.round(histDeviation * 100);
    signals.push({
      code: 'SIG_HISTORICAL_DEVIATION',
      title: 'Historical Average Spending Spike',
      description: 'Expense is significantly higher than historical category baseline.',
      riskWeight: 25,
      triggered: true,
      evidence: `Amount is ${spikePercent}% higher than regional baseline of ₹${input.historicalAverage.toLocaleString('en-IN')}.`
    });
  } else {
    signals.push({
      code: 'SIG_HISTORICAL_DEVIATION',
      title: 'Historical Average Alignment',
      description: 'Expense closely matches category benchmark.',
      riskWeight: 25,
      triggered: false,
      evidence: `Amount matches historical regional average of ₹${input.historicalAverage.toLocaleString('en-IN')} within acceptable variance.`
    });
  }

  // Signal 4: Unusual Beneficiary-Cost Ratio (+15 risk)
  // Expected cost per student for kits is around ₹250 - ₹400
  const costPerBeneficiary = input.beneficiaryCount > 0 ? input.amount / input.beneficiaryCount : 0;
  const isUnusualBeneficiaryRatio = input.beneficiaryCount > 0 && (costPerBeneficiary > 600 || costPerBeneficiary < 50);
  
  if (isUnusualBeneficiaryRatio) {
    riskScore += 15;
    signals.push({
      code: 'SIG_BENEFICIARY_OUTLIER',
      title: 'Unusual Unit Cost per Beneficiary',
      description: 'The unit cost per beneficiary diverges from peer social program norms.',
      riskWeight: 15,
      triggered: true,
      evidence: `Unit cost is ₹${Math.round(costPerBeneficiary)}/beneficiary for ${input.beneficiaryCount} recipients, deviating from standard ₹250-₹400 range.`
    });
  } else {
    signals.push({
      code: 'SIG_BENEFICIARY_OUTLIER',
      title: 'Beneficiary Unit Economics Normal',
      description: 'Unit cost per recipient aligns with program guidelines.',
      riskWeight: 15,
      triggered: false,
      evidence: `Unit cost is ₹${Math.round(costPerBeneficiary)}/beneficiary for ${input.beneficiaryCount} recipients.`
    });
  }

  // Clamp risk score to 100 max
  const totalRiskScore = Math.min(100, Math.max(0, riskScore));

  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let recommendedAction = 'Approved for automated smart-contract escrow disbursement. All validation rules passed.';

  if (totalRiskScore >= 50) {
    riskLevel = 'HIGH';
    recommendedAction = 'AUTOMATIC ESCROW HOLD: Flagged for mandatory manual review by Verifier Committee before any funds can be released. Require vendor re-verification and original GST e-invoice submission.';
  } else if (totalRiskScore >= 20) {
    riskLevel = 'MEDIUM';
    recommendedAction = 'CONDITIONAL APPROVAL: Require secondary NGO trustee approval or geo-tagged physical proof upload before next milestone unlock.';
  }

  return {
    expenseCategory: input.expenseCategory,
    amount: input.amount,
    approvedBudget: input.approvedBudget,
    invoiceId: input.invoiceId,
    beneficiaryCount: input.beneficiaryCount,
    historicalAverage: input.historicalAverage,
    totalRiskScore,
    riskLevel,
    triggeredSignals: signals,
    recommendedAction,
    analyzedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST'
  };
}
