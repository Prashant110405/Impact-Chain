import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  Menu, 
  X, 
  UserCheck, 
  Building2, 
  Eye, 
  Layers, 
  Cpu, 
  FileCheck, 
  BarChart3, 
  HelpCircle,
  FolderGit2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../services/stateService';
import { formatHash } from '../../services/cryptoService';
import { UserRole } from '../../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, projectId?: string) => void;
  onOpenWalletModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenWalletModal,
}) => {
  const { role, setRole, wallet } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'fund-tracking', label: 'Fund Tracking' },
    { id: 'ai-verification', label: 'AI Risk' },
    { id: 'proof-verification', label: 'Proofs' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'admin', label: 'NGO / Admin' },
    { id: 'how-it-works', label: 'How It Works' },
  ];

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    donor: { label: 'Donor View', icon: <UserCheck className="w-3.5 h-3.5" />, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    ngo: { label: 'NGO Manager', icon: <Building2 className="w-3.5 h-3.5" />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    verifier: { label: 'Admin Verifier', icon: <Eye className="w-3.5 h-3.5" />, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                Impact<span className="text-emerald-400">Chain</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-medium -mt-1">
                Verifiable Giving
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id || (item.id === 'projects' && currentRoute === 'project-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${roleLabels[role].color}`}
              >
                {roleLabels[role].icon}
                <span>{roleLabels[role].label}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Switch Prototype Role
                  </div>
                  {(['donor', 'ngo', 'verifier'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                        role === r ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {roleLabels[r].icon}
                      <span>{roleLabels[r].label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet Button */}
            <button
              onClick={onOpenWalletModal}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                wallet.isConnected
                  ? 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-emerald-500/50'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-500/40 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-600/25'
              }`}
            >
              <Wallet className={`w-3.5 h-3.5 ${wallet.isConnected ? 'text-emerald-400' : 'text-white'}`} />
              {wallet.isConnected ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="font-mono">{formatHash(wallet.address || '', 4, 4)}</span>
                </div>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenWalletModal}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 sm:hidden"
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-surface/95 px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-slate-800">
            <div className="text-xs text-slate-400">Active Role:</div>
            <div className="text-xs font-semibold text-emerald-400 text-right uppercase">
              {roleLabels[role].label}
            </div>
            <div className="col-span-2 flex gap-1">
              {(['donor', 'ngo', 'verifier'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1 text-[11px] font-medium rounded border ${
                    role === r ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentRoute === item.id ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
