import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Heart, 
  MapPin, 
  Building2, 
  Users
} from 'lucide-react';
import { useApp } from '../services/stateService';

interface ProjectsPageProps {
  onNavigate: (route: string, projectId?: string) => void;
  onOpenDonateModal: (projectId: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, onOpenDonateModal }) => {
  const { projects } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories = ['All', 'Education', 'Healthcare', 'Water & Sanitation'];
  const statuses = ['All', 'Verified', 'Under Review'];

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.ngoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Decentralized Social Impact Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Social Projects
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Support high-integrity grassroots initiatives with immutable on-chain milestone escrow locks.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
          Showing {filteredProjects.length} Projects &bull; Polygon Amoy
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project, NGO or location..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Status:</span>
          {statuses.map((stat) => (
            <button
              key={stat}
              onClick={() => setSelectedStatus(stat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedStatus === stat
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const percentRaised = Math.round((project.raisedAmount / project.targetAmount) * 100);
          const percentBeneficiaries = Math.round((project.reachedBeneficiaries / project.targetBeneficiaries) * 100);

          return (
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/40"></div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-lg ${
                      project.status === 'Verified' ? 'badge-verified' : 'badge-review'
                    }`}
                  >
                    {project.status === 'Verified' ? (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    {project.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-slate-300 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Impact Score Pill */}
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-lg text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">
                    Impact Score
                  </div>
                  <div className="text-lg font-extrabold text-emerald-400 leading-tight">
                    {project.impactScore}<span className="text-xs text-slate-400">/100</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-semibold text-slate-300">{project.ngoName}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  {/* Funding Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Raised:</span>
                      <span className="font-bold text-white">
                        ₹{project.raisedAmount.toLocaleString('en-IN')}{' '}
                        <span className="text-slate-500 font-normal">/ ₹{project.targetAmount.toLocaleString('en-IN')}</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, percentRaised)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Beneficiary Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      Beneficiaries Reached:
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {project.reachedBeneficiaries} / {project.targetBeneficiaries} ({percentBeneficiaries}%)
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => onNavigate('project-detail', project.id)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onOpenDonateModal(project.id)}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1 transition-all"
                  >
                    <Heart className="w-3 h-3 fill-white/20" />
                    <span>Quick Donate</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
