'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Save,
  Check,
  Loader2,
  Upload,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { SeoSystemConfig, GscQueryMetric, GscPageMetric } from '@/lib/seoTypes';
import { buildSiteSeoInventory } from '@/lib/seoEngine';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

export default function SearchConsoleIntegrationPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [seoSystem, setSeoSystem] = useState<SeoSystemConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
        console.error('Failed to load GSC settings:', err);
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

  const gsc = seoSystem?.integrations;
  const queries = gsc?.syncedMetrics?.topQueries || [];
  const pages = gsc?.syncedMetrics?.topPages || [];

  // Match actual search queries with published articles/pages to identify content opportunities
  const contentOpportunities = useMemo(() => {
    if (!audit || queries.length === 0) return [];
    return queries.map((q) => {
      const qLower = q.query.toLowerCase();
      const matchedPage = audit.pages.find(
        (item) =>
          (item.seo.focusKeyword || '').toLowerCase().includes(qLower) ||
          item.title.toLowerCase().includes(qLower) ||
          (item.seo.focusKeyword && qLower.includes(item.seo.focusKeyword.toLowerCase()))
      );
      return {
        ...q,
        matchedRoute: matchedPage?.urlPath || q.targetPage || null,
        matchedTitle: matchedPage?.title || null,
      };
    });
  }, [audit, queries]);

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

  // Import Google Search Console Queries CSV export
  const handleImportGscQueriesCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !seoSystem) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result || '')
        .split(/\r?\n/)
        .filter((l) => l.trim());
      if (lines.length < 2) return;

      const parsed: GscQueryMetric[] = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
        if (!cols[0]) continue;
        parsed.push({
          query: cols[0],
          clicks: Number(cols[1]) || 0,
          impressions: Number(cols[2]) || 0,
          ctr: parseFloat(cols[3]) || 0,
          position: parseFloat(cols[4]) || 0,
        });
      }

      if (parsed.length > 0) {
        const totalClicks = parsed.reduce((a, b) => a + b.clicks, 0);
        const totalImpressions = parsed.reduce((a, b) => a + b.impressions, 0);
        const avgCtr = totalImpressions > 0 ? Number(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0;
        const avgPosition = Number((parsed.reduce((a, b) => a + b.position, 0) / parsed.length).toFixed(1));

        setSeoSystem({
          ...seoSystem,
          integrations: {
            ...seoSystem.integrations,
            connected: true,
            lastSyncedAt: new Date().toISOString(),
            syncedMetrics: {
              totalClicks,
              totalImpressions,
              avgCtr,
              avgPosition,
              dateRange: 'Last 28 Days (Imported CSV)',
              topQueries: parsed,
              topPages: seoSystem.integrations.syncedMetrics?.topPages || [],
            },
          },
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Load sample verified GSC dataset for demonstration / testing if requested by user
  const handleLoadSampleGscExport = () => {
    if (!seoSystem) return;
    const sampleQueries: GscQueryMetric[] = [
      {
        query: 'amazon seller account management services india',
        clicks: 142,
        impressions: 3890,
        ctr: 3.65,
        position: 4.8,
        targetPage: '/amazon-seller-account-management-services',
      },
      {
        query: 'ecommerce service provider in delhi ncr',
        clicks: 98,
        impressions: 2410,
        ctr: 4.06,
        position: 3.9,
        targetPage: '/ecommerce-service-provider-in-delhi',
      },
      {
        query: 'blinkit seller onboarding process 2026',
        clicks: 64,
        impressions: 3120,
        ctr: 2.05,
        position: 8.4,
      },
      {
        query: 'flipkart account management agency',
        clicks: 51,
        impressions: 1950,
        ctr: 2.61,
        position: 6.2,
        targetPage: '/flipkart-account-management-services',
      },
      {
        query: 'myntra brand onboarding requirements',
        clicks: 29,
        impressions: 1680,
        ctr: 1.72,
        position: 11.3,
      },
    ];

    const samplePages: GscPageMetric[] = [
      {
        page: '/amazon-seller-account-management-services',
        clicks: 185,
        impressions: 4620,
        ctr: 4.0,
        position: 4.5,
        previousPosition: 5.7,
      },
      {
        page: '/ecommerce-service-provider-in-delhi',
        clicks: 112,
        impressions: 2790,
        ctr: 4.01,
        position: 3.8,
        previousPosition: 4.4,
      },
      {
        page: '/blogs/quick-commerce-revolution-blinkit-zepto-instamart-2026',
        clicks: 74,
        impressions: 3450,
        ctr: 2.14,
        position: 7.9,
        previousPosition: 6.1,
      },
      {
        page: '/flipkart-account-management-services',
        clicks: 58,
        impressions: 2140,
        ctr: 2.71,
        position: 6.1,
        previousPosition: 4.2,
      },
    ];

    const totalClicks = sampleQueries.reduce((a, b) => a + b.clicks, 0);
    const totalImpressions = sampleQueries.reduce((a, b) => a + b.impressions, 0);

    setSeoSystem({
      ...seoSystem,
      integrations: {
        ...seoSystem.integrations,
        connected: true,
        lastSyncedAt: new Date().toISOString(),
        syncedMetrics: {
          totalClicks,
          totalImpressions,
          avgCtr: 2.94,
          avgPosition: 6.9,
          dateRange: 'Last 28 Days',
          topQueries: sampleQueries,
          topPages: samplePages,
        },
      },
    });
  };

  if (loading || !seoSystem || !gsc) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  const totalClicks = gsc.syncedMetrics?.totalClicks || 0;
  const totalImpressions = gsc.syncedMetrics?.totalImpressions || 0;
  const avgCtr = gsc.syncedMetrics?.avgCtr ?? 0;
  const avgPosition = gsc.syncedMetrics?.avgPosition ?? '—';

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Google Search Console & Analytics Integration
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                gsc.connected
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              {gsc.connected ? 'Data Connected' : 'Not Connected'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Connect Google Search Console verification tags, import real search performance data, and uncover keyword gaps across your articles.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 flex items-center gap-1.5 cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved Configuration!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Integration Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Transparency Banner Separating Google Data vs Internal SEO Analysis */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs text-blue-950">
        <AlertCircle className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <div>
          <p className="font-extrabold">
            Clear Separation: Google Search Console Data vs. Internal On-Page Audits
          </p>
          <p className="text-blue-800 mt-0.5">
            Being listed in `/sitemap.xml` does not guarantee Google indexing. Actual search clicks, impressions, CTR, and average position below come strictly from your connected/imported Google Search Console dataset.
          </p>
        </div>
      </div>

      {/* Connection & Verification Settings Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-black text-slate-900">
            1. Property Verification & Data Import
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import GSC Queries CSV</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleImportGscQueriesCsv}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handleLoadSampleGscExport}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] rounded-xl text-xs font-bold"
            >
              Load Sample GSC Snapshot
            </button>
            {gsc.connected && (
              <button
                type="button"
                onClick={() =>
                  setSeoSystem({
                    ...seoSystem,
                    integrations: {
                      ...gsc,
                      connected: false,
                      syncedMetrics: undefined,
                    },
                  })
                }
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold"
              >
                Disconnect Dataset
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-600 uppercase mb-1">
              GSC Property URL
            </label>
            <input
              type="url"
              value={gsc.propertyUrl}
              onChange={(e) =>
                setSeoSystem({
                  ...seoSystem,
                  integrations: { ...gsc, propertyUrl: e.target.value },
                })
              }
              placeholder="https://www.ecomvanta.in"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase mb-1">
              Google Site Verification Meta Code (<code>&lt;meta name=&quot;google-site-verification&quot;&gt;</code>)
            </label>
            <input
              type="text"
              value={gsc.verificationMetaTag || ''}
              onChange={(e) =>
                setSeoSystem({
                  ...seoSystem,
                  integrations: { ...gsc, verificationMetaTag: e.target.value },
                })
              }
              placeholder="Paste verification token..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 uppercase mb-1">
              Google Analytics 4 Measurement ID (Optional)
            </label>
            <input
              type="text"
              value={gsc.ga4MeasurementId || ''}
              onChange={(e) =>
                setSeoSystem({
                  ...seoSystem,
                  integrations: { ...gsc, ga4MeasurementId: e.target.value },
                })
              }
              placeholder="G-XXXXXXXXXX"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
            />
          </div>
        </div>
      </div>

      {/* Performance Metrics & Content Opportunities */}
      {!gsc.connected ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <LineChart className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-black text-slate-800">
            No Google Search Console Performance Dataset Loaded
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Upload a Google Search Console CSV export (`Queries.csv`) or click &ldquo;Load Sample GSC Snapshot&rdquo; above to inspect clicks, impressions, CTR, average position, and content gap opportunities.
          </p>
        </div>
      ) : (
        <>
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Clicks</span>
              <p className="text-2xl font-black text-[#0066FF] mt-1">{totalClicks}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Total Impressions
              </span>
              <p className="text-2xl font-black text-purple-600 mt-1">{totalImpressions}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Average CTR</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{avgCtr}%</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Average Position
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">#{avgPosition}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Search Queries & Content Opportunity Matcher (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0066FF]" />
                  <span>Top Search Queries & Content Opportunity Matcher</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Compares real search queries with your existing articles and service pages.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-black text-slate-500 uppercase">
                      <th className="py-3 px-4">Search Query</th>
                      <th className="py-3 px-3">Clicks</th>
                      <th className="py-3 px-3">Impr.</th>
                      <th className="py-3 px-3">Pos.</th>
                      <th className="py-3 px-4">Matched Page / Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contentOpportunities.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-slate-900">{item.query}</td>
                        <td className="py-3 px-3 font-mono font-bold text-[#0066FF]">
                          {item.clicks}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-600">{item.impressions}</td>
                        <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                          {item.position}
                        </td>
                        <td className="py-3 px-4">
                          {item.matchedRoute ? (
                            <Link
                              href={item.matchedRoute}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span className="truncate max-w-[160px]">{item.matchedRoute}</span>
                            </Link>
                          ) : (
                            <Link
                              href="/admin/blogs/new"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200"
                            >
                              <span>+ Write Article for Query</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Landing Pages & Visibility Shifts (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900">
                  Landing Pages & Visibility Trends
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Highlights top-performing pages and routes losing search position.
                </p>
              </div>

              <div className="divide-y divide-slate-100 p-4 space-y-3 text-xs">
                {pages.map((p, idx) => {
                  const posDelta =
                    typeof p.previousPosition === 'number'
                      ? Number((p.previousPosition - p.position).toFixed(1))
                      : null;
                  return (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono font-bold text-slate-900 truncate">{p.page}</p>
                        <p className="text-[11px] text-slate-500">
                          {p.clicks} clicks • {p.impressions} impr • CTR {p.ctr}% • Pos #{p.position}
                        </p>
                      </div>
                      {posDelta !== null && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black shrink-0 flex items-center gap-1 ${
                            posDelta >= 0
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {posDelta < 0 && <TrendingDown className="w-3 h-3" />}
                          {posDelta >= 0 ? `+${posDelta}` : posDelta} pos
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
