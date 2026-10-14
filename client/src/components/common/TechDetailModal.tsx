import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, FolderGit2, Sparkles, Cpu, Layers } from 'lucide-react';
import type { TechDetail } from '../../data/techDetails';

interface TechDetailModalProps {
  tech: TechDetail | null;
  onClose: () => void;
}

export const TechDetailModal: React.FC<TechDetailModalProps> = ({ tech, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (tech) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [tech, onClose]);

  return (
    <AnimatePresence>
      {tech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0B132B] border border-[#1E293B] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#1E293B]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/30 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{tech.category}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {tech.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
                  {tech.tagline}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white bg-[#0E172B] hover:bg-[#1A2642] rounded-xl border border-[#1E293B] transition-colors"
                aria-label="Close technology details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
              {/* Technical Overview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Technical Overview</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-[#070D1E] p-4 rounded-2xl border border-[#1E293B]/60">
                  {tech.description}
                </p>
              </div>

              {/* How Nambu Uses It */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>How Nambu Kamali Applies It</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-[#070D1E] p-4 rounded-2xl border border-[#1E293B]/60">
                  {tech.howNambuUsesIt}
                </p>
              </div>

              {/* Key Strengths & Architectural Competencies */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Key Strengths & Architectural Competencies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tech.keyStrengths.map((strength, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#070D1E] rounded-xl border border-[#1E293B]/60 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied in Projects */}
              {tech.appliedInProjects.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    <span>Applied in Featured Portfolio Projects</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.appliedInProjects.map((proj, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/25 text-xs font-semibold text-cyan-300"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>{proj}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Click ESC or outside to close
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
