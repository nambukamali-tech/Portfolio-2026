import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Terminal, Database, Code2, CheckCircle2 } from 'lucide-react';
import type { Profile } from '../../types/portfolio';

interface HeroProps {
  profile: Profile;
}

const roles = ['.NET Developer', 'React Developer', 'Full-Stack Developer', 'Software Engineer'];

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-[#05070D]">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0E172B] border border-blue-500/30 text-xs font-medium text-cyan-300 shadow-lg shadow-blue-900/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{profile.availabilityStatus || 'Open to opportunities'}</span>
          </div>

          <div className="space-y-2">
            <p className="text-slate-400 font-mono text-sm tracking-wide">Hello, I'm</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none">
              {profile.fullName}
            </h1>
            
            <div className="h-10 sm:h-14 flex items-center text-2xl sm:text-4xl font-bold">
              <span className="text-slate-400 mr-3">A</span>
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-gradient"
              >
                {roles[roleIndex]}
              </motion.span>
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={profile.resumeUrl || '/resume.pdf'}
              download="Nambu_Kamali_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0E172B] hover:bg-[#1A2642] text-slate-200 hover:text-white font-semibold border border-[#1E293B] hover:border-blue-500/50 rounded-xl transition-all duration-300"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-3.5 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Let's Connect</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#1E293B]/60 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Clean Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>ASP.NET Core Web API</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>React & TypeScript</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center relative py-10"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full border border-blue-500/20 animate-spin-slow" />
            <div className="absolute w-[22rem] h-[22rem] rounded-full border border-cyan-500/15 animate-spin-reverse-slow" />
          </div>

          <div className="absolute top-4 left-6 z-20 px-3 py-1.5 rounded-full bg-[#0E172B]/90 border border-blue-500/30 text-xs font-mono text-cyan-300 shadow-lg flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>C# / .NET 10</span>
          </div>

          <div className="absolute bottom-6 right-4 z-20 px-3 py-1.5 rounded-full bg-[#0E172B]/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>React + TS</span>
          </div>

          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 px-3 py-1.5 rounded-full bg-[#0E172B]/90 border border-blue-500/30 text-xs font-mono text-blue-300 shadow-lg flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>PostgreSQL</span>
          </div>

          <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-1.5 bg-gradient-to-tr from-blue-600 via-cyan-400 to-blue-500 shadow-2xl shadow-blue-600/30">
            <div className="w-full h-full bg-[#0A1020] rounded-[22px] overflow-hidden relative group">
              <img
                src={profile.profileImageUrl || '/images/profile.jpg'}
                alt={profile.fullName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
