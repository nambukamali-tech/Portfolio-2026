import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layers, ArrowRight } from 'lucide-react';
import type { ServiceItem } from '../../types/portfolio';

interface ServicesProps {
  services: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section id="services" className="py-24 bg-[#05070D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Services & <span className="text-gradient-cyan">Solutions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional software development capabilities offered for web applications and backend systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -6 }}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-[#1E293B] space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full bg-[#0E172B] rounded-[14px] flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors">
                    <Server className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#1E293B]/60">
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-[#0A1020] text-cyan-300 border border-[#1E293B]">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
