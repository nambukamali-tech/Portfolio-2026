import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Award,
  Briefcase,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Phone,
  Sparkles,
  Zap,
  MapPin
} from 'lucide-react';
import type { Profile } from '../../types/portfolio';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({ isOpen, onClose, profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email || 'nambukamali@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-[#0A1020] border border-blue-500/40 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-900/40 overflow-hidden z-10 my-auto"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />

            {/* Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-[#1E293B] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>60-Second Executive Briefing</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{profile.fullName || 'Nambu Kamali N'}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium">
                    Immediate Joiner
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Quick-glance overview for Engineering Managers & Technical Recruiters
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white bg-[#0E172B] hover:bg-[#1E293B] rounded-xl border border-[#1E293B] transition-colors"
                aria-label="Close recruiter summary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Highlight Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Academic Distinction Card */}
                <div className="p-4 rounded-2xl bg-[#0E172B]/80 border border-amber-500/30 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2.5">
                    <Award className="w-4 h-4" />
                    <span>Academic Distinction</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <p className="text-white text-xs sm:text-sm font-bold flex items-center justify-between">
                        <span>🥇 University 1st Rank (Gold Medalist)</span>
                        <span className="text-amber-300 font-mono text-xs">CGPA 8.93</span>
                      </p>
                      <p className="text-slate-300 text-xs mt-0.5">
                        M.Sc Computer Science • Alagappa University (2023–2025)
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <p className="text-white text-xs sm:text-sm font-bold flex items-center justify-between">
                        <span>🎖️ 5th Rank Holder</span>
                        <span className="text-cyan-300 font-mono text-xs">CGPA 8.70</span>
                      </p>
                      <p className="text-slate-300 text-xs mt-0.5">
                        B.Sc Computer Science (2020–2023)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Current Role & Enterprise Work */}
                <div className="p-4 rounded-2xl bg-[#0E172B]/80 border border-blue-500/30 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2.5">
                    <Briefcase className="w-4 h-4" />
                    <span>Current Industry Role</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="text-sm font-bold text-white">
                      Junior Software Developer
                    </p>
                    <p className="text-cyan-300 font-medium">
                      PrimeMover Solutions • Coimbatore, India
                    </p>
                    <div className="mt-2 space-y-1 pt-1 border-t border-[#1E293B]">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span><strong>FFM Project:</strong> Architected cumulative attendance, break deduction algorithms, and geofencing verification.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Ackcio Project:</strong> Sensor telemetry ingestion pipeline with event validation and zero data loss.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Technical Radar */}
              <div className="p-4 rounded-2xl bg-[#0E172B]/60 border border-[#1E293B] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Technical Competencies Verified</span>
                  </span>
                  <span className="text-[11px] text-slate-500">C# • ASP.NET Core 8 • React 19</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#05070D] border border-blue-500/20">
                    <p className="text-xs font-bold text-blue-400 mb-1.5">Backend Core</p>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• C# & .NET 8 / .NET 10</li>
                      <li>• ASP.NET Core Web API</li>
                      <li>• Entity Framework Core</li>
                      <li>• MediatR (CQRS Pattern)</li>
                      <li>• FluentValidation</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-[#05070D] border border-cyan-500/20">
                    <p className="text-xs font-bold text-cyan-400 mb-1.5">Frontend & Web</p>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• React 19 & TypeScript</li>
                      <li>• TailwindCSS & Modern UI</li>
                      <li>• REST API Integration</li>
                      <li>• State Management</li>
                      <li>• Responsive Layouts</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-[#05070D] border border-purple-500/20">
                    <p className="text-xs font-bold text-purple-400 mb-1.5">Architecture & Data</p>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• Clean Architecture</li>
                      <li>• SQL Server & Indexing</li>
                      <li>• RabbitMQ Messaging</li>
                      <li>• Docker & Multi-stage CI</li>
                      <li>• Unit & Integration Testing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Quick Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#0E172B] border border-[#1E293B]">
                  <p className="text-lg font-bold text-cyan-400">1.5+ Yrs</p>
                  <p className="text-[11px] text-slate-400">Engineering Exp</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0E172B] border border-[#1E293B]">
                  <p className="text-lg font-bold text-blue-400">7+</p>
                  <p className="text-[11px] text-slate-400">Projects Delivered</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0E172B] border border-[#1E293B]">
                  <p className="text-lg font-bold text-amber-400">8.93 / 10</p>
                  <p className="text-[11px] text-slate-400">Gold Medal CGPA</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0E172B] border border-[#1E293B]">
                  <p className="text-lg font-bold text-emerald-400">Immediate</p>
                  <p className="text-[11px] text-slate-400">Notice Period</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-5 sm:p-6 pt-4 bg-[#05070D] border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Coimbatore, Tamil Nadu • Willing to Relocate / Remote</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0E172B] hover:bg-[#1E293B] text-slate-200 text-xs font-semibold border border-[#1E293B] transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href="tel:+917695844877"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0E172B] hover:bg-[#1E293B] text-slate-200 text-xs font-semibold border border-[#1E293B] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call / WhatsApp</span>
                </a>

                <a
                  href={profile.resumeUrl || '/resume.pdf'}
                  download="Nambu_Kamali_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
