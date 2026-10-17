'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeftRight,
  Plus,
  Trash2,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { SeoRedirectRule } from '@/lib/seoTypes';
import { validateRedirects } from '@/lib/seoEngine';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

export default function RedirectManagerPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [redirects, setRedirects] = useState<SeoRedirectRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New redirect form
  const [sourcePath, setSourcePath] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [statusCode, setStatusCode] = useState<301 | 302>(301);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prefillSource = params.get('source');
      if (prefillSource) setSourcePath(prefillSource);
    }

    async function load() {
      try {
        const res = await fetch('/api/admin/content', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setCmsData(json.data);
          setRedirects(json.data.seoSystem?.redirects || []);
        }
      } catch (err) {
        console.error('Failed to load redirects:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const diagnostics = useMemo(() => validateRedirects(redirects), [redirects]);

  const persistRedirects = async (updated: SeoRedirectRule[]) => {
    if (!cmsData) return;
    setSaving(true);
    setRedirects(updated);
    const updatedSeoSystem = {
      ...cmsData.seoSystem,
      redirects: updated,
    };
    setCmsData({ ...cmsData, seoSystem: updatedSeoSystem });
    saveLocalCmsContent({ seoSystem: updatedSeoSystem });
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'seoSystem',
          data: updatedSeoSystem,
        }),
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourcePath.trim() || !destinationUrl.trim()) return;

    const cleanSource = sourcePath.trim().startsWith('/')
      ? sourcePath.trim()
      : `/${sourcePath.trim()}`;
    const cleanDest =
      destinationUrl.trim().startsWith('/') || destinationUrl.trim().startsWith('http')
        ? destinationUrl.trim()
        : `/${destinationUrl.trim()}`;

    if (cleanSource === cleanDest) {
      alert('Source path and destination URL cannot be identical (self-redirect loop).');
      return;
    }

    const newRule: SeoRedirectRule = {
      id: `redir-${Date.now()}`,
      source: cleanSource,
      destination: cleanDest,
      type: statusCode,
      enabled: true,
      hits: 0,
      createdAt: new Date().toISOString().split('T')[0],
      notes: reason.trim() || 'Manual SEO Redirect',
    };

    setSourcePath('');
    setDestinationUrl('');
    setReason('');
    await persistRedirects([newRule, ...redirects]);
  };

  const handleToggleActive = async (id: string) => {
    const updated = redirects.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    await persistRedirects(updated);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this redirect rule?')) return;
    await persistRedirects(redirects.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            301 & 302 Redirect Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Executed at edge/request runtime via Next.js `proxy.ts`. Automatically detects redirect loops, chains, and slug changes.
          </p>
        </div>
      </div>

      {/* Loop / Chain Diagnostics Banner */}
      {diagnostics.length > 0 && (
        <div className="space-y-2">
          {diagnostics.map((d, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-2.5 text-xs font-bold ${
                d.severity === 'error'
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{d.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Create New Redirect Rule Form */}
      <form
        onSubmit={handleAddRedirect}
        className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4"
      >
        <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-[#0066FF]" />
          <span>Create New 301 / 302 Redirect Rule</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Source Path (Old URL)
            </label>
            <input
              type="text"
              value={sourcePath}
              onChange={(e) => setSourcePath(e.target.value)}
              placeholder="/old-service-slug"
              required
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Destination URL (Target Path)
            </label>
            <input
              type="text"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="/amazon-seller-account-management-services"
              required
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Status Code
            </label>
            <select
              value={statusCode}
              onChange={(e) => setStatusCode(Number(e.target.value) as 301 | 302)}
              className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-slate-50"
            >
              <option value={301}>301 Permanent</option>
              <option value={302}>302 Temporary</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2 px-4 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Rule</span>
            </button>
          </div>
        </div>

        <div>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Optional note / reason (e.g. Consolidated legacy landing page into primary service route)"
            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50"
          />
        </div>
      </form>

      {/* Active Redirects Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900">
            Configured Redirect Rules ({redirects.length})
          </h2>
          <span className="text-xs text-slate-500">
            {redirects.filter((r) => r.enabled).length} active rules
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Source URL</th>
                <th className="py-3 px-4">Destination URL</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Reason / Note</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {redirects.map((rule) => {
                const ruleIssues = diagnostics.filter((d) => d.redirectId === rule.id);
                return (
                  <tr key={rule.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{rule.source}</span>
                        <a
                          href={rule.source}
                          target="_blank"
                          rel="noreferrer"
                          title="Test Redirect in New Tab"
                          className="text-slate-400 hover:text-[#0066FF]"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#0066FF] font-semibold">
                      {rule.destination}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          rule.type === 301
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {rule.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {rule.notes || '—'}
                      {ruleIssues.map((iss, i) => (
                        <div key={i} className="text-[10px] font-bold text-rose-600 mt-0.5">
                          ⚠ {iss.message}
                        </div>
                      ))}
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(rule.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          rule.enabled
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {rule.enabled ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(rule.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
