import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, ExternalLink, Eye, X } from 'lucide-react';
import type { Certification, Education } from '../../types/portfolio';

interface CertificationsEducationProps {
  certifications: Certification[];
  education: Education[];
}

export const CertificationsEducation: React.FC<CertificationsEducationProps> = ({
  certifications,
  education,
}) => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 bg-[#0A1020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" />
                <span>Verification</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Certifications & <span className="text-gradient-cyan">Credentials</span>
              </h2>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-[#1E293B] space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-blue-400 font-semibold mt-0.5">{cert.issuer}</p>
                    </div>

                    <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-[#0A1020] text-slate-400 border border-[#1E293B] shrink-0">
                      {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    {cert.credentialId && (
                      <span className="font-mono text-[10px] text-slate-500">ID: {cert.credentialId}</span>
                    )}

                    <div className="flex items-center gap-3">
                      {cert.certificateUrl && (
                        <button
                          onClick={() => setActiveCert(cert)}
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      )}

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Education & <span className="text-gradient-cyan">Degrees</span>
              </h2>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-[#1E293B] space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{edu.qualification}</h3>
                      <p className="text-xs text-blue-400 font-semibold mt-0.5">{edu.institution}</p>
                    </div>

                    <span className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-[#0A1020] text-cyan-300 border border-[#1E293B] shrink-0">
                      {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {activeCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070D]/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0E172B] border border-[#1E293B] rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative"
              >
                <button
                  onClick={() => setActiveCert(null)}
                  className="absolute top-5 right-5 p-2 bg-[#0A1020] text-slate-400 hover:text-white rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1 pr-8">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Certificate Verification</span>
                  <h3 className="text-xl font-bold text-white">{activeCert.name}</h3>
                  <p className="text-xs text-slate-400">{activeCert.issuer}</p>
                </div>

                <div className="p-8 bg-[#0A1020] border border-[#1E293B] rounded-2xl text-center space-y-3">
                  <Award className="w-12 h-12 text-cyan-400 mx-auto" />
                  <p className="text-sm text-slate-200 font-medium">Verified Certificate Document</p>
                  <p className="text-xs text-slate-400">{activeCert.description}</p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Close
                  </button>
                  {activeCert.verificationUrl && (
                    <a
                      href={activeCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Credential</span>
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
