import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import type { Experience as ExperienceType } from '../../types/portfolio';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 bg-[#0A1020] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Professional <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Work history, software development roles, and engineering contributions.
          </p>
        </div>

        <div className="relative border-l-2 border-[#1E293B] ml-4 sm:ml-32 space-y-12">
          {experiences.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 sm:pl-10 group"
            >
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0E172B] border-2 border-blue-500 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-md shadow-blue-500/50" />

              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 text-xs font-mono text-cyan-400 font-semibold">
                {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                <br />
                <span className="text-slate-500 text-[10px]">
                  {item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                </span>
              </div>

              <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-[#1E293B] space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#1E293B]/60 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.jobTitle}
                    </h3>
                    <p className="text-sm font-semibold text-blue-400 mt-0.5">
                      {item.companyName} <span className="text-slate-500 font-normal">({item.employmentType})</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {item.location}
                    </span>
                    <span className="sm:hidden font-mono text-cyan-400">
                      {new Date(item.startDate).getFullYear()} - {item.isCurrent ? 'Present' : ''}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-[#0A1020] text-cyan-300 border border-[#1E293B]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
