import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DemoBanner } from './components/layout/DemoBanner';
import { ToastContainer } from './components/layout/ToastContainer';
import { WalletModal } from './components/blockchain/WalletModal';
import { DonationModal } from './components/donation/DonationModal';

import { LandingPage } from './pages/LandingPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { FundTrackingPage } from './pages/FundTrackingPage';
import { AiVerificationPage } from './pages/AiVerificationPage';
import { ProofVerificationPage } from './pages/ProofVerificationPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminControlsPage } from './pages/AdminControlsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

import { useApp } from './services/stateService';

export function App() {
  const { getProjectById } = useApp();

  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-shiksha-01');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [donateProjectId, setDonateProjectId] = useState<string | null>(null);

  const handleNavigate = (route: string, projectId?: string) => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonate = (projectId: string) => {
    setDonateProjectId(projectId);
  };

  const selectedDonateProject = donateProjectId ? getProjectById(donateProjectId) || null : null;

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Demo Banner */}
      <DemoBanner onNavigate={handleNavigate} />

      {/* Sticky Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      {/* Main App Content View Router */}
      <main className="flex-1">
        {currentRoute === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {currentRoute === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onOpenDonateModal={handleOpenDonate}
          />
        )}

        {currentRoute === 'project-detail' && (
          <ProjectDetailPage
            projectId={selectedProjectId}
            onBack={() => handleNavigate('projects')}
            onOpenDonateModal={handleOpenDonate}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'fund-tracking' && (
          <FundTrackingPage />
        )}

        {currentRoute === 'ai-verification' && (
          <AiVerificationPage />
        )}

        {currentRoute === 'proof-verification' && (
          <ProofVerificationPage />
        )}

        {currentRoute === 'dashboard' && (
          <DashboardPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'admin' && (
          <AdminControlsPage />
        )}

        {currentRoute === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals & Notifications */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <DonationModal
        project={selectedDonateProject}
        isOpen={!!donateProjectId}
        onClose={() => setDonateProjectId(null)}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
