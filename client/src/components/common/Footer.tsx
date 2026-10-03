import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import type { Profile } from '../../types/portfolio';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#05070D] border-t border-[#1E293B] pt-16 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1E293B]/60">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-[#0E172B] rounded-[10px] flex items-center justify-center font-bold text-white">
                  NK
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                Nambu<span className="text-blue-500">Kamali</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Junior Software Developer specializing in building modern web applications with ASP.NET Core Clean Architecture and React with TypeScript.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {profile.availabilityStatus}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Technical Skills</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Featured Projects</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition-colors">Experience Timeline</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Get In Touch</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <button
                onClick={copyEmail}
                className="flex-1 flex items-center justify-between px-3 py-2 bg-[#0E172B] hover:bg-[#1A2642] border border-[#1E293B] rounded-xl text-xs text-slate-300 transition-all group"
                title="Click to copy email"
              >
                <span className="truncate">{profile.email}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />}
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#0E172B] hover:bg-blue-600/20 text-slate-400 hover:text-cyan-400 border border-[#1E293B] hover:border-blue-500/40 rounded-xl transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#0E172B] hover:bg-blue-600/20 text-slate-400 hover:text-cyan-400 border border-[#1E293B] hover:border-blue-500/40 rounded-xl transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 bg-[#0E172B] hover:bg-blue-600/20 text-slate-400 hover:text-cyan-400 border border-[#1E293B] hover:border-blue-500/40 rounded-xl transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nambu Kamali. Built with ASP.NET Core Web API & React TypeScript.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-slate-400 transition-colors">Back to Top</a>
            <span>•</span>
            <span className="text-slate-400">Clean Architecture & PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
