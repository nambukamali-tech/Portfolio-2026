import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { portfolioApi } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@nambukamali.dev');
  const [password, setPassword] = useState('AdminPass123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await portfolioApi.adminLogin(email, password);
      login(data.token, data.email, data.username);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-[#1E293B] shadow-2xl relative z-10 space-y-6">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>
          
          <div className="p-2.5 bg-blue-600/10 text-cyan-400 rounded-2xl border border-blue-500/20">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Control Portal</h1>
          <p className="text-xs text-slate-400">Sign in to manage portfolio content and contact inbox</p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 outline-none"
                placeholder="admin@nambukamali.dev"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A1020] border border-[#1E293B] focus:border-blue-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authenticate & Sign In'}
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-slate-500">
          Protected by ASP.NET Core JWT & Rate-Limited Authentication
        </div>

      </div>
    </div>
  );
};
