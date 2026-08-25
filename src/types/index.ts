export type UserRole = 'donor' | 'ngo' | 'verifier';

export type ProjectStatus = 'Verified' | 'Under Review' | 'Active' | 'Completed';

export interface Milestone {
  id: string;
  title: string;
  targetAmount: number;
  completedAmount: number;
  targetBeneficiaries: number;
  reachedBeneficiaries: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  proofHash?: string;
  verifiedAt?: string;
}

export interface FundBreakdownItem {
  id: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  description: string;
  invoiceCount: number;
}

export interface BlockchainChecklistItem {
  label: string;
  completed: boolean;
  txHash?: string;
  timestamp: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  ngoName: string;
  ngoRegistration: string;
  category: 'Education' | 'Healthcare' | 'Water & Sanitation' | 'Environment' | 'Community';
  location: string;
  targetAmount: number;
  raisedAmount: number;
  targetBeneficiaries: number;
  reachedBeneficiaries: number;
  impactScore: number;
  status: ProjectStatus;
  verifiedBadge: boolean;
  coverImage: string;
  shortDescription: string;
  fullStory: string;
  smartContractAddress: string;
  milestones: Milestone[];
  fundBreakdown: FundBreakdownItem[];
  blockchainChecklist: BlockchainChecklistItem[];
  createdAt: string;
}

export type EventType = 'Donation' | 'Allocation' | 'Purchase' | 'Distribution' | 'Proof Anchored';

export interface BlockchainTransaction {
  id: string;
  projectId: string;
  projectName: string;
  type: EventType;
  amount?: number;
  quantityDescription?: string;
  fromAddress: string;
  toAddress: string;
  txHash: string;
  blockNumber: number;
  timestamp: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  proofHash?: string;
  documentName?: string;
  tamperEvidentReason: string;
  gasFeeMatic: string;
  network: 'Polygon Amoy Testnet';
}

export interface AnomalySignal {
  code: string;
  title: string;
  description: string;
  riskWeight: number;
  triggered: boolean;
  evidence: string;
}

export interface AnomalyAnalysisResult {
  expenseCategory: string;
  amount: number;
  approvedBudget: number;
  invoiceId: string;
  beneficiaryCount: number;
  historicalAverage: number;
  totalRiskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  triggeredSignals: AnomalySignal[];
  recommendedAction: string;
  analyzedAt: string;
  isSimulatedDemo?: boolean;
}

export interface ProofDocument {
  id: string;
  title: string;
  category: 'Invoice' | 'Receipt' | 'Beneficiary Roster' | 'Audit Report' | 'Site Photo';
  fileName: string;
  fileSizeBytes: number;
  sha256Hash: string;
  anchoredTxHash: string;
  blockNumber: number;
  timestamp: string;
  status: 'Verified' | 'Tamper Detected' | 'Pending Anchor';
  projectId: string;
  vendorName?: string;
  amountINR?: number;
}

export interface ImpactScoreBreakdown {
  fundUtilization: { weight: number; score: number; label: string };
  beneficiaryVerification: { weight: number; score: number; label: string };
  milestoneCompletion: { weight: number; score: number; label: string };
  proofVerification: { weight: number; score: number; label: string };
  spendingConsistency: { weight: number; score: number; label: string };
  finalScore: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balanceINR: number;
  balanceMatic: number;
  network: string;
  isDemoWallet: boolean;
}
