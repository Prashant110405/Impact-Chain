import { BlockchainTransaction } from '../types';

export const POLYGON_AMOY_CONFIG = {
  chainId: '0x13882', // 80002 in hex
  chainName: 'Polygon Amoy Testnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-amoy.polygon.technology'],
  blockExplorerUrls: ['https://amoy.polygonscan.com/'],
};

// Generate realistic Polygon Amoy transaction hash
export function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

// Generate realistic block number
export function generateBlockNumber(): number {
  return 1422000 + Math.floor(Math.random() * 500);
}

// Generate realistic wallet address
export function generateWalletAddress(): string {
  const chars = '0123456789abcdefABCDEF';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

export function getExplorerUrl(txHash: string): string {
  return `https://amoy.polygonscan.com/tx/${txHash}`;
}

export function getAddressExplorerUrl(address: string): string {
  return `https://amoy.polygonscan.com/address/${address}`;
}

export interface SimulationResult {
  tx: BlockchainTransaction;
  success: boolean;
}

export async function simulateDonationTransaction(params: {
  amountINR: number;
  projectId: string;
  projectName: string;
  donorAddress: string;
  ngoAddress: string;
}): Promise<BlockchainTransaction> {
  // Simulate network delay for realistic blockchain experience
  await new Promise((resolve) => setTimeout(resolve, 1600));

  const txHash = generateTxHash();
  const blockNumber = generateBlockNumber();
  const dateStr = new Date().toLocaleDateString('en-GB') + ' ' + 
                  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';

  const tx: BlockchainTransaction = {
    id: `tx-${Date.now().toString().slice(-6)}`,
    projectId: params.projectId,
    projectName: params.projectName,
    type: 'Donation',
    amount: params.amountINR,
    fromAddress: params.donorAddress,
    toAddress: params.ngoAddress,
    txHash,
    blockNumber,
    timestamp: dateStr,
    status: 'Verified',
    tamperEvidentReason: `Micro-donation of ₹${params.amountINR.toLocaleString('en-IN')} committed to smart contract on Polygon Amoy.`,
    gasFeeMatic: '0.0028 MATIC',
    network: 'Polygon Amoy Testnet'
  };

  return tx;
}

// Check MetaMask readiness
export async function connectMetaMask(): Promise<{ address: string; chainId: string } | null> {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      return {
        address: accounts[0],
        chainId: chainId
      };
    } catch (err) {
      console.warn('MetaMask connection rejected or failed, switching to demo mode', err);
      return null;
    }
  }
  return null;
}
