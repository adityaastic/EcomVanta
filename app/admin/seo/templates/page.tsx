'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Save,
  Check,
  Loader2,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { SiteContentData } from '@/lib/cmsTypes';
import { SeoSystemConfig, SeoTemplateRule, ContentTypeKey } from '@/lib/seoTypes';
import { resolveSeoTemplate } from '@/lib/seoAnalyzer';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

const AVAILABLE_VARIABLES = [
  { token: '{{title}}', desc: 'Article, service, or page headline' },
  { token: '{{siteName}}', desc: 'Global brand name (EcomVanta)' },
  { token: '{{sep}}', desc: 'Configured title separator (| or -)' },
  { token: '{{category}}', desc: 'Blog or case study category' },
  { token: '{{excerpt}}', desc: 'Short summary or subtitle' },
  { token: '{{author}}', desc: 'Article author name' },
];

export default function SeoTemplatesAutomationPage() {
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
        console.error('Failed to load SEO templates:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleUpdateTemplate = (contentType: ContentTypeKey, patch: Partial<SeoTemplateRule>) => {
    if (!seoSystem) return;
    setSeoSystem({
      ...seoSystem,
      templates: {
        ...seoSystem.templates,
        [contentType]: {
          ...seoSystem.templates[contentType],
          ...patch,
        },
      },
    });
  };

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

  if (loading || !seoSystem) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  const templateEntries = Object.values(seoSystem.templates || {});
  const siteName = seoSystem.schemaOrg?.orgName || 'EcomVanta';

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-6xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Content SEO Templates & Automation Rules
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure fallback metadata templates with dynamic variables, editorial guardrails, and transparent SEO analyzer scoring weights.
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
              <span>Saved Templates!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Templates & Rules</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Variables Reference Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Supported Dynamic Template Variables</span>
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">Title Separator:</span>
            <select
              value={seoSystem.titleSeparator}
              onChange={(e) => setSeoSystem({ ...seoSystem, titleSeparator: e.target.value })}
              className="px-2.5 py-1 border border-slate-300 rounded-lg font-mono font-bold bg-slate-50"
            >
              <option value="|">|</option>
              <option value="-">-</option>
              <option value="•">•</option>
              <option value="—">—</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_VARIABLES.map((v) => (
            <div
              key={v.token}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-2"
            >
              <code className="font-mono font-black text-[#0066FF]">{v.token}</code>
              <span className="text-slate-500 text-[11px]">{v.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Type Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {templateEntries.map((tpl) => {
          const sampleTitle = resolveSeoTemplate(tpl.titleTemplate, {
            title: 'Amazon Seller Account Management Guide',
            siteName,
            sep: seoSystem.titleSeparator,
            category: 'Marketplace Scaling',
            excerpt: 'Proven strategies to scale your Amazon India seller account.',
          });
          const sampleDesc = resolveSeoTemplate(tpl.descriptionTemplate, {
            title: 'Amazon Seller Account Management Guide',
            siteName,
            sep: seoSystem.titleSeparator,
            category: 'Marketplace Scaling',
            excerpt: 'Proven strategies to scale your Amazon India seller account.',
          });

          return (
            <div
              key={tpl.contentType}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-sm font-black text-slate-900">
                  {tpl.label || tpl.contentType}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0066FF]">
                  Default Schema: {tpl.defaultSchemaType}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">
                    Fallback SEO Title Pattern
                  </label>
                  <input
                    type="text"
                    value={tpl.titleTemplate}
                    onChange={(e) =>
                      handleUpdateTemplate(tpl.contentType, { titleTemplate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">
                    Fallback Meta Description Pattern
                  </label>
                  <textarea
                    rows={2}
                    value={tpl.descriptionTemplate}
                    onChange={(e) =>
                      handleUpdateTemplate(tpl.contentType, { descriptionTemplate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tpl.defaultRobotsIndex !== 'noindex'}
                      onChange={(e) =>
                        handleUpdateTemplate(tpl.contentType, {
                          defaultRobotsIndex: e.target.checked ? 'index' : 'noindex',
                        })
                      }
                      className="rounded text-[#0066FF]"
                    />
                    <span>Default Indexable</span>
                  </label>

                  <select
                    value={tpl.defaultSchemaType}
                    onChange={(e) =>
                      handleUpdateTemplate(tpl.contentType, {
                        defaultSchemaType: e.target.value as any,
                      })
                    }
                    className="px-2.5 py-1 border border-slate-300 rounded-lg font-bold bg-slate-50"
                  >
                    <option value="BlogPosting">BlogPosting</option>
                    <option value="Article">Article</option>
                    <option value="Service">Service</option>
                    <option value="WebPage">WebPage</option>
                    <option value="FAQPage">FAQPage</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Resolved Fallback Preview (Used only when manual SEO fields are empty)
                  </span>
                  <p className="font-bold text-[#1a0dab] truncate">{sampleTitle}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{sampleDesc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Automation & Editorial Guardrails + Transparent SEO Score Weights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-black text-slate-900">
              Editorial SEO Guardrails & Automation
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 cursor-pointer">
              <span>Warn Before Publishing Without Focus Keyword</span>
              <input
                type="checkbox"
                checked={seoSystem.publishPreChecks.warnOnMissingFocusKeyword}
                onChange={(e) =>
                  setSeoSystem({
                    ...seoSystem,
                    publishPreChecks: {
                      ...seoSystem.publishPreChecks,
                      warnOnMissingFocusKeyword: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#0066FF]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 cursor-pointer">
              <span>Automatic 301 Redirect Prompt When Published Slug Changes</span>
              <input
                type="checkbox"
                checked={seoSystem.publishPreChecks.autoSuggestRedirectOnSlugChange}
                onChange={(e) =>
                  setSeoSystem({
                    ...seoSystem,
                    publishPreChecks: {
                      ...seoSystem.publishPreChecks,
                      autoSuggestRedirectOnSlugChange: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#0066FF]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-semibold text-slate-700 cursor-pointer">
              <span>Highlight Missing Image Alt Text Warnings in Content Editor</span>
              <input
                type="checkbox"
                checked={seoSystem.publishPreChecks.warnOnMissingImageAlt}
                onChange={(e) =>
                  setSeoSystem({
                    ...seoSystem,
                    publishPreChecks: {
                      ...seoSystem.publishPreChecks,
                      warnOnMissingImageAlt: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#0066FF]"
              />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-sm font-black text-slate-900">
              Transparent On-Page SEO Analyzer Weights
            </h2>
          </div>
          <p className="text-[11px] text-slate-500">
            Customize how the 100-point on-page SEO analyzer weights each optimization signal.
          </p>

          <div className="space-y-2.5 text-xs">
            {(
              [
                { key: 'keywordInTitle', label: 'Focus Keyword in SEO Title' },
                { key: 'keywordInDescription', label: 'Focus Keyword in Meta Description' },
                { key: 'keywordInSlug', label: 'Focus Keyword in URL Slug' },
                { key: 'contentLength', label: 'Comprehensive Content Depth' },
                { key: 'internalLinks', label: 'Internal Linking Structure' },
                { key: 'imageAltText', label: 'Image Alt Text Coverage' },
              ] as const
            ).map((w) => (
              <div key={w.key} className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-700">{w.label}</span>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={seoSystem.analyzerWeights[w.key]}
                  onChange={(e) =>
                    setSeoSystem({
                      ...seoSystem,
                      analyzerWeights: {
                        ...seoSystem.analyzerWeights,
                        [w.key]: Number(e.target.value) || 6,
                      },
                    })
                  }
                  className="w-20 px-2.5 py-1 text-center font-bold border border-slate-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
