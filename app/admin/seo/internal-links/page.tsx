'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Search,
  Sparkles,
  Loader2,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { buildSiteSeoInventory, getContextualLinkSuggestions } from '@/lib/seoEngine';

export default function InternalLinksManagerPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'matrix' | 'orphans' | 'broken' | 'anchors' | 'suggester'>('matrix');
  const [search, setSearch] = useState('');
  const [selectedRouteForSuggestions, setSelectedRouteForSuggestions] = useState<string>('');
  const [copiedHtml, setCopiedHtml] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/content', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setCmsData(json.data);
          const firstBlog = json.data.blogs?.[0];
          if (firstBlog) {
            setSelectedRouteForSuggestions(`/blogs/${firstBlog.slug}`);
          }
        }
      } catch (err) {
        console.error('Failed to load internal linking manager:', err);
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

  const contextualSuggestions = useMemo(() => {
    if (!cmsData || !selectedRouteForSuggestions || !audit) return [];
    const page = audit.pages.find((p) => p.urlPath === selectedRouteForSuggestions);
    if (!page) return [];
    return getContextualLinkSuggestions({
      currentUrlPath: page.urlPath,
      title: page.title,
      focusKeyword: page.seo.focusKeyword || '',
      secondaryKeywords: page.seo.secondaryKeywords || [],
      htmlContent: `${page.excerpt} ${page.htmlContent}`,
      siteContent: cmsData,
    });
  }, [cmsData, selectedRouteForSuggestions, audit]);

  if (loading || !audit || !cmsData) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  const orphanItems = audit.orphanPages;
  const brokenRecords = audit.brokenInternalLinks;
  const orphanPathsSet = new Set(orphanItems.map((o) => o.urlPath));
  const totalInternalLinksCount = audit.pages.reduce(
    (sum, p) => sum + p.outgoingLinks.length,
    0
  );

  const filteredMatrix = audit.pages.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.urlPath.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyAnchor = (url: string, anchor: string) => {
    const html = `<a href="${url}">${anchor}</a>`;
    navigator.clipboard.writeText(html);
    setCopiedHtml(url);
    setTimeout(() => setCopiedHtml(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Advanced Internal Linking Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit incoming/outgoing internal links, rescue orphan pages, detect broken internal URLs, and generate contextual anchor text recommendations.
          </p>
        </div>
        <Link
          href="/admin/blogs"
          className="px-4 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/20"
        >
          Open Blog Editor
        </Link>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Total Internal Links</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {totalInternalLinksCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Across {audit.pages.length} pages</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Orphan Pages</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{orphanItems.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">0 incoming content links</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Broken Internal Links</span>
          <p className="text-2xl font-black text-rose-600 mt-1">{brokenRecords.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Unresolved target URLs</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Anchor Warnings</span>
          <p className="text-2xl font-black text-purple-600 mt-1">
            {audit.anchorWarnings.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Generic or overused anchors</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'matrix', label: `Link Distribution (${audit.pages.length})` },
              { id: 'orphans', label: `Orphan Pages (${orphanItems.length})` },
              { id: 'broken', label: `Broken Links (${brokenRecords.length})` },
              {
                id: 'anchors',
                label: `Anchor Text Audit (${audit.anchorWarnings.length})`,
              },
              { id: 'suggester', label: 'Contextual Link Finder' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-[#0066FF] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'matrix' && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter routes..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        )}
      </div>

      {/* Tab 1: Link Distribution Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Page Title & URL</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Incoming Internal Links</th>
                <th className="py-3 px-3">Outgoing Internal Links</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredMatrix.map((item) => {
                const isOrphan = orphanPathsSet.has(item.urlPath);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.urlPath}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {item.contentType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                      {item.incomingLinks.length} incoming
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                      {item.outgoingLinks.length} outgoing
                    </td>
                    <td className="py-3.5 px-3">
                      {isOrphan ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" /> Orphan Page
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" /> Linked
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRouteForSuggestions(item.urlPath);
                          setActiveTab('suggester');
                        }}
                        className="px-3 py-1 bg-blue-50 hover:bg-[#0066FF] text-[#0066FF] hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Find Link Opportunities
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Orphan Pages */}
      {activeTab === 'orphans' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-black text-slate-900">
              Orphan Pages Report ({orphanItems.length})
            </h2>
            <p className="text-xs text-slate-500">
              Orphan pages have zero detected contextual internal links pointing to them from other content, making them harder for Googlebot to discover and pass PageRank to.
            </p>
          </div>

          {orphanItems.length === 0 ? (
            <div className="p-8 text-center text-emerald-700 bg-emerald-50 rounded-xl text-xs font-bold">
              Zero orphan pages detected! Every published page receives at least one internal link.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {orphanItems.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    <p className="text-[11px] font-mono text-slate-400">
                      {item.urlPath} • Focus Keyword: {item.seo.focusKeyword || 'Not set'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyAnchor(item.urlPath, item.seo.focusKeyword || item.title)
                      }
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      {copiedHtml === item.urlPath ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied HTML Link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy HTML Anchor</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Broken Internal Links */}
      {activeTab === 'broken' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <h2 className="text-sm font-black text-slate-900">
            Broken Internal Links ({brokenRecords.length})
          </h2>
          {brokenRecords.length === 0 ? (
            <div className="p-8 text-center text-emerald-700 bg-emerald-50 rounded-xl text-xs font-bold">
              No broken internal links detected across your blog articles and pages!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {brokenRecords.map((rec, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">
                      Source: <span className="font-mono">{rec.fromPath}</span> ({rec.fromTitle})
                    </p>
                    <p className="text-rose-600 font-mono mt-0.5">
                      Broken Target: {rec.brokenHref} • Anchor: &ldquo;{rec.anchorText}&rdquo;
                    </p>
                  </div>
                  <Link
                    href={`/admin/seo/redirects?source=${encodeURIComponent(rec.brokenHref)}`}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 font-bold rounded-lg"
                  >
                    Create Redirect
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Anchor Text Quality Audit */}
      {activeTab === 'anchors' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <h2 className="text-sm font-black text-slate-900">
            Anchor Text Quality & Over-Optimization Warnings
          </h2>
          {audit.anchorWarnings.length === 0 ? (
            <div className="p-8 text-center text-emerald-700 bg-emerald-50 rounded-xl text-xs font-bold">
              All internal link anchor texts look natural and descriptive!
            </div>
          ) : (
            <div className="space-y-2.5">
              {audit.anchorWarnings.map((w, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-950">
                      Anchor: &ldquo;{w.anchorText}&rdquo; → <span className="font-mono">{w.targetPaths.join(', ')}</span> (Used {w.count}x)
                    </p>
                    <p className="text-amber-800 mt-0.5">{w.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Contextual Link Suggester */}
      {activeTab === 'suggester' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <span>Smart Contextual Internal Link Recommender</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select any page or blog article to discover relevant published pages to link to based on semantic keyword overlap.
              </p>
            </div>

            <select
              value={selectedRouteForSuggestions}
              onChange={(e) => setSelectedRouteForSuggestions(e.target.value)}
              className="px-3.5 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-slate-50 max-w-sm"
            >
              {audit.pages.map((item) => (
                <option key={item.urlPath} value={item.urlPath}>
                  {item.urlPath} — {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contextualSuggestions.map((s) => {
              const primaryAnchor = s.suggestedAnchorTexts[0] || s.targetTitle;
              return (
                <div
                  key={s.targetPath}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-[#0066FF]">
                        {s.contentType} • Relevance {s.relevanceScore}%
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{s.targetPath}</span>
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">{s.targetTitle}</p>
                    <p className="text-[11px] text-slate-600">
                      Recommended Anchor Text:{' '}
                      <strong className="text-slate-900 underline decoration-blue-400">
                        {primaryAnchor}
                      </strong>
                    </p>
                    {s.matchedTerms.length > 0 && (
                      <p className="text-[10px] text-slate-400">
                        Matched terms: {s.matchedTerms.join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                    <button
                      type="button"
                      onClick={() => handleCopyAnchor(s.targetPath, primaryAnchor)}
                      className="px-3 py-1.5 bg-white hover:bg-[#0066FF] text-slate-700 hover:text-white border border-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      {copiedHtml === s.targetPath ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied HTML Anchor!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy HTML Link</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={s.targetPath}
                      target="_blank"
                      className="text-[11px] font-bold text-[#0066FF] hover:underline flex items-center gap-1"
                    >
                      <span>Preview Target</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
