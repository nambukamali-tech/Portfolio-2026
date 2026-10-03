import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Calendar, Code, CheckCircle, FileText } from 'lucide-react';
import type { Profile } from '../../types/portfolio';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const infoDetails = [
    { label: 'Full Name', value: profile.fullName, icon: User },
    { label: 'Role', value: profile.headline.split('|')[0], icon: Briefcase },
    { label: 'Location', value: profile.location, icon: MapPin },
    { label: 'Status', value: profile.availabilityStatus, icon: CheckCircle },
    { label: 'Primary Focus', value: '.NET Core & React TS', icon: Code },
    { label: 'Experience', value: `${profile.yearsExperience}+ Year`, icon: Calendar },
  ];

  return (
    <section id="about" className="py-24 bg-[#0A1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Engineering with <span className="text-gradient-cyan">Precision & Purpose</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Get to know my technical background, career goals, and commitment to maintainable code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-3 rounded-3xl border border-[#1E293B] relative group">
              <div className="overflow-hidden rounded-2xl aspect-square relative">
                <img
                  src={profile.profileImageUrl || '/images/profile.jpg'}
                  alt={profile.fullName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-[#1E293B] text-center">
                <p className="text-3xl sm:text-4xl font-black text-gradient-cyan mb-1">{profile.yearsExperience}+</p>
                <p className="text-xs text-slate-400 uppercase font-semibold">Years Experience</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[#1E293B] text-center">
                <p className="text-3xl sm:text-4xl font-black text-gradient-cyan mb-1">{profile.projectsCompleted}+</p>
                <p className="text-xs text-slate-400 uppercase font-semibold">Projects Built</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <h3 className="text-2xl font-bold text-white">
                Passionate Junior Developer Dedicated to Modern Full-Stack Solutions
              </h3>
              <p>
                I am a passionate software developer specializing in building scalable backend services with ASP.NET Core Clean Architecture and responsive user interfaces using React, TypeScript, and Tailwind CSS.
              </p>
              <p>
                My problem-solving philosophy centers around strong engineering foundations: understanding business domain requirements, writing modular and readable code (SOLID principles), designing normalized PostgreSQL database schemas, and securing endpoints with JWT authentication.
              </p>
              <p>
                I constantly seek opportunities to grow my skills, collaborate with experienced tech leads, and deliver high-impact web applications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {infoDetails.map((info) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={info.label}
                    className="p-4 bg-[#0E172B] rounded-2xl border border-[#1E293B] flex items-center gap-4 hover:border-blue-500/40 transition-colors"
                  >
                    <div className="p-2.5 bg-blue-600/10 text-cyan-400 rounded-xl">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-medium">{info.label}</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href={profile.resumeUrl || '/resume.pdf'}
                download="Nambu_Kamali_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
