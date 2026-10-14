import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Database, Wrench, Cpu, CheckCircle2, Layers, Info } from 'lucide-react';
import type { Skill } from '../../types/portfolio';
import { TechDetailModal } from '../common/TechDetailModal';
import { getTechDetail, type TechDetail } from '../../data/techDetails';

interface SkillsProps {
  skills: Skill[];
}

const categories = [
  { id: 'All', label: 'All Technologies', icon: Layers },
  { id: 'Frontend', label: 'Frontend', icon: Code },
  { id: 'Backend', label: 'Backend', icon: Terminal },
  { id: 'Database', label: 'Database', icon: Database },
  { id: 'Tools & Platforms', label: 'Tools & Platforms', icon: Wrench },
  { id: 'Architecture & Concepts', label: 'Architecture & Concepts', icon: Cpu },
];

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="py-24 bg-[#05070D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Skills & <span className="text-gradient-cyan">Technology Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Categorized overview of backend, frontend, database, and architectural competencies. Click any technology to view technical details, strengths, and project applications.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-[#0E172B] text-slate-400 hover:text-white hover:bg-[#1A2642] border border-[#1E293B]'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredSkills.map((skill) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={skill.id}
              onClick={() => setSelectedTech(getTechDetail(skill.name, skill.category))}
              className="glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col items-center text-center justify-between gap-3 group cursor-pointer border border-[#1E293B] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative text-left w-full"
              title={`Click to read about ${skill.name}`}
            >
              <div className="p-3 bg-[#0A1020] rounded-xl border border-[#1E293B] group-hover:border-blue-500/40 text-cyan-400 group-hover:scale-110 group-hover:bg-blue-600/10 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-blue-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              
              <div className="space-y-1 w-full">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {skill.name}
                </h3>
                <span className="inline-block text-[10px] text-slate-400 uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-[#0A1020] border border-[#1E293B]/40">
                  {skill.category}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors pt-1 opacity-70 group-hover:opacity-100">
                <Info className="w-3 h-3" />
                <span>Details</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Interactive Technology Details Modal */}
      <TechDetailModal
        tech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </section>
  );
};
