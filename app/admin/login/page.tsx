'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, KeyRound, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('arvian_admin_token', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081325] via-[#0B1E36] to-[#07101E] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C2FF] text-white font-black text-2xl shadow-xl shadow-blue-600/30 mb-4 border border-blue-400/20">
            E
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">EcomVanta CMS Control</h1>
          <p className="text-sm text-blue-200 mt-1">
            Complete Website Content & Asset Management
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-blue-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
                Administrator Access Code
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password (e.g. ecomvanta2026)"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all"
                />
                <KeyRound className="w-4 h-4 text-blue-300 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-800/50 rounded-xl flex items-center gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Verifying...' : 'Unlock CMS Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Info & Hint */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 text-center text-xs text-slate-400">
            <p className="flex items-center justify-center gap-1 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Default Passcode:{' '}
              <span className="font-mono text-white bg-slate-950 px-1.5 py-0.5 rounded border border-blue-900/50">
                ecomvanta2026
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>© 2026 EcomVanta • Enterprise Edition</p>
        </div>
      </div>
    </div>
  );
}
