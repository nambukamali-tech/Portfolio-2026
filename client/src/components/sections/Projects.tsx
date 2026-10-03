import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Search, ExternalLink, Eye, X, Terminal, CheckCircle } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import type { Project } from '../../types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

const categories = ['All', 'Full-Stack', 'Backend', 'Frontend'];

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-[#05070D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Project Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Featured <span className="text-gradient-cyan">Work & Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore full-stack applications, enterprise solutions, and backend API engines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#0E172B] p-3 rounded-2xl border border-[#1E293B]">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#1A2642]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#0E172B] rounded-3xl border border-[#1E293B] space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query or switching categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={project.id}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-[#1E293B] flex flex-col justify-between group"
              >
                <div className="relative aspect-video overflow-hidden bg-[#0A1020]">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#05070D]/80 backdrop-blur-md border border-[#1E293B] text-[10px] font-mono text-cyan-400">
                    {project.projectStatus}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-[#0A1020] text-slate-300 border border-[#1E293B]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#1E293B]/60 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {project.gitHubUrl && (
                        <a
                          href={project.gitHubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {activeModalProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05070D]/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#0E172B] border border-[#1E293B] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
              >
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-6 right-6 p-2 bg-[#0A1020] hover:bg-[#1A2642] text-slate-400 hover:text-white rounded-xl border border-[#1E293B]"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2 pr-12">
                  <span className="px-3 py-1 rounded-full bg-blue-600/20 text-cyan-400 text-xs font-mono font-semibold">
                    {activeModalProject.category} • {activeModalProject.projectStatus}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                    {activeModalProject.title}
                  </h3>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden bg-[#0A1020]">
                  <img
                    src={activeModalProject.thumbnailUrl}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeModalProject.problemStatement && (
                    <div className="p-4 bg-[#0A1020] rounded-2xl border border-[#1E293B] space-y-2">
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> Problem Statement
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeModalProject.problemStatement}
                      </p>
                    </div>
                  )}

                  {activeModalProject.solutionOverview && (
                    <div className="p-4 bg-[#0A1020] rounded-2xl border border-[#1E293B] space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Solution Overview
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeModalProject.solutionOverview}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Project Overview</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activeModalProject.fullDescription}
                  </p>

                  {activeModalProject.architectureNotes && (
                    <div className="p-4 bg-[#0A1020] rounded-2xl border border-[#1E293B] space-y-2">
                      <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Architecture & Engineering Notes</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeModalProject.architectureNotes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 bg-[#0A1020] border border-[#1E293B] rounded-xl text-xs font-mono text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
                  {activeModalProject.gitHubUrl && (
                    <a
                      href={activeModalProject.gitHubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1020] hover:bg-[#1A2642] text-slate-200 text-xs font-semibold rounded-xl border border-[#1E293B]"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                  {activeModalProject.liveDemoUrl && (
                    <a
                      href={activeModalProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
