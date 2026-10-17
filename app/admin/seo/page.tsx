'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Gauge,
  Plus,
  BookOpen,
  FileWarning,
  ImageOff,
  Copy,
  EyeOff,
  Link2,
  ArrowLeftRight,
  Code2,
  LineChart,
  ExternalLink,
  Loader2,
  CheckSquare,
  Square,
  Trash2,
  Table2,
  Cpu,
  Search,
  ArrowUpRight,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { buildSiteSeoInventory, SiteSeoAuditSummary, SiteSeoPageEntry } from '@/lib/seoEngine';
import { SeoTaskItem } from '@/lib/seoTypes';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

export default function SeoDashboardPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIssueTab, setActiveIssueTab] = useState<
    'all' | 'missing_meta' | 'duplicates' | 'missing_alt' | 'noindex' | 'orphan'
  >('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/content', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setCmsData(json.data);
        }
      } catch (err) {
        console.error('Failed to load SEO dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const audit: SiteSeoAuditSummary | null = useMemo(() => {
    if (!cmsData) return null;
    return buildSiteSeoInventory(cmsData);
  }, [cmsData]);

  const tasks = cmsData?.seoSystem?.seoTasks || [];
  const gsc = cmsData?.seoSystem?.integrations;

  const updateTasks = async (updatedTasks: SeoTaskItem[]) => {
    if (!cmsData) return;
    const updatedSeoSystem = {
      ...cmsData.seoSystem,
      seoTasks: updatedTasks,
    };
    setCmsData({ ...cmsData, seoSystem: updatedSeoSystem });
    saveLocalCmsContent({ seoSystem: updatedSeoSystem });
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'seoSystem',
        data: updatedSeoSystem,
      }),
    });
  };

  const handleToggleTask = (id: string) => {
    const next = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateTasks(next);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const item: SeoTaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: 'SEO optimization action item',
      category: 'on-page',
      priority: newTaskPriority,
      completed: false,
      adminHref: '/admin/seo',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setNewTaskTitle('');
    updateTasks([item, ...tasks]);
  };

  const handleDeleteTask = (id: string) => {
    updateTasks(tasks.filter((t) => t.id !== id));
  };

  if (loading || !audit || !cmsData) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        <p className="text-xs font-bold text-slate-500">
          Auditing all pages, blog articles, metadata, internal links & schema...
        </p>
      </div>
    );
  }

  const duplicatePathsSet = new Set(
    audit.duplicateMetadataPages.flatMap((d) => d.paths)
  );
  const orphanPathsSet = new Set(audit.orphanPages.map((p) => p.urlPath));
  const canonicalIssuePathsSet = new Set(
    audit.canonicalIssuePages.map((p) => p.urlPath)
  );

  const filteredItems = audit.pages.filter((page) => {
    const matchesQuery =
      page.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      page.urlPath.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (page.seo.focusKeyword || '').toLowerCase().includes(searchFilter.toLowerCase());
    if (!matchesQuery) return false;
    if (activeIssueTab === 'missing_meta') {
      return !page.hasCustomSeoTitle || !page.hasCustomMetaDescription;
    }
    if (activeIssueTab === 'duplicates') {
      return duplicatePathsSet.has(page.urlPath);
    }
    if (activeIssueTab === 'missing_alt') {
      return page.analysis.missingAltCount > 0;
    }
    if (activeIssueTab === 'noindex') {
      return (
        page.effectiveRobotsIndex === 'noindex' ||
        canonicalIssuePathsSet.has(page.urlPath)
      );
    }
    if (activeIssueTab === 'orphan') {
      return orphanPathsSet.has(page.urlPath);
    }
    return true;
  });

  const getEditHref = (page: SiteSeoPageEntry) => {
    return page.adminEditUrl || `/admin/seo/bulk-editor?route=${encodeURIComponent(page.urlPath)}`;
  };

  return (
    <div className="space-y-6 max-w-7xl pb-20">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#081325] via-[#0B1E36] to-[#0052cc] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-extrabold">
              <Gauge className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>WordPress RankMath & Yoast Grade SEO Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              EcomVanta Complete SEO Management Suite
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Real-time on-page SEO audits, metadata control, internal link intelligence, technical sitemaps, 301/302 redirect engine, and JSON-LD schema markup connected directly to Next.js server rendering.
            </p>
          </div>

          {/* Overall Health Score Ring */}
          <div className="flex items-center gap-4 bg-slate-950/50 backdrop-blur-md border border-white/15 rounded-2xl p-4 shrink-0">
            <div
              className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black border-2 ${
                audit.averageSeoScore >= 80
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : audit.averageSeoScore >= 60
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-rose-500/20 border-rose-400 text-rose-300'
              }`}
            >
              <span className="text-xl leading-none">{audit.averageSeoScore}</span>
              <span className="text-[9px] uppercase tracking-wider opacity-80">/ 100</span>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                Site SEO Health Score
              </p>
              <p className="text-sm font-black text-white mt-0.5">
                {audit.pages.length} Total Audited URLs
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {audit.totalPublishedBlogs} Published Blogs • {audit.totalDraftBlogs} Drafts • {audit.totalScheduledBlogs} Scheduled
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/blogs/new"
            className="px-4 py-2 bg-[#00C2FF] hover:bg-white text-slate-950 font-black rounded-xl text-xs transition-all flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write SEO Blog Article</span>
          </Link>
          <Link
            href="/admin/seo/bulk-editor"
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-white/15"
          >
            <Table2 className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>Bulk Metadata Editor</span>
          </Link>
          <Link
            href="/admin/seo/internal-links"
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-white/15"
          >
            <Link2 className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>Internal Links ({audit.orphanPages.length} Orphans)</span>
          </Link>
          <Link
            href="/admin/seo/redirects"
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-white/15"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>Manage Redirects ({(cmsData.seoSystem.redirects || []).length})</span>
          </Link>
          <Link
            href="/admin/seo/technical"
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-white/15"
          >
            <Cpu className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>Sitemaps & Robots.txt</span>
          </Link>
          <Link
            href="/admin/seo/schema"
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-white/15"
          >
            <Code2 className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>JSON-LD Schema</span>
          </Link>
        </div>
      </div>

      {/* Real-Time Diagnostic KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <button
          type="button"
          onClick={() => setActiveIssueTab('all')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-left hover:border-[#0066FF] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Blog Articles</span>
            <BookOpen className="w-4 h-4 text-[#0066FF]" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {audit.totalPublishedBlogs}
            <span className="text-xs font-semibold text-slate-400 ml-1">
              pub / {audit.totalDraftBlogs} draft
            </span>
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {audit.totalScheduledBlogs} scheduled
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveIssueTab('missing_meta')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-left hover:border-amber-500 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Missing Meta</span>
            <FileWarning className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {audit.missingSeoTitlePages.length + audit.missingMetaDescPages.length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {audit.missingSeoTitlePages.length} titles • {audit.missingMetaDescPages.length} desc
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveIssueTab('duplicates')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-left hover:border-rose-500 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Duplicate Meta</span>
            <Copy className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {audit.duplicateMetadataPages.length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Duplicate groups detected
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveIssueTab('missing_alt')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-left hover:border-amber-500 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Missing Alt Text</span>
            <ImageOff className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {audit.missingImageAltPages.length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Pages missing image alt
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveIssueTab('noindex')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-left hover:border-purple-500 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Noindex / Canon.</span>
            <EyeOff className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {audit.noindexPages.length + audit.canonicalIssuePages.length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {audit.noindexPages.length} noindex • {audit.canonicalIssuePages.length} canonical
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveIssueTab('orphan')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-left hover:border-[#0066FF] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Orphan Pages</span>
            <Link2 className="w-4 h-4 text-[#0066FF]" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{audit.orphanPages.length}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {audit.brokenInternalLinks.length} broken links
          </p>
        </button>
      </div>

      {/* Main Content Split: Site-Wide SEO Audit Table (8 cols) + Pending Tasks & GSC Status (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Complete SEO Content Audit Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Live Site-Wide SEO Content Audit
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time evaluation of every indexable route, blog article, service page, and case study.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by URL, title, keyword..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              </div>
            </div>

            {/* Issue Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', label: `All URLs (${audit.pages.length})` },
                  {
                    id: 'missing_meta',
                    label: `Missing Custom Meta (${
                      audit.pages.filter((i) => !i.hasCustomSeoTitle || !i.hasCustomMetaDescription)
                        .length
                    })`,
                  },
                  {
                    id: 'duplicates',
                    label: `Duplicate Meta (${duplicatePathsSet.size})`,
                  },
                  {
                    id: 'missing_alt',
                    label: `Missing Alt (${audit.missingImageAltPages.length})`,
                  },
                  {
                    id: 'noindex',
                    label: `Noindex / Canonical (${
                      audit.noindexPages.length + audit.canonicalIssuePages.length
                    })`,
                  },
                  {
                    id: 'orphan',
                    label: `Orphan Pages (${audit.orphanPages.length})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveIssueTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeIssueTab === tab.id
                      ? 'bg-[#0066FF] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Page / URL</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">SEO Score</th>
                  <th className="py-3 px-3">Diagnostics</th>
                  <th className="py-3 px-3">Links (In/Out)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      No pages match this diagnostic filter. Great job!
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((page) => {
                    const score = page.analysis.overallScore;
                    const isDup = duplicatePathsSet.has(page.urlPath);
                    return (
                      <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-bold text-slate-900 truncate">{page.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono truncate">
                            {page.urlPath}
                          </div>
                          {page.seo.focusKeyword && (
                            <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-50 text-[#0066FF]">
                              KW: {page.seo.focusKeyword}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                            {page.contentType}
                          </span>
                          {page.status !== 'published' && (
                            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                              {page.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black ${
                              score >= 80
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : score >= 55
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {score}/100
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {!page.hasCustomSeoTitle && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                Auto Title
                              </span>
                            )}
                            {!page.hasCustomMetaDescription && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                Auto Desc
                              </span>
                            )}
                            {isDup && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                Duplicate Meta
                              </span>
                            )}
                            {page.analysis.missingAltCount > 0 && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                {page.analysis.missingAltCount} Missing Alt
                              </span>
                            )}
                            {page.effectiveRobotsIndex === 'noindex' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                noindex
                              </span>
                            )}
                            {page.hasCustomSeoTitle &&
                              page.hasCustomMetaDescription &&
                              !isDup &&
                              page.analysis.missingAltCount === 0 &&
                              page.effectiveRobotsIndex !== 'noindex' && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                                  Healthy
                                </span>
                              )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[11px] text-slate-600">
                          <span title="Incoming internal links">{page.incomingLinks.length} in</span> /{' '}
                          <span title="Outgoing internal links">{page.outgoingLinks.length} out</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href={getEditHref(page)}
                              className="px-2.5 py-1 bg-[#0066FF]/10 hover:bg-[#0066FF] text-[#0066FF] hover:text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              Optimize
                            </Link>
                            <Link
                              href={page.urlPath}
                              target="_blank"
                              className="p-1 text-slate-400 hover:text-slate-700"
                              title="View Live Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Google Search Console Widget, Pending SEO Tasks & Recent Updates */}
        <div className="lg:col-span-4 space-y-6">
          {/* Google Search Console Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Google Search Console
                </h3>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  gsc?.connected
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {gsc?.connected ? 'Connected' : 'Not Connected'}
              </span>
            </div>

            {gsc?.connected && gsc.syncedMetrics ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Property: <strong className="font-mono">{gsc.propertyUrl}</strong>
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Search Clicks
                    </span>
                    <p className="text-lg font-black text-slate-900">
                      {gsc.syncedMetrics.totalClicks}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Impressions
                    </span>
                    <p className="text-lg font-black text-slate-900">
                      {gsc.syncedMetrics.totalImpressions}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <p className="text-xs font-bold text-slate-800">
                  Search Console API Not Yet Connected
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Above metrics reflect real internal CMS & HTML SEO audits. Connect Google Search Console or import a GSC performance report to view actual Google clicks, impressions, CTR, and average position.
                </p>
              </div>
            )}

            <Link
              href="/admin/seo/search-console"
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{gsc?.connected ? 'View Search Console Analytics' : 'Configure Search Console'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pending SEO Action Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Pending SEO Team Tasks ({tasks.filter((t) => !t.completed).length})
              </h3>
            </div>

            <form onSubmit={handleAddTask} className="flex gap-1.5">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add new SEO task..."
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as any)}
                className="px-2 py-1.5 text-[11px] font-bold border border-slate-200 rounded-lg bg-slate-50"
              >
                <option value="high">High</option>
                <option value="medium">Med</option>
                <option value="low">Low</option>
              </select>
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-[#0066FF] text-white rounded-lg text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-2.5 rounded-xl border flex items-start justify-between gap-2 transition-colors ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200/60 opacity-60'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    className="flex items-start gap-2 text-left flex-1"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </p>
                      <span
                        className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                          task.priority === 'high'
                            ? 'bg-rose-50 text-rose-700'
                            : task.priority === 'medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-slate-300 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Updated Content */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2.5">
              Recently Updated Content
            </h3>
            <div className="space-y-2.5">
              {audit.pages.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <Link
                      href={getEditHref(item)}
                      className="font-bold text-slate-800 hover:text-[#0066FF] truncate block"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[10px] text-slate-400 font-mono truncate">
                      {item.urlPath} • Updated {item.updatedAt}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-700 shrink-0">
                    {item.analysis.overallScore}/100
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
