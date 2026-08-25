import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, BlockchainTransaction, ProofDocument, UserRole, WalletState } from '../types';
import { INITIAL_PROJECTS, INITIAL_TRANSACTIONS, INITIAL_PROOFS } from '../data/mockData';
import { generateWalletAddress } from './blockchainService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  txHash?: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  wallet: WalletState;
  connectWallet: (isMetaMask?: boolean) => Promise<void>;
  disconnectWallet: () => void;
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
  addDonation: (projectId: string, amount: number, tx: BlockchainTransaction) => void;
  transactions: BlockchainTransaction[];
  addTransaction: (tx: BlockchainTransaction) => void;
  proofs: ProofDocument[];
  addProof: (proof: ProofDocument) => void;
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
  addProject: (project: Project) => void;
  updateProjectProgress: (projectId: string, reachedBeneficiaries: number, impactScore: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('impactchain_role') as UserRole) || 'donor';
  });

  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('impactchain_wallet');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      isConnected: true, // Default connected in demo mode for instant usability
      address: DEMO_WALLET_ADDRESS,
      balanceINR: 50000,
      balanceMatic: 12.45,
      network: 'Polygon Amoy Testnet (80002)',
      isDemoWallet: true
    };
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('impactchain_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROJECTS;
  });

  const [transactions, setTransactions] = useState<BlockchainTransaction[]>(() => {
    const saved = localStorage.getItem('impactchain_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [proofs, setProofs] = useState<ProofDocument[]>(() => {
    const saved = localStorage.getItem('impactchain_proofs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROOFS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('impactchain_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('impactchain_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('impactchain_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('impactchain_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('impactchain_proofs', JSON.stringify(proofs));
  }, [proofs]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newToast: ToastMessage = { ...toast, id };
    setToasts(prev => [newToast, ...prev]);

    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const connectWallet = async (isMetaMask = false) => {
    if (isMetaMask && typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setWallet({
            isConnected: true,
            address: accounts[0],
            balanceINR: 85000,
            balanceMatic: 4.82,
            network: 'Polygon Amoy Testnet (80002)',
            isDemoWallet: false
          });
          showToast({
            type: 'success',
            title: 'MetaMask Connected',
            message: `Connected wallet ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)} on Polygon Amoy.`
          });
          return;
        }
      } catch (e: any) {
        showToast({
          type: 'warning',
          title: 'Wallet Notice',
          message: 'Connecting in instant Demo Mode instead.'
        });
      }
    }

    // Default Demo Mode Wallet
    const newAddress = DEMO_WALLET_ADDRESS || generateWalletAddress();
    setWallet({
      isConnected: true,
      address: newAddress,
      balanceINR: 50000,
      balanceMatic: 12.45,
      network: 'Polygon Amoy Testnet (80002)',
      isDemoWallet: true
    });
    showToast({
      type: 'success',
      title: 'Demo Wallet Active',
      message: 'Connected to instant Polygon Amoy demo account with 12.45 mock MATIC.'
    });
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balanceINR: 0,
      balanceMatic: 0,
      network: 'Disconnected',
      isDemoWallet: true
    });
    showToast({
      type: 'info',
      title: 'Wallet Disconnected',
      message: 'You can reconnect anytime or continue in demo mode.'
    });
  };

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id);
  };

  const addDonation = (projectId: string, amount: number, tx: BlockchainTransaction) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newRaised = p.raisedAmount + amount;
        // Also simulate an incremental bump in reached beneficiaries if appropriate
        const addedBeneficiaries = Math.min(p.targetBeneficiaries - p.reachedBeneficiaries, Math.floor(amount / 400));
        return {
          ...p,
          raisedAmount: newRaised,
          reachedBeneficiaries: p.reachedBeneficiaries + (addedBeneficiaries > 0 ? addedBeneficiaries : 0)
        };
      }
      return p;
    }));

    setTransactions(prev => [tx, ...prev]);

    setWallet(prev => ({
      ...prev,
      balanceINR: Math.max(0, prev.balanceINR - amount),
      balanceMatic: Math.max(0, +(prev.balanceMatic - 0.0028).toFixed(4))
    }));
  };

  const addTransaction = (tx: BlockchainTransaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const addProof = (proof: ProofDocument) => {
    setProofs(prev => [proof, ...prev]);
  };

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
    showToast({
      type: 'success',
      title: 'Project Registered On-Chain',
      message: `${project.title} registered with contract ${project.smartContractAddress.slice(0, 8)}...`
    });
  };

  const updateProjectProgress = (projectId: string, reachedBeneficiaries: number, impactScore: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          reachedBeneficiaries,
          impactScore
        };
      }
      return p;
    }));
    showToast({
      type: 'info',
      title: 'Impact Metrics Updated',
      message: `Updated project beneficiaries to ${reachedBeneficiaries} and Impact Score to ${impactScore}/100.`
    });
  };

  const resetDemoData = () => {
    setProjects(INITIAL_PROJECTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setProofs(INITIAL_PROOFS);
    setWallet({
      isConnected: true,
      address: DEMO_WALLET_ADDRESS,
      balanceINR: 50000,
      balanceMatic: 12.45,
      network: 'Polygon Amoy Testnet (80002)',
      isDemoWallet: true
    });
    localStorage.removeItem('impactchain_projects');
    localStorage.removeItem('impactchain_transactions');
    localStorage.removeItem('impactchain_proofs');
    localStorage.removeItem('impactchain_wallet');
    showToast({
      type: 'info',
      title: 'Demo Reset',
      message: 'Restored all original prototype benchmark data.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        wallet,
        connectWallet,
        disconnectWallet,
        projects,
        getProjectById,
        addDonation,
        transactions,
        addTransaction,
        proofs,
        addProof,
        toasts,
        showToast,
        removeToast,
        resetDemoData,
        addProject,
        updateProjectProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
