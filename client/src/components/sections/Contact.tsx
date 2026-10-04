import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MapPin, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { portfolioApi } from '../../services/api';
import type { Profile } from '../../types/portfolio';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const maxMessageLength = 1000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please complete all form fields.' });
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    try {
      setLoading(true);
      const res = await portfolioApi.submitContact(formData);

      // Also forward email directly to nambukamali@gmail.com via Web3Forms
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: '5817c182-3d84-4847-b715-c0d1645e3ec3', // Web3Forms public API service
            name: formData.fullName,
            email: formData.email,
            subject: `[Portfolio Inquiry] ${formData.subject}`,
            message: `Sender: ${formData.fullName} (${formData.email})\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
            from_name: formData.fullName,
            replyto: formData.email,
          })
        });
      } catch (emailErr) {
        console.warn('Direct email dispatch note:', emailErr);
      }

      setStatus({ type: 'success', message: res.message || 'Message sent! Nambu Kamali will receive your email at nambukamali@gmail.com.' });
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Failed to submit message. Please try emailing directly to nambukamali@gmail.com.';
      setStatus({ type: 'error', message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A1020] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Let's Build <span className="text-gradient-cyan">Something Great</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have a project opportunity, question, or looking to hire a junior full-stack developer? Send a direct message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-[#1E293B] space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Open for full-time junior developer roles, remote opportunities, and technical projects.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-[#0A1020] rounded-2xl border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600/10 text-cyan-400 rounded-xl">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Email Address</p>
                      <p className="text-xs sm:text-sm font-semibold text-white">{profile.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-2 text-slate-400 hover:text-cyan-400 bg-[#0E172B] hover:bg-[#1A2642] rounded-xl transition-colors"
                    title="Copy email to clipboard"
                  >
                    {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-4 bg-[#0A1020] rounded-2xl border border-[#1E293B] flex items-center gap-3">
                  <div className="p-2.5 bg-blue-600/10 text-cyan-400 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Social Profiles</p>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#0A1020] hover:bg-blue-600/20 text-slate-300 hover:text-cyan-400 border border-[#1E293B] hover:border-blue-500/40 rounded-xl text-xs font-semibold transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#0A1020] hover:bg-blue-600/20 text-slate-300 hover:text-cyan-400 border border-[#1E293B] hover:border-blue-500/40 rounded-xl text-xs font-semibold transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-[#1E293B]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {status && (
                  <div
                    className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-medium ${
                      status.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <span>{status.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Your Message</label>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formData.message.length}/{maxMessageLength}
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    maxLength={maxMessageLength}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message details here..."
                    className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-sm rounded-xl p-4 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
