import { Project, BlockchainTransaction, ProofDocument, ImpactScoreBreakdown } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-shiksha-01',
    title: 'Education Kits for Rural Students',
    ngoName: 'ShikshaSetu Foundation',
    ngoRegistration: 'MH/2018/0198421 (80G & 12A Certified)',
    category: 'Education',
    location: 'Nandurbar & Melghat Tribal Blocks, Maharashtra',
    targetAmount: 100000,
    raisedAmount: 72000,
    targetBeneficiaries: 200,
    reachedBeneficiaries: 174,
    impactScore: 91,
    status: 'Verified',
    verifiedBadge: true,
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Providing comprehensive STEM study kits, waterproof backpacks, and solar study lamps for 200 tribal middle-school students.',
    fullStory: `ShikshaSetu Foundation works directly in remote tribal hamlets across Nandurbar and Melghat. Due to acute resource shortages, over 40% of children drop out between standard 5th and 8th. 

Through ImpactChain, every educational kit purchase is anchored on-chain with vendor invoice hash commitments, field distribution biometric receipts, and GPS-tagged site proofs. Donors can verify the direct flow from initial INR donation to physical student distribution without intermediaries inflating procurement numbers.`,
    smartContractAddress: '0x3F982DaC658f8303C0D08b49eB9d77e4C2bAe912',
    milestones: [
      {
        id: 'ms-1',
        title: 'Kit Procurement & Quality Audit (Batch 1)',
        targetAmount: 35000,
        completedAmount: 35000,
        targetBeneficiaries: 70,
        reachedBeneficiaries: 70,
        status: 'Completed',
        proofHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        verifiedAt: '2026-02-10'
      },
      {
        id: 'ms-2',
        title: 'District School Distribution & Solar Lamps (Batch 2)',
        targetAmount: 37000,
        completedAmount: 37000,
        targetBeneficiaries: 104,
        reachedBeneficiaries: 104,
        status: 'Completed',
        proofHash: '4a6b29f9e1e9a202a6c8e3e4a2d8b12f45c89a7123490b84f67c2901a8d8e3b2',
        verifiedAt: '2026-02-18'
      },
      {
        id: 'ms-3',
        title: 'Final Batch (26 Students) & Remedial Learning Workshops',
        targetAmount: 28000,
        completedAmount: 0,
        targetBeneficiaries: 26,
        reachedBeneficiaries: 0,
        status: 'In Progress'
      }
    ],
    fundBreakdown: [
      {
        id: 'fb-1',
        category: 'Education Kits',
        allocatedAmount: 50000,
        spentAmount: 50000,
        description: 'Direct procurement of 200 comprehensive science & mathematics study kits from certified suppliers.',
        invoiceCount: 4
      },
      {
        id: 'fb-2',
        category: 'Transportation',
        allocatedAmount: 12000,
        spentAmount: 12000,
        description: 'Last-mile logistics & tempo freight to reach inaccessible hilly tribal hamlets.',
        invoiceCount: 2
      },
      {
        id: 'fb-3',
        category: 'Distribution & Field Volunteers',
        allocatedAmount: 5000,
        spentAmount: 5000,
        description: 'Distribution camps setup, venue permissions, student attendance verification.',
        invoiceCount: 2
      },
      {
        id: 'fb-4',
        category: 'Verification & Impact Assessment',
        allocatedAmount: 5000,
        spentAmount: 5000,
        description: 'Third-party independent educator audit & cryptographic hashing verification.',
        invoiceCount: 1
      }
    ],
    blockchainChecklist: [
      {
        label: 'Project Registered',
        completed: true,
        txHash: '0x9a8f4c2b1e8d7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a21',
        timestamp: '2026-01-15 10:24 IST',
        detail: 'Smart contract initialized on Polygon Amoy testnet with NGO multisig authorization.'
      },
      {
        label: 'Donations Verified',
        completed: true,
        txHash: '0x5b3a1d9e7c5f8a2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c',
        timestamp: '2026-02-18 16:42 IST',
        detail: '72 individual donor contributions recorded with immutable block confirmations.'
      },
      {
        label: 'Fund Allocations Recorded',
        completed: true,
        txHash: '0x1c8e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d9e7c5f8a2e4b6d0c',
        timestamp: '2026-02-19 11:15 IST',
        detail: 'Allocations locked into milestone-escrow sub-wallets matching approved budget.'
      },
      {
        label: 'Proof Hashes Anchored',
        completed: true,
        txHash: '0x7e2d9b4f1a6c8e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d9e7c5f',
        timestamp: '2026-02-20 14:05 IST',
        detail: '4 vendor invoice SHA-256 hashes and 2 distribution logs anchored on-chain.'
      }
    ],
    createdAt: '2026-01-15'
  },
  {
    id: 'proj-health-02',
    title: 'Rural Health Access & Mobile Diagnostics',
    ngoName: 'Aarogya Seva Trust',
    ngoRegistration: 'DL/2016/0049102 (Darpan Registered)',
    category: 'Healthcare',
    location: 'Barmer & Jaisalmer Rural Clusters, Rajasthan',
    targetAmount: 200000,
    raisedAmount: 128000,
    targetBeneficiaries: 500,
    reachedBeneficiaries: 386,
    impactScore: 87,
    status: 'Verified',
    verifiedBadge: true,
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Equipping mobile medical vans with rapid hemoglobin, blood glucose, and ECG diagnostic tests for desert communities.',
    fullStory: `Mobile health clinics operating in extreme remote terrain. Every batch of medical supplies and test kits is cross-verified on-chain with temperature logging proofs and batch serial hashes.`,
    smartContractAddress: '0x81b7a69c264E3b8D988dC8FaE927bF26C98A41c8',
    milestones: [
      {
        id: 'ms-h1',
        title: 'Diagnostic Consumables & Lab Kits Procurement',
        targetAmount: 80000,
        completedAmount: 80000,
        targetBeneficiaries: 250,
        reachedBeneficiaries: 250,
        status: 'Completed',
        verifiedAt: '2026-02-05'
      },
      {
        id: 'ms-h2',
        title: 'Desert Mobile Camps Stage 1 (136 patients screened)',
        targetAmount: 60000,
        completedAmount: 48000,
        targetBeneficiaries: 150,
        reachedBeneficiaries: 136,
        status: 'In Progress'
      }
    ],
    fundBreakdown: [
      {
        id: 'fb-h1',
        category: 'Diagnostic Test Kits',
        allocatedAmount: 110000,
        spentAmount: 80000,
        description: 'Point-of-care rapid diagnostics and testing strips.',
        invoiceCount: 3
      },
      {
        id: 'fb-h2',
        category: 'Mobile Van Fuel & Maintenance',
        allocatedAmount: 50000,
        spentAmount: 32000,
        description: 'High-clearance medical van operating across 18 desert villages.',
        invoiceCount: 2
      },
      {
        id: 'fb-h3',
        category: 'Doctor & Paramedic Stipends',
        allocatedAmount: 40000,
        spentAmount: 16000,
        description: 'Visiting physician and medical technician field allowances.',
        invoiceCount: 1
      }
    ],
    blockchainChecklist: [
      {
        label: 'Project Registered',
        completed: true,
        txHash: '0x4f8a2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d9e7c',
        timestamp: '2026-01-20 09:12 IST',
        detail: 'Registered on Polygon Amoy with Aarogya Seva multisig.'
      },
      {
        label: 'Donations Verified',
        completed: true,
        txHash: '0x9e7c5f8a2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d',
        timestamp: '2026-02-14 18:30 IST',
        detail: '142 donations locked in medical milestone contracts.'
      },
      {
        label: 'Fund Allocations Recorded',
        completed: true,
        txHash: '0x2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d9e7c5f8a',
        timestamp: '2026-02-15 14:10 IST',
        detail: 'Diagnostic and fuel budgets mapped to verified supplier addresses.'
      },
      {
        label: 'Proof Hashes Anchored',
        completed: true,
        txHash: '0x6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d9e7c5f8a2e4b6d0c8f1e3a5b7d9f2e4c',
        timestamp: '2026-02-21 17:45 IST',
        detail: 'Diagnostic supplier invoices and camp logs anchored.'
      }
    ],
    createdAt: '2026-01-20'
  },
  {
    id: 'proj-water-03',
    title: 'Clean Water Collective: Solar RO Filtration',
    ngoName: 'Jal Jeevan Sahayog',
    ngoRegistration: 'KA/2020/0031892',
    category: 'Water & Sanitation',
    location: 'Raichur & Yadgir Drought Belts, Karnataka',
    targetAmount: 150000,
    raisedAmount: 94500,
    targetBeneficiaries: 900,
    reachedBeneficiaries: 620,
    impactScore: 82,
    status: 'Under Review',
    verifiedBadge: false,
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Community solar-powered fluoride filtration plants providing 5,000L clean potable water daily across 3 fluoride-affected villages.',
    fullStory: `Installing solar-powered reverse osmosis and de-fluoridation filtration units in endemic fluorosis regions of Northern Karnataka. Currently undergoing periodic AI risk and water quality telemetry verification.`,
    smartContractAddress: '0x12c82B8DaC658f8303C0D08b49eB9d77e4C2bA111',
    milestones: [
      {
        id: 'ms-w1',
        title: 'Borewell Testing & Solar RO Unit 1 Setup (Village Hirebadi)',
        targetAmount: 60000,
        completedAmount: 60000,
        targetBeneficiaries: 300,
        reachedBeneficiaries: 300,
        status: 'Completed',
        verifiedAt: '2026-01-28'
      },
      {
        id: 'ms-w2',
        title: 'Solar RO Unit 2 & Community Distribution Taps',
        targetAmount: 50000,
        completedAmount: 34500,
        targetBeneficiaries: 320,
        reachedBeneficiaries: 320,
        status: 'In Progress'
      }
    ],
    fundBreakdown: [
      {
        id: 'fb-w1',
        category: 'Solar Panels & RO Membrane Kits',
        allocatedAmount: 95000,
        spentAmount: 65000,
        description: 'Industrial-grade membranes and solar inverters.',
        invoiceCount: 2
      },
      {
        id: 'fb-w2',
        category: 'Piping & Distribution Kiosks',
        allocatedAmount: 35000,
        spentAmount: 20000,
        description: 'Food-grade stainless steel storage tanks and automatic dispensing sensors.',
        invoiceCount: 2
      },
      {
        id: 'fb-w3',
        category: 'Water Quality Telemetry & Audits',
        allocatedAmount: 20000,
        spentAmount: 9500,
        description: 'TDS & Fluoride IoT sensor kits.',
        invoiceCount: 1
      }
    ],
    blockchainChecklist: [
      {
        label: 'Project Registered',
        completed: true,
        txHash: '0x8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b3d5f7a9c5b3a1d9e7c5f8a2e4b6d0c',
        timestamp: '2026-01-25 12:00 IST',
        detail: 'Registered on Polygon Amoy testnet.'
      },
      {
        label: 'Donations Verified',
        completed: true,
        txHash: '0x7c9e1b3d5f7a9c5b3a1d9e7c5f8a2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a',
        timestamp: '2026-02-12 11:20 IST',
        detail: '89 donations confirmed on-chain.'
      },
      {
        label: 'Fund Allocations Recorded',
        completed: true,
        txHash: '0x3d5f7a9c5b3a1d9e7c5f8a2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b',
        timestamp: '2026-02-13 15:40 IST',
        detail: 'RO hardware vendor escrow allocated.'
      },
      {
        label: 'Proof Hashes Anchored',
        completed: false,
        timestamp: 'Pending',
        detail: 'Water testing laboratory report hash awaiting admin validation.'
      }
    ],
    createdAt: '2026-01-25'
  }
];

export const INITIAL_TRANSACTIONS: BlockchainTransaction[] = [
  {
    id: 'tx-001',
    projectId: 'proj-shiksha-01',
    projectName: 'Education Kits for Rural Students',
    type: 'Donation',
    amount: 1000,
    fromAddress: '0x892aF8c36214B3A8eE5C108dBe1709A726a7C104',
    toAddress: '0x3F982DaC658f8303C0D08b49eB9d77e4C2bAe912',
    txHash: '0x7b3f9c2a1e8d4a6b5c0e9d8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    blockNumber: 1420891,
    timestamp: '2026-02-21 14:22:10 IST',
    status: 'Verified',
    tamperEvidentReason: 'Direct on-chain micro-donation event recorded on Polygon Amoy with smart contract receipt.',
    gasFeeMatic: '0.0021 MATIC',
    network: 'Polygon Amoy Testnet'
  },
  {
    id: 'tx-002',
    projectId: 'proj-shiksha-01',
    projectName: 'Education Kits for Rural Students',
    type: 'Allocation',
    amount: 700,
    fromAddress: '0x3F982DaC658f8303C0D08b49eB9d77e4C2bAe912',
    toAddress: '0x55a9b21C34E71e0c2921Af09c854129e9A82D881',
    txHash: '0x4a9d8f7e6c5b3a210f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a219e8d7c6b5a',
    blockNumber: 1420950,
    timestamp: '2026-02-21 15:10:04 IST',
    status: 'Verified',
    tamperEvidentReason: 'Budget sub-allocation locked to Education Kit milestone escrow with multisig verification.',
    gasFeeMatic: '0.0034 MATIC',
    network: 'Polygon Amoy Testnet'
  },
  {
    id: 'tx-003',
    projectId: 'proj-shiksha-01',
    projectName: 'Education Kits for Rural Students',
    type: 'Purchase',
    amount: 650,
    fromAddress: '0x55a9b21C34E71e0c2921Af09c854129e9A82D881',
    toAddress: '0x992bFc71991823Ac3D84812aE09b77E61d199A04',
    txHash: '0x8e2d1c0b9a8f7e6d5c4b3a219e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a219e8d',
    blockNumber: 1421042,
    timestamp: '2026-02-21 16:45:19 IST',
    status: 'Verified',
    proofHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    documentName: 'Vendor_Invoice_VidyaSupplies_INV-8821.pdf',
    tamperEvidentReason: 'Direct vendor payment executed with SHA-256 cryptographic invoice hash anchored on-chain.',
    gasFeeMatic: '0.0041 MATIC',
    network: 'Polygon Amoy Testnet'
  },
  {
    id: 'tx-004',
    projectId: 'proj-shiksha-01',
    projectName: 'Education Kits for Rural Students',
    type: 'Distribution',
    quantityDescription: '20 STEM kits handed to Zilla Parishad School, Nandurbar',
    amount: 5000,
    fromAddress: '0x3F982DaC658f8303C0D08b49eB9d77e4C2bAe912',
    toAddress: '0x773dAc26B9aF0c228833919e18a24B10901e91A3',
    txHash: '0x2a1e8d4a6b5c0e9d8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7b3f9c',
    blockNumber: 1421210,
    timestamp: '2026-02-21 18:02:44 IST',
    status: 'Verified',
    proofHash: '4a6b29f9e1e9a202a6c8e3e4a2d8b12f45c89a7123490b84f67c2901a8d8e3b2',
    documentName: 'Biometric_Distribution_Sheet_ZP_School.pdf',
    tamperEvidentReason: 'Field distribution event signed by school headmaster and anchored with GPS and biometric proof hash.',
    gasFeeMatic: '0.0039 MATIC',
    network: 'Polygon Amoy Testnet'
  }
];

export const INITIAL_PROOFS: ProofDocument[] = [
  {
    id: 'proof-001',
    title: 'Vendor Invoice - STEM Study Kits Batch 1',
    category: 'Invoice',
    fileName: 'Vendor_Invoice_VidyaSupplies_INV-8821.pdf',
    fileSizeBytes: 248500,
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    anchoredTxHash: '0x8e2d1c0b9a8f7e6d5c4b3a219e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a219e8d',
    blockNumber: 1421042,
    timestamp: '2026-02-10 14:30 IST',
    status: 'Verified',
    projectId: 'proj-shiksha-01',
    vendorName: 'Vidya Education Supplies Pvt Ltd (GSTIN: 27AABCU9603R1ZM)',
    amountINR: 35000
  },
  {
    id: 'proof-002',
    title: 'Transportation & Logistics Transit Receipt',
    category: 'Receipt',
    fileName: 'Logistics_Transit_Receipt_MH39_4821.pdf',
    fileSizeBytes: 182400,
    sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    anchoredTxHash: '0x3d5f7a9c5b3a1d9e7c5f8a2e4b6d0c8f1e3a5b7d9f2e4c6a8b0d1e3f5a7c9e1b',
    blockNumber: 1421110,
    timestamp: '2026-02-14 11:15 IST',
    status: 'Verified',
    projectId: 'proj-shiksha-01',
    vendorName: 'Sahyadri Hilly Freight Services',
    amountINR: 12000
  },
  {
    id: 'proof-003',
    title: 'Biometric Beneficiary Attendance Sheet',
    category: 'Beneficiary Roster',
    fileName: 'Biometric_Distribution_Sheet_ZP_School.pdf',
    fileSizeBytes: 512000,
    sha256Hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    anchoredTxHash: '0x2a1e8d4a6b5c0e9d8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7b3f9c',
    blockNumber: 1421210,
    timestamp: '2026-02-18 16:00 IST',
    status: 'Verified',
    projectId: 'proj-shiksha-01',
    vendorName: 'Headmaster ZP High School, Nandurbar',
    amountINR: 0
  }
];

export const SHIKSHA_IMPACT_SCORE_BREAKDOWN: ImpactScoreBreakdown = {
  fundUtilization: { weight: 0.25, score: 95, label: 'Fund Utilization (25%)' },
  beneficiaryVerification: { weight: 0.25, score: 90, label: 'Beneficiary Verification (25%)' },
  milestoneCompletion: { weight: 0.20, score: 85, label: 'Milestone Completion (20%)' },
  proofVerification: { weight: 0.15, score: 100, label: 'Proof Verification (15%)' },
  spendingConsistency: { weight: 0.15, score: 88, label: 'Spending Consistency (15%)' },
  finalScore: 91
};

export const DEMO_PRELOADED_EXPENSES = {
  legitimate: {
    expenseCategory: 'Education Kits Procurement',
    amount: 12500,
    approvedBudget: 15000,
    invoiceId: 'INV-2026-EDU-8891',
    beneficiaryCount: 50,
    historicalAverage: 13000,
  },
  suspicious: {
    expenseCategory: 'Education Kits Procurement',
    amount: 18500,
    approvedBudget: 15000,
    invoiceId: 'INV-8821-DUP', // duplicate invoice pattern
    beneficiaryCount: 22,
    historicalAverage: 12500,
  }
};
