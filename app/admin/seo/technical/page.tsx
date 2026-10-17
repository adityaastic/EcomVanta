'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Save,
  Check,
  Loader2,
  ExternalLink,
  AlertTriangle,
  ShieldAlert,
  FileCode2,
  Globe,
  Bot,
  ArrowLeftRight,
  Trash2,
  Plus,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { SeoSystemConfig } from '@/lib/seoTypes';
import { buildSiteSeoInventory } from '@/lib/seoEngine';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

export default function TechnicalSeoPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [seoSystem, setSeoSystem] = useState<SeoSystemConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [excludedRouteInput, setExcludedRouteInput] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/content', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setCmsData(json.data);
          setSeoSystem(json.data.seoSystem);
        }
      } catch (err) {
        console.error('Failed to load technical SEO settings:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const audit = useMemo(() => {
    if (!cmsData) return null;
    return buildSiteSeoInventory(cmsData);
  }, [cmsData]);

  // Validate robots.txt for dangerous rules
  const robotsWarnings = useMemo(() => {
    if (!seoSystem) return [];
    const warnings: string[] = [];
    const content = seoSystem.robotsTxt?.customContent || '';
    const lines = content.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (/^Disallow:\s*\/$/i.test(line)) {
        warnings.push(
          'CRITICAL: "Disallow: /" in robots.txt blocks Googlebot from crawling the entire website!'
        );
      }
      if (/^Disallow:\s*\/blogs/i.test(line)) {
        warnings.push(
          'WARNING: "Disallow: /blogs" blocks search engines from crawling your blog articles.'
        );
      }
      if (/^Disallow:\s*\/case-study/i.test(line)) {
        warnings.push(
          'WARNING: "Disallow: /case-study" blocks search engines from crawling your case studies.'
        );
      }
    }
    return warnings;
  }, [seoSystem]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!seoSystem || !cmsData) return;

    setSaving(true);
    setSavedSuccess(false);
    try {
      saveLocalCmsContent({ seoSystem });
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'seoSystem',
          data: seoSystem,
        }),
      });
      const json = await res.json();
      if (json.success && json.data?.seoSystem) {
        setSeoSystem(json.data.seoSystem);
        setCmsData(json.data);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleClear404Logs = async () => {
    await fetch('/api/seo/404', { method: 'DELETE' });
    if (seoSystem) {
      setSeoSystem({ ...seoSystem, notFoundLogs: [] });
    }
  };

  if (loading || !seoSystem || !audit) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  const indexableSitemapItems = audit.pages.filter(
    (i) =>
      i.status === 'published' &&
      i.effectiveRobotsIndex !== 'noindex' &&
      !(seoSystem.sitemapConfig.excludedPaths || []).includes(i.urlPath)
  );

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Technical SEO Control Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure live XML sitemaps, robots.txt directives, canonical domain rules, pagination indexing, and 404 error logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 flex items-center gap-1.5"
          >
            <span>Live Sitemap.xml</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/robots.txt"
            target="_blank"
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 flex items-center gap-1.5"
          >
            <span>Live Robots.txt</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 flex items-center gap-1.5 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Technical SEO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Global Search Engine Visibility Warning if Discouraged */}
      {seoSystem.globalNoindex && (
        <div className="p-4 bg-rose-950 text-white rounded-2xl border border-rose-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-rose-300">
                Search Engine Indexing Globally Disabled!
              </p>
              <p className="text-xs text-rose-100 mt-0.5">
                &ldquo;Discourage search engines from indexing this site&rdquo; is currently ON. All pages emit `noindex, nofollow` and `/robots.txt` blocks crawlers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSeoSystem({ ...seoSystem, globalNoindex: false })}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shrink-0"
          >
            Re-Enable Indexing
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): XML Sitemap & Robots.txt Editor */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Dynamic XML Sitemap Configuration */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[#0066FF]" />
                <h2 className="text-sm font-black text-slate-900">
                  1. Dynamic XML Sitemap Generator (`/sitemap.xml`)
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {indexableSitemapItems.length} Indexable URLs in Sitemap
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(
                [
                  { key: 'includeStaticPages', label: 'Include Core Static Pages' },
                  { key: 'includeServices', label: 'Include Service Landing Pages' },
                  { key: 'includeCaseStudies', label: 'Include Client Case Studies' },
                  { key: 'includeBlogs', label: 'Include Published Blog Posts' },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.key}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-slate-700 cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(seoSystem.sitemapConfig[opt.key])}
                    onChange={(e) =>
                      setSeoSystem({
                        ...seoSystem,
                        sitemapConfig: {
                          ...seoSystem.sitemapConfig,
                          [opt.key]: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-[#0066FF]"
                  />
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Default Change Frequency
                </label>
                <select
                  value={seoSystem.sitemapConfig.defaultChangeFreq}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      sitemapConfig: {
                        ...seoSystem.sitemapConfig,
                        defaultChangeFreq: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white"
                >
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer">
                  <span>Automatically Exclude `noindex` Pages</span>
                  <input
                    type="checkbox"
                    checked={seoSystem.sitemapConfig.excludeNoindex}
                    onChange={(e) =>
                      setSeoSystem({
                        ...seoSystem,
                        sitemapConfig: {
                          ...seoSystem.sitemapConfig,
                          excludeNoindex: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-[#0066FF]"
                  />
                </label>
              </div>
            </div>

            {/* Excluded Routes */}
            <div className="pt-2 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase">
                Explicitly Excluded Routes from Sitemap (Drafts & Scheduled posts are excluded automatically)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={excludedRouteInput}
                  onChange={(e) => setExcludedRouteInput(e.target.value)}
                  placeholder="/custom-route-to-exclude"
                  className="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!excludedRouteInput.trim()) return;
                    const clean = excludedRouteInput.trim();
                    setSeoSystem({
                      ...seoSystem,
                      sitemapConfig: {
                        ...seoSystem.sitemapConfig,
                        excludedPaths: Array.from(
                          new Set([...(seoSystem.sitemapConfig.excludedPaths || []), clean])
                        ),
                      },
                    });
                    setExcludedRouteInput('');
                  }}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Exclude
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(seoSystem.sitemapConfig.excludedPaths || []).map((route) => (
                  <span
                    key={route}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono"
                  >
                    {route}
                    <button
                      type="button"
                      onClick={() =>
                        setSeoSystem({
                          ...seoSystem,
                          sitemapConfig: {
                            ...seoSystem.sitemapConfig,
                            excludedPaths: seoSystem.sitemapConfig.excludedPaths.filter(
                              (r) => r !== route
                            ),
                          },
                        })
                      }
                      className="text-slate-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Robots.txt Live Editor & Validator */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#0066FF]" />
                <h2 className="text-sm font-black text-slate-900">
                  2. Robots.txt Manager & Safety Validator (`/robots.txt`)
                </h2>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seoSystem.robotsTxt.useCustom}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      robotsTxt: {
                        ...seoSystem.robotsTxt,
                        useCustom: e.target.checked,
                      },
                    })
                  }
                  className="rounded text-[#0066FF]"
                />
                <span>Use Custom Rules</span>
              </label>
            </div>

            {robotsWarnings.length > 0 && (
              <div className="space-y-2">
                {robotsWarnings.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2 font-semibold"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            )}

            <textarea
              rows={9}
              value={seoSystem.robotsTxt.customContent}
              onChange={(e) =>
                setSeoSystem({
                  ...seoSystem,
                  robotsTxt: {
                    ...seoSystem.robotsTxt,
                    useCustom: true,
                    customContent: e.target.value,
                  },
                })
              }
              className="w-full p-4 font-mono text-xs bg-slate-950 text-emerald-300 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
            <p className="text-[11px] text-slate-500">
              Note: `/admin` and `/api/` are always protected by the server route handler, and `Sitemap:` is automatically appended if omitted.
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Domain/Canonical Settings, Indexing Controls, and 404 Monitor */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3. Canonical, Domain & Search Visibility Controls */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-4 h-4 text-[#0066FF]" />
              <h2 className="text-sm font-black text-slate-900">
                3. Domain, Canonicals & Crawl Controls
              </h2>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Preferred Canonical Domain
              </label>
              <input
                type="url"
                value={seoSystem.siteUrl}
                onChange={(e) =>
                  setSeoSystem({ ...seoSystem, siteUrl: e.target.value.replace(/\/$/, '') })
                }
                placeholder="https://www.ecomvanta.in"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl"
              />
            </div>

            <div className="space-y-2.5 text-xs pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 cursor-pointer">
                <span>Enforce HTTPS Canonical URLs</span>
                <input
                  type="checkbox"
                  checked={seoSystem.forceHttps}
                  onChange={(e) =>
                    setSeoSystem({ ...seoSystem, forceHttps: e.target.checked })
                  }
                  className="rounded text-[#0066FF]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 cursor-pointer">
                <span>Noindex Paginated URLs (`?page=2`, etc.)</span>
                <input
                  type="checkbox"
                  checked={seoSystem.paginationControl.noindexPaginated}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      paginationControl: {
                        ...seoSystem.paginationControl,
                        noindexPaginated: e.target.checked,
                      },
                    })
                  }
                  className="rounded text-[#0066FF]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 cursor-pointer">
                <span>Noindex Filtered/Sort Parameter URLs (`?filter=`, `?sort=`)</span>
                <input
                  type="checkbox"
                  checked={seoSystem.paginationControl.noindexFiltered}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      paginationControl: {
                        ...seoSystem.paginationControl,
                        noindexFiltered: e.target.checked,
                      },
                    })
                  }
                  className="rounded text-[#0066FF]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200 font-bold text-rose-900 cursor-pointer">
                <span>Discourage Search Engines from Indexing Site (Global Noindex)</span>
                <input
                  type="checkbox"
                  checked={seoSystem.globalNoindex}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      globalNoindex: e.target.checked,
                    })
                  }
                  className="rounded text-rose-600"
                />
              </label>
            </div>
          </div>

          {/* 4. Live 404 Monitor */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black text-slate-900">
                  4. Live 404 Error Monitor ({(seoSystem.notFoundLogs || []).length})
                </h2>
                <p className="text-[11px] text-slate-500">
                  Captured automatically when visitors hit a non-existent URL.
                </p>
              </div>
              {(seoSystem.notFoundLogs || []).length > 0 && (
                <button
                  type="button"
                  onClick={handleClear404Logs}
                  className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>

            {(seoSystem.notFoundLogs || []).length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No 404 errors recorded yet. When a missing route is requested, it will appear here so you can create a 301 redirect.
              </p>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto text-xs">
                {(seoSystem.notFoundLogs || []).map((log) => (
                  <div
                    key={log.id}
                    className="py-2.5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="font-mono font-bold text-rose-700 truncate">{log.path}</p>
                      <p className="text-[10px] text-slate-400">
                        {log.hits} hit(s) • Last: {new Date(log.lastSeen).toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/admin/seo/redirects?source=${encodeURIComponent(log.path)}`}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-[#0066FF] text-[#0066FF] hover:text-white rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>Fix 301</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
