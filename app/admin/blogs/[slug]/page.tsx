'use client';

import React, { useState, useEffect, useMemo, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SeoEditorPanel from '@/components/admin/SeoEditorPanel';
import { BlogPostItem, SiteContentData, createEmptySeoMeta } from '@/lib/cmsTypes';
import { BlogRevision, SeoRedirectRule } from '@/lib/seoTypes';
import { analyzeOnPageSeo, extractTableOfContents } from '@/lib/seoAnalyzer';
import { getContextualLinkSuggestions } from '@/lib/seoEngine';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import {
  Save,
  Check,
  Loader2,
  ArrowLeft,
  AlertCircle,
  ExternalLink,
  Eye,
  History,
  Clock,
  Tag,
  Plus,
  X,
  ListTree,
  ArrowLeftRight,
  Sparkles,
  FileText,
  RotateCcw,
} from 'lucide-react';

const EMPTY_BLOG: BlogPostItem = {
  id: '',
  slug: '',
  title: '',
  category: 'eCommerce Growth',
  tags: ['Marketplace Growth', 'Seller Strategy'],
  image: '/arvian-blogs.jpeg',
  imageAlt: '',
  imageTitle: '',
  imageCaption: '',
  author: 'Arvind Ajmera',
  authorRole: 'Founder & Marketplace Strategist',
  authorBio:
    'eCommerce growth advisor helping Indian D2C brands and marketplace sellers scale profitably across Amazon, Flipkart, Myntra, and Quick Commerce.',
  date: 'October 2026',
  publishedAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  status: 'draft',
  featured: false,
  enableToc: true,
  customIntro: '',
  excerpt: '',
  content: '',
  link: '/blogs',
  relatedSlugs: [],
  revisions: [],
  seo: createEmptySeoMeta('blog'),
};

export default function BlogEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams.slug;
  const isNew = slugParam === 'new';
  const router = useRouter();

  const [blog, setBlog] = useState<BlogPostItem | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string>('');
  const [blogsList, setBlogsList] = useState<BlogPostItem[]>([]);
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [showRevisionsModal, setShowRevisionsModal] = useState(false);
  const [autoCreateRedirectOnSlugChange, setAutoCreateRedirectOnSlugChange] = useState(true);
  const [lastAutosavedAt, setLastAutosavedAt] = useState<string | null>(null);

  useEffect(() => {
    const local = getLocalCmsContent();
    if (local?.blogs) {
      setCmsData(local as SiteContentData);
      setBlogsList(local.blogs);
      if (isNew) {
        setBlog({ ...EMPTY_BLOG, id: Date.now().toString() });
        setLoading(false);
      } else {
        const found = local.blogs.find((b: any) => b.slug === slugParam || b.id === slugParam);
        if (found) {
          setBlog({ ...EMPTY_BLOG, ...found, seo: createEmptySeoMeta(found.seo || {}) });
          setOriginalSlug(found.slug || '');
          setLoading(false);
        }
      }
    }

    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data) {
          setCmsData(data.data);
          const list: BlogPostItem[] = data.data.blogs || [];
          setBlogsList(list);
          if (isNew) {
            setBlog((prev) => prev || { ...EMPTY_BLOG, id: Date.now().toString() });
          } else {
            const found = list.find((b: any) => b.slug === slugParam || b.id === slugParam);
            if (found) {
              setBlog({ ...EMPTY_BLOG, ...found, seo: createEmptySeoMeta(found.seo || {}) });
              setOriginalSlug(found.slug || '');
            } else if (!local?.blogs?.some((b: any) => b.slug === slugParam)) {
              setError(`Blog post "${slugParam}" not found.`);
            }
          }
        }
      } catch (err: any) {
        if (!local?.blogs) {
          setError(err.message || 'Error loading blog post');
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slugParam, isNew]);

  // Autosave draft to localStorage every 25 seconds when editing
  useEffect(() => {
    if (!blog || !blog.title) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`ecomvanta_autosave_blog_${blog.id || 'new'}`, JSON.stringify(blog));
        setLastAutosavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch {
        // ignore storage quota errors
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [blog]);

  // Build searchable internal link items from real published content
  const internalLinkItems = useMemo(() => {
    const items: { title: string; path: string; category: string; url: string; type: string }[] = [
      { title: 'Home — EcomVanta', path: '/', category: 'Core Page', url: '/', type: 'Core Page' },
      { title: 'Amazon Seller Account Management Services', path: '/amazon-seller-account-management-services', category: 'Landing Page', url: '/amazon-seller-account-management-services', type: 'Landing Page' },
      { title: 'Ecommerce Service Provider in Delhi NCR', path: '/ecommerce-service-provider-in-delhi', category: 'Landing Page', url: '/ecommerce-service-provider-in-delhi', type: 'Landing Page' },
      { title: 'Portfolio & Client Results', path: '/portfolio', category: 'Core Page', url: '/portfolio', type: 'Core Page' },
      { title: 'Contact EcomVanta', path: '/contact-us', category: 'Core Page', url: '/contact-us', type: 'Core Page' },
    ];
    for (const s of Object.values(cmsData?.services || {})) {
      items.push({ title: s.title, path: `/${s.slug}`, category: 'Service', url: `/${s.slug}`, type: 'Service' });
    }
    for (const c of Object.values(cmsData?.caseStudies || {})) {
      items.push({ title: c.title, path: `/${c.slug}`, category: 'Case Study', url: `/${c.slug}`, type: 'Case Study' });
    }
    for (const b of blogsList) {
      if (b.id !== blog?.id && (b.status || 'published') === 'published') {
        items.push({ title: b.title, path: `/blogs/${b.slug}`, category: 'Blog Article', url: `/blogs/${b.slug}`, type: 'Blog Article' });
      }
    }
    return items;
  }, [cmsData, blogsList, blog?.id]);

  // Contextual internal link suggestions based on keywords & content
  const linkSuggestions = useMemo(() => {
    if (!blog || !cmsData) return [];
    return getContextualLinkSuggestions({
      currentUrlPath: `/blogs/${blog.slug || 'new'}`,
      title: blog.title,
      focusKeyword: blog.seo?.focusKeyword || '',
      secondaryKeywords: blog.seo?.secondaryKeywords || [],
      htmlContent: `${blog.excerpt} ${blog.content}`,
      siteContent: cmsData,
    });
  }, [blog, cmsData]);

  // Live TOC & reading stats
  const tocItems = useMemo(() => extractTableOfContents(blog?.content || ''), [blog?.content]);
  const liveSeoAnalysis = useMemo(() => {
    if (!blog) return null;
    return analyzeOnPageSeo({
      title: blog.title,
      slug: blog.slug,
      urlPath: `/blogs/${blog.slug || 'article-slug'}`,
      contentHtml: blog.content || '',
      excerpt: blog.excerpt || '',
      featuredImage: blog.image,
      featuredImageAlt: blog.imageAlt,
      seo: blog.seo,
      contentType: 'blog',
    });
  }, [blog]);

  const slugChangedOnPublished =
    !isNew &&
    originalSlug &&
    blog?.slug &&
    originalSlug !== blog.slug &&
    (blog.status || 'published') === 'published';

  const handleAddTag = () => {
    if (!blog || !tagInput.trim()) return;
    const clean = tagInput.trim();
    const current = blog.tags || [];
    if (!current.includes(clean)) {
      setBlog({ ...blog, tags: [...current, clean] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    if (!blog) return;
    setBlog({ ...blog, tags: (blog.tags || []).filter((t) => t !== tag) });
  };

  const handleInsertSuggestedLink = (anchorHtml: string) => {
    if (!blog) return;
    const linkParagraph = `<p><strong>Related Guide:</strong> Explore our in-depth resource on ${anchorHtml}.</p>`;
    setBlog({
      ...blog,
      content: `${blog.content || ''}\n${linkParagraph}`,
    });
  };

  const handleRestoreRevision = (rev: BlogRevision) => {
    if (!blog) return;
    if (!confirm(`Restore revision from ${new Date(rev.timestamp).toLocaleString()}?`)) return;
    setBlog({
      ...blog,
      title: rev.title,
      slug: rev.slug,
      excerpt: rev.excerpt,
      content: rev.content,
    });
    setShowRevisionsModal(false);
  };

  const handleSave = async (e?: React.FormEvent, overrideStatus?: 'published' | 'draft' | 'scheduled') => {
    if (e) e.preventDefault();
    if (!blog) return;

    if (!blog.title) {
      setError('Please provide a title for the blog post.');
      return;
    }

    const nextStatus = overrideStatus || blog.status || 'published';

    // Pre-publish SEO warning check if publishing without focus keyword or meta description
    if (
      nextStatus === 'published' &&
      cmsData?.seoSystem?.publishPreChecks?.warnOnMissingFocusKeyword !== false &&
      (!blog.seo?.focusKeyword || !blog.imageAlt)
    ) {
      const missing: string[] = [];
      if (!blog.seo?.focusKeyword) missing.push('Focus Keyword');
      if (!blog.imageAlt) missing.push('Featured Image Alt Text');
      if (!blog.seo?.metaDescription && !blog.excerpt) missing.push('Meta Description / Excerpt');
      const proceed = window.confirm(
        `Pre-Publish SEO Notice:\n\nThis article is missing recommended SEO fields: ${missing.join(
          ', '
        )}.\n\nWould you still like to publish now?`
      );
      if (!proceed) return;
    }

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    const generatedSlug =
      blog.slug ||
      blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const nowIsoDate = new Date().toISOString().split('T')[0];

    // Record revision snapshot (keep last 15 revisions)
    const newRevision: BlogRevision = {
      id: `rev-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author: blog.author || 'SEO Editor',
      title: blog.title,
      slug: generatedSlug,
      excerpt: blog.excerpt,
      content: blog.content,
      note: `Saved (${nextStatus})`,
    };

    const previousSlugs = Array.from(
      new Set([
        ...(blog.previousSlugs || []),
        ...(originalSlug && originalSlug !== generatedSlug ? [originalSlug] : []),
      ])
    );

    const updatedBlog: BlogPostItem = {
      ...blog,
      slug: generatedSlug,
      id: blog.id || Date.now().toString(),
      status: nextStatus,
      link: `/blogs/${generatedSlug}`,
      updatedAt: nowIsoDate,
      publishedAt: blog.publishedAt || nowIsoDate,
      readingTimeMinutes: liveSeoAnalysis?.readingTimeMinutes || 5,
      wordCount: liveSeoAnalysis?.wordCount || 0,
      previousSlugs,
      revisions: [newRevision, ...(blog.revisions || [])].slice(0, 15),
    };

    let updatedList: BlogPostItem[];
    if (isNew) {
      updatedList = [updatedBlog, ...blogsList];
    } else {
      updatedList = blogsList.map((b) =>
        b.id === blog.id || b.slug === slugParam ? updatedBlog : b
      );
    }

    saveLocalCmsContent({ blogs: updatedList });

    try {
      // If slug changed on a published article and autoCreateRedirectOnSlugChange is checked, also save a 301 rule
      if (
        slugChangedOnPublished &&
        autoCreateRedirectOnSlugChange &&
        cmsData?.seoSystem
      ) {
        const oldPath = `/blogs/${originalSlug}`;
        const newPath = `/blogs/${generatedSlug}`;
        const existingRedirects = cmsData.seoSystem.redirects || [];
        if (!existingRedirects.some((r) => r.source === oldPath)) {
          const newRedirect: SeoRedirectRule = {
            id: `redir-slug-${Date.now()}`,
            source: oldPath,
            destination: newPath,
            type: 301,
            enabled: true,
            hits: 0,
            createdAt: nowIsoDate,
            notes: `Automatic 301 redirect after blog slug changed from ${oldPath}`,
            autoGenerated: true,
          };
          const updatedSeoSystem = {
            ...cmsData.seoSystem,
            redirects: [newRedirect, ...existingRedirects],
          };
          await fetch('/api/admin/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              section: 'seoSystem',
              data: updatedSeoSystem,
            }),
          });
        }
      }

      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'blogs',
          data: updatedList,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.blogs) {
        setBlogsList(data.data.blogs);
        setBlog(updatedBlog);
        setOriginalSlug(generatedSlug);
        saveLocalCmsContent({ blogs: data.data.blogs });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      if (isNew || originalSlug !== generatedSlug) {
        router.push(`/admin/blogs/${generatedSlug}`);
      }
    } catch {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <p className="text-sm text-[#0066FF] font-bold">{error || 'Article not found'}</p>
        <Link href="/admin/blogs" className="text-xs text-[#0066FF] hover:underline">
          Return to Blogs
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSave(e)} className="space-y-6 max-w-7xl pb-20">
      {/* Top Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5 bg-white/80 backdrop-blur-md sticky top-16 z-20 px-4 py-3 -mx-4 sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {isNew ? 'Write New Blog Article' : 'Edit Blog Article & SEO'}
              </h1>
              {liveSeoAnalysis && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    liveSeoAnalysis.score >= 80
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : liveSeoAnalysis.score >= 55
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  SEO Score: {liveSeoAnalysis.score}/100
                </span>
              )}
              {lastAutosavedAt && (
                <span className="text-[11px] text-slate-400 font-medium">
                  Autosaved {lastAutosavedAt}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Permalink: /blogs/{blog.slug || 'article-slug'} • {liveSeoAnalysis?.wordCount || 0} words ({liveSeoAnalysis?.readingTimeMinutes || 1} min read)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Revision History Button */}
          <button
            type="button"
            onClick={() => setShowRevisionsModal(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5" />
            <span>Revisions ({(blog.revisions || []).length})</span>
          </button>

          {/* Live / Draft Preview Button */}
          {blog.slug && (
            <Link
              href={
                blog.status === 'published'
                  ? `/blogs/${blog.slug}`
                  : `/blogs/${blog.slug}?preview=true`
              }
              target="_blank"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{blog.status === 'published' ? 'View Live' : 'Preview Draft'}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}

          {/* Save as Draft Button */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(undefined, 'draft')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-300 transition-all"
          >
            Save Draft
          </button>

          {/* Primary Save / Publish Button */}
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>
                  {blog.status === 'scheduled'
                    ? 'Save Schedule'
                    : blog.status === 'draft'
                    ? 'Update Draft'
                    : 'Publish / Update'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Slug Change 301 Redirect Banner */}
      {slugChangedOnPublished && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <ArrowLeftRight className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-extrabold text-amber-900">
                Slug Change Detected on Published Article (`/blogs/{originalSlug}` → `/blogs/{blog.slug}`)
              </p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Changing a live URL without a 301 redirect causes 404 errors and loses search rankings.
              </p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-bold text-amber-950 bg-white px-3 py-2 rounded-xl border border-amber-300 shrink-0 cursor-pointer">
            <input
              type="checkbox"
              checked={autoCreateRedirectOnSlugChange}
              onChange={(e) => setAutoCreateRedirectOnSlugChange(e.target.checked)}
              className="rounded text-[#0066FF]"
            />
            <span>Auto-create 301 Redirect on Save</span>
          </label>
        </div>
      )}

      {/* Two-Column WordPress Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Main Column (8 cols): Content Editor & Dedicated SEO Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article Core Content Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Headline (H1)
              </label>
              <input
                type="text"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                placeholder="e.g. How to Sell on Myntra: Complete Seller Onboarding Guide 2026"
                required
                className="w-full px-4 py-3 text-base font-extrabold border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL Slug (Permalink)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-xs text-slate-500 font-mono">
                    /blogs/
                  </span>
                  <input
                    type="text"
                    value={blog.slug}
                    onChange={(e) =>
                      setBlog({
                        ...blog,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]+/g, '-')
                          .replace(/(^-|-$)/g, ''),
                      })
                    }
                    placeholder="myntra-seller-onboarding-guide"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-r-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Category
                </label>
                <input
                  type="text"
                  value={blog.category}
                  onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                  placeholder="e.g. Amazon Growth, Quick Commerce, Marketplace SEO"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                />
              </div>
            </div>

            {/* Custom Lead Introduction */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Custom Lead Introduction (Highlighted Above Article Body)
              </label>
              <textarea
                rows={2}
                value={blog.customIntro || ''}
                onChange={(e) => setBlog({ ...blog, customIntro: e.target.value })}
                placeholder="Optional compelling opening hook displayed at the top of the article..."
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>

            {/* Rich Text Editor with H1-H6, Tables, Quotes, Inline Images & Internal Link Picker */}
            <RichTextEditor
              label="Full Article Body (WordPress Rich Text & HTML Block Editor)"
              value={blog.content}
              onChange={(val) => setBlog({ ...blog, content: val })}
              placeholder="Write your long-form article here with H2/H3 headings, comparison tables, blockquotes, inline images with alt text, and internal links..."
              helperText="Use H2 and H3 subheadings to structure your article and auto-generate the Table of Contents."
              minHeight="min-h-[420px]"
              internalLinkItems={internalLinkItems}
            />

            {/* Short Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Excerpt / Card Summary
              </label>
              <textarea
                rows={2}
                value={blog.excerpt}
                onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
                placeholder="Concise 140–160 character summary used on blog cards and as fallback meta description..."
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>
          </div>

          {/* Dedicated Rank Math / Yoast SEO Panel */}
          <SeoEditorPanel
            title={blog.title}
            slug={blog.slug}
            onSlugChange={(newSlug) => setBlog({ ...blog, slug: newSlug })}
            urlPath={`/blogs/${blog.slug || 'article-slug'}`}
            contentHtml={blog.content || ''}
            excerpt={blog.excerpt || ''}
            featuredImage={blog.image}
            featuredImageAlt={blog.imageAlt || ''}
            onFeaturedImageAltChange={(alt) => setBlog({ ...blog, imageAlt: alt })}
            seo={blog.seo || {}}
            onChange={(updatedSeo) => setBlog({ ...blog, seo: updatedSeo })}
            contentType="blog"
            internalLinkSuggestions={linkSuggestions}
            onInsertInternalLink={handleInsertSuggestedLink}
          />
        </div>

        {/* Right Sidebar Column (4 cols): Publishing Workflow, Featured Image & Alt Text, TOC, Tags, Related Articles */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing & Scheduling Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-[#0066FF]" />
              <span>Publishing & Schedule</span>
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Publication Status
              </label>
              <select
                value={blog.status || 'published'}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    status: e.target.value as 'published' | 'draft' | 'scheduled',
                  })
                }
                className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-slate-50"
              >
                <option value="published">Published (Live on Site & Sitemap)</option>
                <option value="draft">Draft (Private / Unindexed)</option>
                <option value="scheduled">Scheduled (Future Release)</option>
              </select>
            </div>

            {blog.status === 'scheduled' && (
              <div>
                <label className="block text-[11px] font-bold text-purple-700 uppercase mb-1">
                  Scheduled Publication Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={blog.scheduledAt ? blog.scheduledAt.slice(0, 16) : ''}
                  onChange={(e) => setBlog({ ...blog, scheduledAt: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-purple-300 rounded-xl bg-purple-50/40"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Display Date
                </label>
                <input
                  type="text"
                  value={blog.date}
                  onChange={(e) => setBlog({ ...blog, date: e.target.value })}
                  placeholder="October 2026"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Published ISO Date
                </label>
                <input
                  type="date"
                  value={blog.publishedAt ? blog.publishedAt.slice(0, 10) : ''}
                  onChange={(e) => setBlog({ ...blog, publishedAt: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2 border-t border-slate-100">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer">
                <span>Featured / Pinned Article</span>
                <input
                  type="checkbox"
                  checked={Boolean(blog.featured)}
                  onChange={(e) => setBlog({ ...blog, featured: e.target.checked })}
                  className="rounded text-[#0066FF]"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer">
                <span>Auto-Generate Table of Contents</span>
                <input
                  type="checkbox"
                  checked={blog.enableToc !== false}
                  onChange={(e) => setBlog({ ...blog, enableToc: e.target.checked })}
                  className="rounded text-[#0066FF]"
                />
              </label>
            </div>
          </div>

          {/* Featured Image & SEO Image Attributes */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <MediaUploader
              label="Featured Cover Image"
              value={blog.image}
              onChange={(url) => setBlog({ ...blog, image: url })}
              helperText="Recommended 1200x630px for Google Discover & Open Graph."
            />

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Image Alt Text (Required for Image SEO)
              </label>
              <input
                type="text"
                value={blog.imageAlt || ''}
                onChange={(e) => setBlog({ ...blog, imageAlt: e.target.value })}
                placeholder="Descriptive alt text including focus keyword..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Image Title Attribute
                </label>
                <input
                  type="text"
                  value={blog.imageTitle || ''}
                  onChange={(e) => setBlog({ ...blog, imageTitle: e.target.value })}
                  placeholder="Optional title..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Image Caption
                </label>
                <input
                  type="text"
                  value={blog.imageCaption || ''}
                  onChange={(e) => setBlog({ ...blog, imageCaption: e.target.value })}
                  placeholder="Visible caption under hero..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Author & E-E-A-T Attribution */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2.5">
              Author & E-E-A-T Attribution
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={blog.author}
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Author Role / Title
              </label>
              <input
                type="text"
                value={blog.authorRole || ''}
                onChange={(e) => setBlog({ ...blog, authorRole: e.target.value })}
                placeholder="Founder & Marketplace Strategist"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Author Bio
              </label>
              <textarea
                rows={2}
                value={blog.authorBio || ''}
                onChange={(e) => setBlog({ ...blog, authorBio: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* Tags & Topic Clusters */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
              <Tag className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Article Tags</span>
            </h3>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tag & press Enter..."
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(blog.tags || []).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Live Table of Contents Preview */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
              <ListTree className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Detected Table of Contents ({tocItems.length})</span>
            </h3>
            {tocItems.length === 0 ? (
              <p className="text-xs text-slate-400">
                Add H2 or H3 headings in the editor to automatically generate a navigable Table of Contents.
              </p>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {tocItems.map((item) => (
                  <li
                    key={item.id}
                    className={`text-slate-700 font-medium truncate ${
                      item.level === 3 ? 'pl-4 text-slate-500 text-[11px]' : ''
                    }`}
                  >
                    • {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Related Articles Selector */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2.5">
              Related Articles (Internal Cluster)
            </h3>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {blogsList
                .filter((b) => b.id !== blog.id)
                .map((other) => {
                  const checked = (blog.relatedSlugs || []).includes(other.slug);
                  return (
                    <label
                      key={other.id}
                      className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 text-xs cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const current = blog.relatedSlugs || [];
                          const next = e.target.checked
                            ? [...current, other.slug]
                            : current.filter((s) => s !== other.slug);
                          setBlog({ ...blog, relatedSlugs: next });
                        }}
                        className="mt-0.5 rounded text-[#0066FF]"
                      />
                      <span className="font-semibold text-slate-700 leading-snug">
                        {other.title}
                      </span>
                    </label>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Revision History Modal */}
      {showRevisionsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-sm font-black text-slate-900">
                  Article Revision History ({(blog.revisions || []).length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRevisionsModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {(blog.revisions || []).length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No saved revisions yet. Revisions are automatically recorded each time you save or update this article.
              </p>
            ) : (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {(blog.revisions || []).map((rev) => (
                  <div key={rev.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{rev.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(rev.timestamp).toLocaleString()} • by {rev.author} •{' '}
                        <span className="font-mono">/blogs/{rev.slug}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRestoreRevision(rev)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-[#0066FF] text-[#0066FF] hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
