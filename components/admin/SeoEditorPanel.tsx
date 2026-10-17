'use client';

import React, { useState, useMemo } from 'react';
import {
  SeoMetaItem,
  SiteContentData,
  DEFAULT_SITE_CONTENT,
  ContentTypeKey,
  SchemaMarkupType,
  createEmptySeoMeta,
} from '@/lib/cmsTypes';
import {
  analyzeContentSeo,
  EditorFieldTarget,
  SeoCheckCategory,
} from '@/lib/seoAnalyzer';
import {
  getContextualLinkSuggestions,
  buildSiteSeoInventory,
  buildValidInternalPathsSet,
} from '@/lib/seoEngine';
import MediaUploader from './MediaUploader';
import {
  Search,
  Globe,
  Share2,
  ShieldCheck,
  Code2,
  Link2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Smartphone,
  Monitor,
  Plus,
  Trash2,
  ArrowUpRight,
  Info,
  HelpCircle,
  Tag,
  Eye,
} from 'lucide-react';

interface SeoEditorPanelProps {
  contentType: ContentTypeKey | 'case_study' | 'page';
  title: string;
  slug: string;
  urlPath: string;
  excerpt: string;
  htmlContent?: string;
  contentHtml?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  onFeaturedImageAltChange?: (alt: string) => void;
  category?: string;
  author?: string;
  seo?: Partial<SeoMetaItem>;
  onChangeSeo?: (updated: SeoMetaItem) => void;
  onChange?: (updated: SeoMetaItem) => void;
  onSlugChange?: (newSlug: string) => void;
  onInsertInternalLink?: ((anchorHtml: string) => void) | ((targetUrl: string, anchorText: string) => void);
  internalLinkSuggestions?: any[];
  onFocusOuterField?: (target: EditorFieldTarget) => void;
  siteContent?: SiteContentData | null;
}

const CATEGORY_LABELS: Record<SeoCheckCategory, string> = {
  keyword: 'Keyword Optimization',
  metadata: 'Title & Meta Description',
  content: 'Content Depth & Media',
  readability: 'Readability & Structure',
  links: 'Internal & External Links',
  technical: 'Technical Indexability & Schema',
};

export default function SeoEditorPanel({
  contentType: rawContentType,
  title,
  slug,
  urlPath,
  excerpt,
  htmlContent: rawHtmlContent,
  contentHtml,
  featuredImage,
  featuredImageAlt,
  category,
  author,
  seo: rawSeo,
  onChangeSeo: rawOnChangeSeo,
  onChange,
  onSlugChange,
  onInsertInternalLink: rawOnInsertInternalLink,
  onFocusOuterField,
  siteContent: rawSiteContent,
}: SeoEditorPanelProps) {
  const contentType: ContentTypeKey =
    rawContentType === 'case_study'
      ? 'caseStudy'
      : rawContentType === 'page'
      ? 'staticPage'
      : rawContentType;
  const htmlContent = rawHtmlContent ?? contentHtml ?? '';
  const seo: SeoMetaItem = { ...createEmptySeoMeta(contentType), ...(rawSeo || {}) };
  const siteContent: SiteContentData = rawSiteContent || DEFAULT_SITE_CONTENT;
  const onChangeSeo = (updated: SeoMetaItem) => {
    if (rawOnChangeSeo) rawOnChangeSeo(updated);
    if (onChange) onChange(updated);
  };
  const onInsertInternalLink = rawOnInsertInternalLink
    ? (anchorHtml: string) => {
        if (rawOnInsertInternalLink.length >= 2) {
          const hrefMatch = anchorHtml.match(/href="([^"]+)"/);
          const textMatch = anchorHtml.match(/>([^<]+)</);
          (rawOnInsertInternalLink as any)(
            hrefMatch ? hrefMatch[1] : '/',
            textMatch ? textMatch[1] : 'Read More'
          );
        } else {
          (rawOnInsertInternalLink as any)(anchorHtml);
        }
      }
    : undefined;

  const [activeTab, setActiveTab] = useState<
    'general' | 'analysis' | 'social' | 'advanced' | 'schema' | 'links'
  >('general');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [secondaryInput, setSecondaryInput] = useState('');

  const { allTitles, allDescs, validPaths } = useMemo(() => {
    const inv = buildSiteSeoInventory(siteContent);
    const vPaths = buildValidInternalPathsSet(siteContent);
    return {
      allTitles: inv.pages.map((p) => ({ path: p.urlPath, title: p.effectiveTitle })),
      allDescs: inv.pages.map((p) => ({ path: p.urlPath, description: p.effectiveDescription })),
      validPaths: vPaths,
    };
  }, [siteContent]);

  const report = useMemo(() => {
    return analyzeContentSeo({
      contentType,
      title,
      slug,
      urlPath,
      excerpt,
      htmlContent,
      featuredImage,
      featuredImageAlt,
      category,
      author,
      seo,
      seoConfig: siteContent.seoConfig,
      allOtherTitles: allTitles,
      allOtherDescriptions: allDescs,
      validInternalPaths: validPaths,
    });
  }, [
    contentType,
    title,
    slug,
    urlPath,
    excerpt,
    htmlContent,
    featuredImage,
    featuredImageAlt,
    category,
    author,
    seo,
    siteContent.seoConfig,
    allTitles,
    allDescs,
    validPaths,
  ]);

  const linkSuggestions = useMemo(() => {
    return getContextualLinkSuggestions({
      currentUrlPath: urlPath,
      title,
      htmlContent,
      focusKeyword: seo.focusKeyword,
      category,
      content: siteContent,
    });
  }, [urlPath, title, htmlContent, seo.focusKeyword, category, siteContent]);

  const updateField = <K extends keyof SeoMetaItem>(key: K, val: SeoMetaItem[K]) => {
    onChangeSeo({
      ...seo,
      [key]: val,
      isCustomized: true,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleAddSecondaryKeyword = () => {
    const clean = secondaryInput.trim();
    if (!clean) return;
    const current = seo.secondaryKeywords || [];
    if (!current.includes(clean)) {
      updateField('secondaryKeywords', [...current, clean]);
    }
    setSecondaryInput('');
  };

  const handleRemoveSecondaryKeyword = (kw: string) => {
    updateField(
      'secondaryKeywords',
      (seo.secondaryKeywords || []).filter((k) => k !== kw)
    );
  };

  const handleAutoGenerateMeta = () => {
    const kw = seo.focusKeyword?.trim() || title;
    const siteName = siteContent.branding?.siteName || 'EcomVanta';
    const sep = siteContent.seoConfig?.titleSeparator || '|';
    const suggestedTitle = title
      ? `${title} ${sep} ${siteName}`
      : `${kw} - Complete Guide ${sep} ${siteName}`;
    const suggestedDesc =
      excerpt?.trim() ||
      `Learn everything about ${kw} with ${siteName}. Explore step-by-step marketplace strategies, cataloging best practices, and proven growth tips.`;

    onChangeSeo({
      ...seo,
      seoTitle: seo.seoTitle || suggestedTitle.slice(0, 62),
      metaDescription: seo.metaDescription || suggestedDesc.slice(0, 156),
      breadcrumbTitle: seo.breadcrumbTitle || title,
      isCustomized: true,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleJumpToField = (target?: EditorFieldTarget) => {
    if (!target) return;
    if (target === 'content' || target === 'imageAlt' || target === 'excerpt') {
      onFocusOuterField?.(target);
      return;
    }
    if (
      target === 'focusKeyword' ||
      target === 'secondaryKeywords' ||
      target === 'seoTitle' ||
      target === 'metaDescription' ||
      target === 'slug'
    ) {
      setActiveTab('general');
      setTimeout(() => {
        const el = document.getElementById(`seo-field-${target}`);
        el?.focus();
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    } else if (target === 'canonicalUrl' || target === 'robotsIndex') {
      setActiveTab('advanced');
    } else if (target === 'schemaType') {
      setActiveTab('schema');
    } else if (target === 'internalLinks') {
      setActiveTab('links');
    }
  };

  // Score badge color
  const scoreColor =
    report.overallScore >= 80
      ? 'bg-emerald-500 text-white border-emerald-600'
      : report.overallScore >= 60
      ? 'bg-amber-500 text-white border-amber-600'
      : 'bg-rose-500 text-white border-rose-600';

  const scoreRingColor =
    report.overallScore >= 80
      ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
      : report.overallScore >= 60
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-rose-700 bg-rose-50 border-rose-200';

  // Highlight focus keyword in SERP description preview
  const renderHighlightedDescription = (desc: string, kw: string) => {
    const truncated = desc.length > 160 ? desc.slice(0, 157) + '...' : desc;
    if (!kw.trim()) return truncated;
    const escaped = kw.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = truncated.split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === kw.trim().toLowerCase() ? (
        <strong key={i} className="font-bold text-slate-900">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Top Rank Math / Yoast Header Bar */}
      <div className="bg-gradient-to-r from-[#081325] via-[#0B1E36] to-[#081325] px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00C2FF] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black tracking-tight text-white">
                SEO Intelligence &amp; Optimization Suite
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-[#00C2FF] border border-blue-400/30">
                Rank Math / Yoast Pro
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Live SERP Snippet, Focus Keyword Analysis, Social Cards, Robots, Schema &amp; Internal Links
            </p>
          </div>
        </div>

        {/* Live Score Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              On-Page SEO Score
            </p>
            <p className="text-xs font-extrabold text-[#00C2FF]">{report.grade}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-2xl font-black text-base border shadow-md flex items-center gap-1.5 ${scoreColor}`}
          >
            <span>{report.overallScore}</span>
            <span className="text-xs font-semibold opacity-85">/ 100</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 pt-2 flex flex-wrap gap-1">
        {[
          { id: 'general', label: 'General & Snippet', icon: Search },
          {
            id: 'analysis',
            label: `SEO Analysis (${report.passedCount}/${report.checks.length})`,
            icon: ShieldCheck,
            badge: report.errorCount > 0 ? `${report.errorCount} Issues` : undefined,
          },
          { id: 'links', label: `Internal Links (${linkSuggestions.length})`, icon: Link2 },
          { id: 'social', label: 'Social / Open Graph', icon: Share2 },
          { id: 'schema', label: 'Schema Markup', icon: Code2 },
          { id: 'advanced', label: 'Robots & Canonical', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                active
                  ? 'bg-white text-[#0066FF] border-[#0066FF] shadow-2xs'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-100 text-rose-700">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="p-6 space-y-6">
        {/* TAB 1: GENERAL & SNIPPET PREVIEW */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Live Google SERP Preview Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#0066FF]" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Live Google Search Snippet Preview
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSerpDevice('desktop')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                      serpDevice === 'desktop'
                        ? 'bg-[#0066FF] text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSerpDevice('mobile')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                      serpDevice === 'mobile'
                        ? 'bg-[#0066FF] text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              <div
                className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-xs ${
                  serpDevice === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-black text-[#0066FF]">
                    EV
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">
                      {siteContent.branding?.siteName || 'EcomVanta'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {report.effectiveCanonical}
                    </p>
                  </div>
                </div>
                <h3 className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer leading-snug line-clamp-1">
                  {report.effectiveTitle || 'Untitled Page'}
                </h3>
                <p className="text-xs text-[#4d5156] mt-1 leading-relaxed line-clamp-2">
                  {renderHighlightedDescription(
                    report.effectiveDescription || 'Provide a meta description to preview how your snippet appears in Google Search.',
                    seo.focusKeyword || ''
                  )}
                </p>
              </div>
            </div>

            {/* Focus Keyword & Secondary Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Focus Keyword
                </label>
                <input
                  id="seo-field-focusKeyword"
                  type="text"
                  value={seo.focusKeyword || ''}
                  onChange={(e) => updateField('focusKeyword', e.target.value)}
                  placeholder="e.g. How to Sell on Blinkit"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  The primary search query you want this article/page to rank for.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Secondary / Semantic Keywords
                </label>
                <div className="flex gap-2">
                  <input
                    id="seo-field-secondaryKeywords"
                    type="text"
                    value={secondaryInput}
                    onChange={(e) => setSecondaryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSecondaryKeyword();
                      }
                    }}
                    placeholder="Add secondary keyword & press Enter..."
                    className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSecondaryKeyword}
                    className="px-3 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0066FF] rounded-xl text-xs font-bold border border-slate-200"
                  >
                    Add
                  </button>
                </div>
                {(seo.secondaryKeywords || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {seo.secondaryKeywords.map((kw) => {
                      const isUsed = htmlContent.toLowerCase().includes(kw.toLowerCase());
                      return (
                        <span
                          key={kw}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isUsed
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {isUsed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>{kw}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSecondaryKeyword(kw)}
                            className="ml-1 text-slate-400 hover:text-rose-600"
                          >
                            &times;
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* SEO Title & Meta Description with Practical Guidance Bars */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800">
                  Search Engine Title &amp; Meta Description
                </span>
                <button
                  type="button"
                  onClick={handleAutoGenerateMeta}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-xs font-bold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fill Blank Fields from Content</span>
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    SEO Title Tag
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {report.effectiveTitle.length} chars (~{report.titlePixelWidth}px / 580px optimal)
                  </span>
                </div>
                <input
                  id="seo-field-seoTitle"
                  type="text"
                  value={seo.seoTitle || ''}
                  onChange={(e) => updateField('seoTitle', e.target.value)}
                  placeholder={report.effectiveTitle}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full transition-all ${
                      report.titlePixelWidth >= 250 && report.titlePixelWidth <= 580
                        ? 'bg-emerald-500'
                        : report.titlePixelWidth > 580
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((report.titlePixelWidth / 600) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Practical guidance: Titles between 40–60 characters (~280–580px) display cleanly without truncation. Leave blank to use the global template.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Description
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {report.effectiveDescription.length} chars (~{report.descriptionPixelWidth}px / 920px optimal)
                  </span>
                </div>
                <textarea
                  id="seo-field-metaDescription"
                  rows={3}
                  value={seo.metaDescription || ''}
                  onChange={(e) => updateField('metaDescription', e.target.value)}
                  placeholder={report.effectiveDescription}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div
                    className={`h-full transition-all ${
                      report.effectiveDescription.length >= 110 && report.effectiveDescription.length <= 160
                        ? 'bg-emerald-500'
                        : report.effectiveDescription.length > 160
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.round((report.effectiveDescription.length / 165) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* URL Slug & Breadcrumb Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {onSlugChange && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      URL Slug
                    </label>
                    <input
                      id="seo-field-slug"
                      type="text"
                      value={slug}
                      onChange={(e) =>
                        onSlugChange(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]+/g, '-')
                            .replace(/--+/g, '-')
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Breadcrumb Title
                  </label>
                  <input
                    type="text"
                    value={seo.breadcrumbTitle || ''}
                    onChange={(e) => updateField('breadcrumbTitle', e.target.value)}
                    placeholder={title || 'Short title for breadcrumb trail'}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REAL-TIME ON-PAGE SEO ANALYSIS */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Score Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-black shrink-0 ${scoreRingColor}`}
                >
                  <span className="text-xl leading-none">{report.overallScore}</span>
                  <span className="text-[9px] uppercase tracking-wider mt-0.5">Score</span>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-black text-slate-900">
                      {report.passedCount} Passed
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-sm font-bold text-amber-600">
                      {report.warningCount} Warnings
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-sm font-bold text-rose-600">
                      {report.errorCount} Errors
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    <Info className="w-3.5 h-3.5 inline mr-1 text-blue-600" />
                    Note: A high on-page SEO score reflects content optimization best practices and does not guarantee specific Google rankings.
                  </p>
                </div>
              </div>
            </div>

            {/* Grouped Checks */}
            {(Object.keys(CATEGORY_LABELS) as SeoCheckCategory[]).map((catKey) => {
              const catChecks = report.checks.filter((c) => c.category === catKey);
              if (catChecks.length === 0) return null;

              return (
                <div key={catKey} className="space-y-2.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
                    {CATEGORY_LABELS[catKey]}
                  </h3>
                  <div className="space-y-2">
                    {catChecks.map((chk) => (
                      <div
                        key={chk.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                          chk.status === 'pass'
                            ? 'bg-emerald-50/40 border-emerald-200/80'
                            : chk.status === 'warning'
                            ? 'bg-amber-50/50 border-amber-200/90'
                            : 'bg-rose-50/50 border-rose-200/90'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {chk.status === 'pass' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          ) : chk.status === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-xs font-extrabold text-slate-900">
                                {chk.title}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-600">
                                +{chk.score}/{chk.maxScore} pts
                              </span>
                              {chk.currentValue && (
                                <span className="text-[11px] font-mono text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200/70">
                                  {chk.currentValue}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              <strong className="text-slate-700">Why it matters:</strong> {chk.whyItMatters}
                            </p>
                            <p className="text-xs font-semibold text-slate-800">
                              <strong className="text-[#0066FF]">Fix / Guidance:</strong> {chk.recommendation}
                            </p>
                          </div>
                        </div>

                        {chk.fieldTarget && chk.status !== 'pass' && (
                          <button
                            type="button"
                            onClick={() => handleJumpToField(chk.fieldTarget)}
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold shrink-0 self-start transition-colors cursor-pointer"
                          >
                            Open Field &rarr;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: INTERNAL LINK SUGGESTIONS */}
        {activeTab === 'links' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-950">
                  Contextual Internal Link Assistant
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Suggestions are generated from your actual published blog articles, marketplace service pages, and case studies. Links are only inserted when you click <strong>Insert Link</strong>.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="px-3 py-1 rounded-full bg-white border border-blue-200 text-xs font-black text-[#0066FF]">
                  {report.internalLinks.length} Active Internal Links
                </span>
              </div>
            </div>

            {linkSuggestions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 border border-slate-200 rounded-2xl">
                Write more article content or add a Focus Keyword to generate contextual internal link recommendations.
              </div>
            ) : (
              <div className="space-y-3">
                {linkSuggestions.slice(0, 10).map((sug) => (
                  <div
                    key={sug.targetPath}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] text-[10px] font-extrabold uppercase">
                          {sug.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{sug.targetTitle}</h4>
                        {sug.alreadyLinked && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            ✓ Already Linked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">{sug.targetPath}</p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-slate-500">
                          Recommended Anchor Text:
                        </span>
                        {sug.suggestedAnchorTexts.map((anchor) => (
                          <button
                            key={anchor}
                            type="button"
                            onClick={() => {
                              const html = `<a href="${sug.targetPath}">${anchor}</a>`;
                              if (onInsertInternalLink) {
                                onInsertInternalLink(html);
                              } else {
                                navigator.clipboard?.writeText(html);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0066FF] hover:text-white text-slate-700 text-[11px] font-bold transition-colors cursor-pointer"
                            title="Click to insert internal link with this anchor text"
                          >
                            + &ldquo;{anchor}&rdquo;
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SOCIAL / OPEN GRAPH & TWITTER CARDS */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Open Graph Title (Facebook, LinkedIn, WhatsApp)
                </label>
                <input
                  type="text"
                  value={seo.ogTitle || ''}
                  onChange={(e) => updateField('ogTitle', e.target.value)}
                  placeholder={report.effectiveTitle}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Open Graph Description
                </label>
                <textarea
                  rows={2}
                  value={seo.ogDescription || ''}
                  onChange={(e) => updateField('ogDescription', e.target.value)}
                  placeholder={report.effectiveDescription}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <MediaUploader
                label="Open Graph / Social Share Image (1200x630px recommended)"
                value={seo.ogImage || featuredImage || ''}
                onChange={(url) => updateField('ogImage', url)}
                helperText="Overrides the default featured image when shared on Facebook, LinkedIn, WhatsApp, and X."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Twitter / X Card Type
                  </label>
                  <select
                    value={seo.twitterCard || 'summary_large_image'}
                    onChange={(e) => updateField('twitterCard', e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white font-semibold"
                  >
                    <option value="summary_large_image">Summary Card with Large Image</option>
                    <option value="summary">Standard Compact Summary Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Twitter Title Override
                  </label>
                  <input
                    type="text"
                    value={seo.twitterTitle || ''}
                    onChange={(e) => updateField('twitterTitle', e.target.value)}
                    placeholder={seo.ogTitle || report.effectiveTitle}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Live Social Card Preview */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-slate-600">
                Live Social Feed Card Preview
              </p>
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-sm">
                <div className="h-44 bg-slate-200 relative overflow-hidden">
                  {seo.ogImage || featuredImage ? (
                    <img
                      src={seo.ogImage || featuredImage}
                      alt="Social Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      No Social Image Selected
                    </div>
                  )}
                </div>
                <div className="p-4 bg-white space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    {(siteContent.seoConfig?.siteUrl || 'ecomvanta.in').replace(/^https?:\/\//, '')}
                  </p>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                    {seo.ogTitle || report.effectiveTitle}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {seo.ogDescription || report.effectiveDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SCHEMA MARKUP (JSON-LD) */}
        {activeTab === 'schema' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Schema.org Entity Type
                </label>
                <select
                  value={seo.schemaType || 'BlogPosting'}
                  onChange={(e) => updateField('schemaType', e.target.value as SchemaMarkupType)}
                  className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-300 rounded-xl bg-white"
                >
                  <option value="BlogPosting">BlogPosting (Recommended for Blogs)</option>
                  <option value="Article">Article (News / Editorial / Case Study)</option>
                  <option value="Service">Service (Marketplace Service Page)</option>
                  <option value="WebPage">WebPage (Standard Page)</option>
                  <option value="AboutPage">AboutPage</option>
                  <option value="ContactPage">ContactPage</option>
                  <option value="FAQPage">FAQPage</option>
                  <option value="Product">Product &amp; Offer (Requires accurate price)</option>
                  <option value="None">None (Disable page-level schema)</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={Boolean(seo.faqSchemaEnabled)}
                    onChange={(e) => updateField('faqSchemaEnabled', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0066FF]"
                  />
                  <span>Include FAQPage Structured Data (when FAQs exist)</span>
                </label>
              </div>
            </div>

            {/* FAQ Builder for Article/Page */}
            {seo.faqSchemaEnabled && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Structured FAQ Questions &amp; Answers
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Rendered visibly on the page and output as valid FAQPage JSON-LD schema.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateField('customFaqs', [
                        ...(seo.customFaqs || []),
                        { question: '', answer: '' },
                      ])
                    }
                    className="px-3 py-1.5 rounded-xl bg-[#0066FF] text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                {(seo.customFaqs || []).map((faq, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const next = [...(seo.customFaqs || [])];
                          next[idx] = { ...next[idx], question: e.target.value };
                          updateField('customFaqs', next);
                        }}
                        placeholder="Question (e.g. How long does Blinkit seller onboarding take?)"
                        className="flex-1 px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = (seo.customFaqs || []).filter((_, i) => i !== idx);
                          updateField('customFaqs', next);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const next = [...(seo.customFaqs || [])];
                        next[idx] = { ...next[idx], answer: e.target.value };
                        updateField('customFaqs', next);
                      }}
                      placeholder="Concise, accurate answer..."
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: ROBOTS DIRECTIVES & CANONICAL URL */}
        {activeTab === 'advanced' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Search Engine Indexing (Robots Index)
                </label>
                <select
                  value={seo.robotsIndex || 'index'}
                  onChange={(e) => updateField('robotsIndex', e.target.value as 'index' | 'noindex')}
                  className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-300 rounded-xl bg-white"
                >
                  <option value="index">index — Allow search engines to index this page</option>
                  <option value="noindex">noindex — Exclude from search results &amp; XML sitemap</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Link Following (Robots Follow)
                </label>
                <select
                  value={seo.robotsFollow || 'follow'}
                  onChange={(e) => updateField('robotsFollow', e.target.value as 'follow' | 'nofollow')}
                  className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-300 rounded-xl bg-white"
                >
                  <option value="follow">follow — Crawl and pass link equity through links</option>
                  <option value="nofollow">nofollow — Do not follow links on this page</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Canonical URL Override
              </label>
              <input
                type="url"
                value={seo.canonicalUrl || ''}
                onChange={(e) => updateField('canonicalUrl', e.target.value)}
                placeholder={report.effectiveCanonical}
                className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 rounded-xl bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Leave blank to automatically use the validated self-referencing URL ({report.effectiveCanonical}).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
