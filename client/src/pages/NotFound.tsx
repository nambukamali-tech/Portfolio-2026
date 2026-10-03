import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070D] flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full glass-panel p-10 rounded-3xl border border-[#1E293B] space-y-6">
        <FileQuestion className="w-16 h-16 text-cyan-400 mx-auto" />
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404</h1>
          <p className="text-lg font-bold text-slate-300">Page Not Found</p>
          <p className="text-xs text-slate-400">
            The requested portfolio page or endpoint does not exist.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
