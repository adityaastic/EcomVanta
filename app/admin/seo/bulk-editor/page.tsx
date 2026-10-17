'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Save,
  Check,
  Loader2,
  Download,
  Upload,
  Sparkles,
  ExternalLink,
  X,
} from 'lucide-react';
import { SiteContentData, BlogPostItem, createEmptySeoMeta } from '@/lib/cmsTypes';
import { SeoMetaItem, ContentTypeKey } from '@/lib/seoTypes';
import { buildSiteSeoInventory } from '@/lib/seoEngine';
import { resolveSeoTemplate } from '@/lib/seoAnalyzer';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

interface BulkEditRow {
  routePath: string;
  contentType: ContentTypeKey;
  title: string;
  category: string;
  status: string;
  seoScore: number;
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  dirty?: boolean;
}

export default function BulkSeoEditorPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [rows, setRows] = useState<BulkEditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | ContentTypeKey>('all');
  const [issueFilter, setIssueFilter] = useState<'all' | 'missing' | 'duplicate' | 'low_score' | 'noindex'>('all');

  // Template generator modal state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [titleTemplate, setTitleTemplate] = useState('{{title}} {{sep}} {{siteName}}');
  const [descTemplate, setDescTemplate] = useState(
    'Explore {{title}} by {{siteName}}. Data-driven marketplace management and eCommerce growth solutions.'
  );
  const [onlyFillEmpty, setOnlyFillEmpty] = useState(true);

  // CSV Import preview state
  const [csvPreviewRows, setCsvPreviewRows] = useState<BulkEditRow[] | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/content', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          const data: SiteContentData = json.data;
          setCmsData(data);
          const inventory = buildSiteSeoInventory(data);
          const initialRows: BulkEditRow[] = inventory.pages.map((item) => ({
            routePath: item.urlPath,
            contentType: item.contentType,
            title: item.title,
            category: item.category || item.contentType,
            status: item.status,
            seoScore: item.analysis.overallScore,
            focusKeyword: item.seo.focusKeyword || '',
            seoTitle: item.seo.seoTitle || item.effectiveTitle || '',
            metaDescription: item.seo.metaDescription || item.effectiveDescription || '',
            canonicalUrl: item.seo.canonicalUrl || item.effectiveCanonical || '',
            robotsIndex: item.effectiveRobotsIndex !== 'noindex',
            dirty: false,
          }));
          setRows(initialRows);
        }
      } catch (err) {
        console.error('Failed to load bulk SEO editor:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Detect duplicate titles & descriptions across current rows
  const duplicateTracker = useMemo(() => {
    const titleCounts = new Map<string, number>();
    const descCounts = new Map<string, number>();
    for (const r of rows) {
      const t = r.seoTitle.trim().toLowerCase();
      const d = r.metaDescription.trim().toLowerCase();
      if (t) titleCounts.set(t, (titleCounts.get(t) || 0) + 1);
      if (d) descCounts.set(d, (descCounts.get(d) || 0) + 1);
    }
    return { titleCounts, descCounts };
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.routePath.toLowerCase().includes(search.toLowerCase()) ||
        r.focusKeyword.toLowerCase().includes(search.toLowerCase()) ||
        r.seoTitle.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;
      if (typeFilter !== 'all' && r.contentType !== typeFilter) return false;

      if (issueFilter === 'missing') {
        return !r.seoTitle.trim() || !r.metaDescription.trim() || !r.focusKeyword.trim();
      }
      if (issueFilter === 'duplicate') {
        const dupT = (duplicateTracker.titleCounts.get(r.seoTitle.trim().toLowerCase()) || 0) > 1;
        const dupD =
          (duplicateTracker.descCounts.get(r.metaDescription.trim().toLowerCase()) || 0) > 1;
        return dupT || dupD;
      }
      if (issueFilter === 'low_score') {
        return r.seoScore < 70;
      }
      if (issueFilter === 'noindex') {
        return !r.robotsIndex;
      }
      return true;
    });
  }, [rows, search, typeFilter, issueFilter, duplicateTracker]);

  const handleRowChange = (routePath: string, patch: Partial<BulkEditRow>) => {
    setRows((prev) =>
      prev.map((r) => (r.routePath === routePath ? { ...r, ...patch, dirty: true } : r))
    );
  };

  const dirtyCount = rows.filter((r) => r.dirty).length;

  const handleSaveAll = async () => {
    if (!cmsData) return;
    if (dirtyCount > 0) {
      const confirmed = window.confirm(
        `Confirm Bulk SEO Update:\n\nYou are about to update SEO metadata for ${dirtyCount} modified page(s). Proceed?`
      );
      if (!confirmed) return;
    }

    setSaving(true);
    setSavedSuccess(false);

    try {
      const updatedPageSeo = { ...(cmsData.seoSystem.pageSeo || {}) };
      const updatedBlogs: BlogPostItem[] = cmsData.blogs.map((blog) => {
        const route = `/blogs/${blog.slug}`;
        const row = rows.find((r) => r.routePath === route);
        if (!row) return blog;
        const baseSeo = blog.seo || createEmptySeoMeta('blog');
        const nextSeo: SeoMetaItem = {
          ...baseSeo,
          focusKeyword: row.focusKeyword,
          seoTitle: row.seoTitle,
          metaDescription: row.metaDescription,
          canonicalUrl: row.canonicalUrl,
          robotsIndex: row.robotsIndex ? 'index' : 'noindex',
          isCustomized: true,
        };
        updatedPageSeo[route] = nextSeo;
        return {
          ...blog,
          seo: nextSeo,
        };
      });

      for (const row of rows) {
        if (row.contentType !== 'blog') {
          const existing = updatedPageSeo[row.routePath] || createEmptySeoMeta(row.contentType);
          updatedPageSeo[row.routePath] = {
            ...existing,
            focusKeyword: row.focusKeyword,
            seoTitle: row.seoTitle,
            metaDescription: row.metaDescription,
            canonicalUrl: row.canonicalUrl,
            robotsIndex: row.robotsIndex ? 'index' : 'noindex',
            isCustomized: true,
          };
        }
      }

      const updatedSeoSystem = {
        ...cmsData.seoSystem,
        pageSeo: updatedPageSeo,
      };

      saveLocalCmsContent({ blogs: updatedBlogs, seoSystem: updatedSeoSystem });

      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'blogs', data: updatedBlogs }),
      });

      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'seoSystem', data: updatedSeoSystem }),
      });

      setRows((prev) => prev.map((r) => ({ ...r, dirty: false })));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      alert('Error saving bulk SEO changes');
    } finally {
      setSaving(false);
    }
  };

  // Apply Template Preview & Confirmation
  const handleApplyTemplates = () => {
    const siteName = cmsData?.seoSystem?.schemaOrg?.orgName || 'EcomVanta';
    const sep = cmsData?.seoSystem?.titleSeparator || '|';
    setRows((prev) =>
      prev.map((row) => {
        const isFiltered = filteredRows.some((f) => f.routePath === row.routePath);
        if (!isFiltered) return row;

        const resolvedTitle = resolveSeoTemplate(titleTemplate, {
          title: row.title,
          category: row.category,
          siteName,
          sep,
        });
        const resolvedDesc = resolveSeoTemplate(descTemplate, {
          title: row.title,
          category: row.category,
          siteName,
          sep,
        });

        const nextTitle = onlyFillEmpty && row.seoTitle.trim() ? row.seoTitle : resolvedTitle;
        const nextDesc =
          onlyFillEmpty && row.metaDescription.trim() ? row.metaDescription : resolvedDesc;

        return {
          ...row,
          seoTitle: nextTitle,
          metaDescription: nextDesc,
          dirty: true,
        };
      })
    );
    setShowTemplateModal(false);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'routePath',
      'contentType',
      'title',
      'focusKeyword',
      'seoTitle',
      'metaDescription',
      'canonicalUrl',
      'robotsIndex',
    ];
    const escapeCsv = (val: string | boolean) => {
      const s = String(val ?? '').replace(/"/g, '""');
      return `"${s}"`;
    };
    const csvLines = [
      headers.join(','),
      ...rows.map((r) =>
        [
          r.routePath,
          r.contentType,
          r.title,
          r.focusKeyword,
          r.seoTitle,
          r.metaDescription,
          r.canonicalUrl,
          r.robotsIndex,
        ]
          .map(escapeCsv)
          .join(',')
      ),
    ];
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecomvanta-seo-metadata-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import CSV with preview
  const handleImportCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) return;

      const parseCsvLine = (line: string): string[] => {
        const result: string[] = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const ch = line[i];
          if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
              cur += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (ch === ',' && !inQuotes) {
            result.push(cur);
            cur = '';
          } else {
            cur += ch;
          }
        }
        result.push(cur);
        return result;
      };

      const importedMap = new Map<string, Partial<BulkEditRow>>();
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);
        const routePath = cols[0]?.trim();
        if (!routePath) continue;
        importedMap.set(routePath, {
          focusKeyword: cols[3] ?? '',
          seoTitle: cols[4] ?? '',
          metaDescription: cols[5] ?? '',
          canonicalUrl: cols[6] ?? '',
          robotsIndex: cols[7]?.toLowerCase() !== 'false',
        });
      }

      const preview = rows.map((r) => {
        const match = importedMap.get(r.routePath);
        if (!match) return r;
        return {
          ...r,
          ...match,
          dirty: true,
        };
      });
      setCsvPreviewRows(preview);
    };
    reader.readAsText(file);
    e.target.value = '';
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Bulk SEO Metadata Editor
            </h1>
            {dirtyCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
                {dirtyCount} Unsaved Changes
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Inspect and edit SEO titles, meta descriptions, focus keywords, canonical URLs, and indexation rules across all pages at once.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTemplateModal(true)}
            className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl text-xs border border-purple-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Template</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <label className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV</span>
            <input type="file" accept=".csv" onChange={handleImportCsv} className="hidden" />
          </label>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved All!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Bulk Changes ({dirtyCount})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
          >
            <option value="all">All Content Types ({rows.length})</option>
            <option value="blog">Blog Articles</option>
            <option value="service">Service Pages</option>
            <option value="caseStudy">Case Studies</option>
            <option value="staticPage">Core Static Pages</option>
          </select>

          <select
            value={issueFilter}
            onChange={(e) => setIssueFilter(e.target.value as any)}
            className="px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
          >
            <option value="all">All Metadata States</option>
            <option value="missing">Missing Title / Description / Keyword</option>
            <option value="duplicate">Duplicate Titles or Descriptions</option>
            <option value="low_score">SEO Score Under 70</option>
            <option value="noindex">Noindex Pages</option>
          </select>
        </div>

        <div className="relative w-full lg:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search URL, title, focus keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Bulk Editor Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-56">Route & Score</th>
                <th className="py-3 px-3 w-44">Focus Keyword</th>
                <th className="py-3 px-3 w-72">SEO Title (50–60 chars)</th>
                <th className="py-3 px-3 w-80">Meta Description (120–160 chars)</th>
                <th className="py-3 px-3 w-36">Indexation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRows.map((row) => {
                const titleLen = row.seoTitle.trim().length;
                const descLen = row.metaDescription.trim().length;
                const isDupTitle =
                  (duplicateTracker.titleCounts.get(row.seoTitle.trim().toLowerCase()) || 0) > 1;
                const isDupDesc =
                  (duplicateTracker.descCounts.get(row.metaDescription.trim().toLowerCase()) || 0) >
                  1;

                return (
                  <tr
                    key={row.routePath}
                    className={`align-top transition-colors ${
                      row.dirty ? 'bg-blue-50/30' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-slate-100 text-slate-700">
                          {row.contentType}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-black ${
                            row.seoScore >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : row.seoScore >= 55
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {row.seoScore}/100
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 line-clamp-2">{row.title}</p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                        <span className="truncate">{row.routePath}</span>
                        <Link href={row.routePath} target="_blank" className="hover:text-[#0066FF]">
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <input
                        type="text"
                        value={row.focusKeyword}
                        onChange={(e) =>
                          handleRowChange(row.routePath, { focusKeyword: e.target.value })
                        }
                        placeholder="Primary focus keyword..."
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </td>

                    <td className="py-3.5 px-3 space-y-1">
                      <input
                        type="text"
                        value={row.seoTitle}
                        onChange={(e) =>
                          handleRowChange(row.routePath, { seoTitle: e.target.value })
                        }
                        placeholder="SEO Title..."
                        className={`w-full px-2.5 py-1.5 text-xs font-semibold border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
                          isDupTitle ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                      <div className="flex items-center justify-between text-[10px]">
                        <span
                          className={
                            titleLen >= 45 && titleLen <= 65
                              ? 'text-emerald-600 font-semibold'
                              : 'text-amber-600 font-semibold'
                          }
                        >
                          {titleLen} chars
                        </span>
                        {isDupTitle && (
                          <span className="text-rose-600 font-bold">Duplicate Title!</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 space-y-1">
                      <textarea
                        rows={2}
                        value={row.metaDescription}
                        onChange={(e) =>
                          handleRowChange(row.routePath, { metaDescription: e.target.value })
                        }
                        placeholder="Meta description..."
                        className={`w-full px-2.5 py-1.5 text-xs border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
                          isDupDesc ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                      <div className="flex items-center justify-between text-[10px]">
                        <span
                          className={
                            descLen >= 120 && descLen <= 165
                              ? 'text-emerald-600 font-semibold'
                              : 'text-amber-600 font-semibold'
                          }
                        >
                          {descLen} chars
                        </span>
                        {isDupDesc && (
                          <span className="text-rose-600 font-bold">Duplicate Desc!</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 space-y-2">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.robotsIndex}
                          onChange={(e) =>
                            handleRowChange(row.routePath, { robotsIndex: e.target.checked })
                          }
                          className="rounded text-[#0066FF]"
                        />
                        <span>{row.robotsIndex ? 'Index' : 'Noindex'}</span>
                      </label>
                      <input
                        type="text"
                        value={row.canonicalUrl}
                        onChange={(e) =>
                          handleRowChange(row.routePath, { canonicalUrl: e.target.value })
                        }
                        placeholder="Canonical URL"
                        className="w-full px-2 py-1 text-[10px] font-mono border border-slate-200 rounded bg-slate-50"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template Preview Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">
                Preview & Apply Bulk SEO Template ({filteredRows.length} Filtered Rows)
              </h3>
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  SEO Title Template (`{'{{title}}'}`, `{'{{category}}'}`, `{'{{sep}}'}`, `{'{{siteName}}'}`)
                </label>
                <input
                  type="text"
                  value={titleTemplate}
                  onChange={(e) => setTitleTemplate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Meta Description Template
                </label>
                <textarea
                  rows={2}
                  value={descTemplate}
                  onChange={(e) => setDescTemplate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={onlyFillEmpty}
                  onChange={(e) => setOnlyFillEmpty(e.target.checked)}
                  className="rounded text-[#0066FF]"
                />
                <span>Safe Mode: Only populate empty fields (Never overwrite existing metadata)</span>
              </label>

              {filteredRows[0] && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Sample Output Preview ({filteredRows[0].routePath})
                  </span>
                  <p className="font-bold text-[#1a0dab]">
                    {resolveSeoTemplate(titleTemplate, {
                      title: filteredRows[0].title,
                      category: filteredRows[0].category,
                      siteName: cmsData?.seoSystem?.schemaOrg?.orgName || 'EcomVanta',
                      sep: cmsData?.seoSystem?.titleSeparator || '|',
                    })}
                  </p>
                  <p className="text-slate-600">
                    {resolveSeoTemplate(descTemplate, {
                      title: filteredRows[0].title,
                      category: filteredRows[0].category,
                      siteName: cmsData?.seoSystem?.schemaOrg?.orgName || 'EcomVanta',
                      sep: cmsData?.seoSystem?.titleSeparator || '|',
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyTemplates}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0066FF] rounded-xl"
              >
                Stage Template Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Import Confirmation Modal */}
      {csvPreviewRows && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-black text-slate-900">
              Confirm CSV Metadata Import
            </h3>
            <p className="text-xs text-slate-600">
              Matched <strong>{csvPreviewRows.filter((r) => r.dirty).length}</strong> routes from your CSV file. Review changes in the Bulk Editor table before saving to production.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCsvPreviewRows(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setRows(csvPreviewRows);
                  setCsvPreviewRows(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0066FF] rounded-xl"
              >
                Apply CSV to Editor Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
