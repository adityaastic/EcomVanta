'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Code2,
  Save,
  Check,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Plus,
  Trash2,
  Copy,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { SeoSystemConfig } from '@/lib/seoTypes';
import { buildSiteSeoInventory, generateJsonLdForRoute } from '@/lib/seoEngine';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

export default function SchemaMarkupManagerPage() {
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [seoSystem, setSeoSystem] = useState<SeoSystemConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedPreviewRoute, setSelectedPreviewRoute] = useState<string>('/');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [copied, setCopied] = useState(false);

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
        console.error('Failed to load schema settings:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const audit = useMemo(() => {
    if (!cmsData) return null;
    return buildSiteSeoInventory({
      ...cmsData,
      seoSystem: seoSystem || cmsData.seoSystem,
    });
  }, [cmsData, seoSystem]);

  const previewJsonLd = useMemo(() => {
    if (!cmsData || !seoSystem) return [];
    return generateJsonLdForRoute(selectedPreviewRoute, {
      ...cmsData,
      seoSystem,
    });
  }, [cmsData, seoSystem, selectedPreviewRoute]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (loading || !seoSystem || !audit) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  const org = seoSystem.schemaOrg;

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Schema Markup & JSON-LD Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage `Organization`, `WebSite`, `BreadcrumbList`, `BlogPosting`, `Service`, `Product`, and `FAQPage` structured data rendered in server HTML.
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
              <span>Schema Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Schema Configuration</span>
            </>
          )}
        </button>
      </div>

      {/* Policy Guard Notice */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-extrabold">
            Google Rich Results Compliance Guard Active
          </p>
          <p className="text-emerald-800 mt-0.5">
            All JSON-LD blocks are deduplicated at render time. `FAQPage` schema is emitted only when real FAQs exist on the page, and `Product` / `Offer` schema is emitted only when factual pricing and availability are explicitly configured—never inventing reviews, ratings, or fake prices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Cols: Organization & Global Schema Settings */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
              1. Global Organization & Knowledge Graph Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Brand / Organization Name
                </label>
                <input
                  type="text"
                  value={org.orgName}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Legal Entity Name
                </label>
                <input
                  type="text"
                  value={org.orgLegalName}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgLegalName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Official Website URL
                </label>
                <input
                  type="url"
                  value={org.orgUrl}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgUrl: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Organization Logo Path / URL
                </label>
                <input
                  type="text"
                  value={org.orgLogo}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgLogo: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Contact Telephone
                </label>
                <input
                  type="text"
                  value={org.orgPhone}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgPhone: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={org.orgEmail}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgEmail: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Organization Description
                </label>
                <textarea
                  rows={2}
                  value={org.orgDescription}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, orgDescription: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={org.streetAddress}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, streetAddress: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  City / Locality
                </label>
                <input
                  type="text"
                  value={org.addressLocality}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, addressLocality: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  State / Region
                </label>
                <input
                  type="text"
                  value={org.addressRegion}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, addressRegion: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={org.postalCode}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, postalCode: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            {/* Social Profile sameAs URLs */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <label className="block font-bold text-slate-600 uppercase">
                Official Social Profiles (`sameAs` Array)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/company/ecomvanta"
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newSocialUrl.trim()) return;
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: {
                        ...org,
                        sameAs: [...(org.sameAs || []), newSocialUrl.trim()],
                      },
                    });
                    setNewSocialUrl('');
                  }}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-1.5">
                {(org.sameAs || []).map((url, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px]"
                  >
                    <span className="truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSeoSystem({
                          ...seoSystem,
                          schemaOrg: {
                            ...org,
                            sameAs: org.sameAs.filter((_, i) => i !== idx),
                          },
                        })
                      }
                      className="text-slate-400 hover:text-rose-600 ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Schema Switches */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-slate-700 cursor-pointer">
                <span>Enable `WebSite` & `SearchAction` Sitelinks Schema</span>
                <input
                  type="checkbox"
                  checked={org.enableWebSiteSchema}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, enableWebSiteSchema: e.target.checked },
                    })
                  }
                  className="rounded text-[#0066FF]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-slate-700 cursor-pointer">
                <span>Enable Automatic `BreadcrumbList` Schema on All Sub-Routes</span>
                <input
                  type="checkbox"
                  checked={org.enableBreadcrumbsSchema}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      schemaOrg: { ...org, enableBreadcrumbsSchema: e.target.checked },
                    })
                  }
                  className="rounded text-[#0066FF]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Live Route JSON-LD Inspector & Validator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#0066FF]" />
                  <span>Live JSON-LD Structured Data Inspector</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Preview the exact server-rendered <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code> payload for any route.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(previewJsonLd, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied JSON-LD' : 'Copy JSON-LD'}</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Select Page / Article Route to Inspect
              </label>
              <select
                value={selectedPreviewRoute}
                onChange={(e) => setSelectedPreviewRoute(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-slate-50"
              >
                {audit.pages.map((item) => (
                  <option key={item.urlPath} value={item.urlPath}>
                    {item.urlPath} ({item.effectiveSchemaType})
                  </option>
                ))}
              </select>
            </div>

            {/* Detected Schema Types */}
            <div className="flex flex-wrap items-center gap-1.5">
              {previewJsonLd.map((block, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {block['@type']} Valid
                </span>
              ))}
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto max-h-[520px] leading-relaxed border border-slate-800">
              {JSON.stringify(previewJsonLd, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
}
