'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  Calendar,
  User,
  Copy,
  Eye,
  Star,
  CheckCircle2,
  Clock,
  FileEdit,
  AlertTriangle,
  Link2,
  Target,
  FileText,
} from 'lucide-react';
import { BlogPostItem, SiteContentData } from '@/lib/cmsTypes';
import { analyzeOnPageSeo } from '@/lib/seoAnalyzer';
import { saveLocalCmsContent } from '@/lib/useCmsContent';

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [cmsData, setCmsData] = useState<SiteContentData | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled' | 'featured'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.data) {
          setCmsData(data.data);
          setBlogs(data.data.blogs || []);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const persistBlogs = async (updated: BlogPostItem[]) => {
    setBlogs(updated);
    saveLocalCmsContent({ blogs: updated });
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'blogs',
        data: updated,
      }),
    });
    return res.json();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    setDeletingId(id);
    const updated = blogs.filter((b) => b.id !== id);
    try {
      await persistBlogs(updated);
    } catch {
      alert('Error deleting blog');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (blog: BlogPostItem) => {
    setUpdatingId(blog.id);
    const newId = Date.now().toString();
    const copy: BlogPostItem = {
      ...blog,
      id: newId,
      slug: `${blog.slug}-copy-${newId.slice(-4)}`,
      title: `${blog.title} (Copy)`,
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [copy, ...blogs];
    try {
      await persistBlogs(updated);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleStatus = async (blog: BlogPostItem, nextStatus: 'published' | 'draft') => {
    setUpdatingId(blog.id);
    const updated = blogs.map((b) =>
      b.id === blog.id
        ? {
            ...b,
            status: nextStatus,
            updatedAt: new Date().toISOString().split('T')[0],
          }
        : b
    );
    try {
      await persistBlogs(updated);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleFeatured = async (blog: BlogPostItem) => {
    setUpdatingId(blog.id);
    const updated = blogs.map((b) =>
      b.id === blog.id ? { ...b, featured: !b.featured } : b
    );
    try {
      await persistBlogs(updated);
    } finally {
      setUpdatingId(null);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  const enrichedBlogs = useMemo(() => {
    return blogs.map((blog) => {
      const status = blog.status || 'published';
      const analysis = analyzeOnPageSeo({
        title: blog.title,
        slug: blog.slug,
        urlPath: `/blogs/${blog.slug}`,
        contentHtml: blog.content || '',
        excerpt: blog.excerpt || '',
        featuredImage: blog.image,
        featuredImageAlt: blog.imageAlt,
        seo: blog.seo,
        contentType: 'blog',
      });
      return {
        blog,
        status,
        analysis,
      };
    });
  }, [blogs]);

  const filteredBlogs = enrichedBlogs.filter(({ blog, status }) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.category?.toLowerCase().includes(search.toLowerCase()) ||
      blog.author?.toLowerCase().includes(search.toLowerCase()) ||
      blog.seo?.focusKeyword?.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'featured' && !blog.featured) return false;
    if (statusFilter !== 'all' && statusFilter !== 'featured' && status !== statusFilter) return false;
    if (categoryFilter !== 'all' && blog.category !== categoryFilter) return false;
    return true;
  });

  const counts = useMemo(() => {
    return {
      all: enrichedBlogs.length,
      published: enrichedBlogs.filter((x) => x.status === 'published').length,
      draft: enrichedBlogs.filter((x) => x.status === 'draft').length,
      scheduled: enrichedBlogs.filter((x) => x.status === 'scheduled').length,
      featured: enrichedBlogs.filter((x) => x.blog.featured).length,
    };
  }, [enrichedBlogs]);

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              WordPress-Style Blog & Content Manager
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-50 text-[#0066FF] rounded-full border border-blue-200">
              RankMath SEO Integrated
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Write long-form articles, manage drafts & scheduled posts, optimize focus keywords, and monitor on-page SEO scores.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/seo/bulk-editor"
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-all"
          >
            Bulk SEO Editor
          </Link>
          <Link
            href="/admin/blogs/new"
            className="px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* Status Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'all', label: 'All Articles', count: counts.all },
              { id: 'published', label: 'Published', count: counts.published },
              { id: 'draft', label: 'Drafts', count: counts.draft },
              { id: 'scheduled', label: 'Scheduled', count: counts.scheduled },
              { id: 'featured', label: 'Featured', count: counts.featured },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-[#0066FF] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-white text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, keyword, author..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Blogs Table / Cards */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          No blog articles match your current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlogs.map(({ blog, status, analysis }) => {
            const scoreColor =
              analysis.score >= 80
                ? 'bg-emerald-500 text-white'
                : analysis.score >= 55
                ? 'bg-amber-500 text-white'
                : 'bg-rose-500 text-white';

            return (
              <div
                key={blog.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Thumbnail Image & Badges */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.imageAlt || blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      No Cover Image
                    </div>
                  )}

                  {/* Category + Status */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="bg-[#0066FF] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow">
                      {blog.category || 'Article'}
                    </span>
                    {status === 'published' && (
                      <span className="bg-emerald-600/95 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    )}
                    {status === 'draft' && (
                      <span className="bg-slate-800/95 text-amber-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                        <FileEdit className="w-3 h-3" /> Draft
                      </span>
                    )}
                    {status === 'scheduled' && (
                      <span className="bg-purple-700/95 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Scheduled
                      </span>
                    )}
                  </div>

                  {/* Live SEO Score Pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(blog)}
                      title={blog.featured ? 'Featured Article' : 'Mark as Featured'}
                      className={`p-1.5 rounded-lg shadow transition-colors ${
                        blog.featured
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-900/60 text-white hover:bg-slate-900'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <div
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black shadow ${scoreColor}`}
                      title="Real-Time On-Page SEO Score"
                    >
                      SEO {analysis.score}/100
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{blog.author}</span>
                      </span>
                    </div>

                    <Link
                      href={`/admin/blogs/${blog.slug || blog.id}`}
                      className="block text-sm font-extrabold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-2"
                    >
                      {blog.title}
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {blog.excerpt || blog.customIntro}
                    </p>

                    {/* SEO Telemetry Strip */}
                    <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                      {blog.seo?.focusKeyword ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
                          <Target className="w-3 h-3" />
                          {blog.seo.focusKeyword}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold border border-amber-200/60">
                          <AlertTriangle className="w-3 h-3" />
                          No Focus Keyword
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        <FileText className="w-3 h-3" />
                        {analysis.wordCount}w • {analysis.readingTimeMinutes}m
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        <Link2 className="w-3 h-3" />
                        {analysis.internalLinks.length} int
                      </span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/blogs/${blog.slug || blog.id}`}
                        className="px-3 py-1.5 bg-[#0066FF]/10 hover:bg-[#0066FF] text-[#0066FF] hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit & SEO</span>
                      </Link>

                      <Link
                        href={
                          status === 'published'
                            ? `/blogs/${blog.slug}`
                            : `/blogs/${blog.slug}?preview=true`
                        }
                        target="_blank"
                        title={status === 'published' ? 'View Live Article' : 'Preview Draft Article'}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                      >
                        {status === 'published' ? (
                          <ExternalLink className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </Link>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={updatingId === blog.id}
                        onClick={() =>
                          handleToggleStatus(
                            blog,
                            status === 'published' ? 'draft' : 'published'
                          )
                        }
                        className="px-2 py-1 text-[11px] font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title={status === 'published' ? 'Switch to Draft' : 'Publish Now'}
                      >
                        {status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>

                      <button
                        type="button"
                        disabled={updatingId === blog.id}
                        onClick={() => handleDuplicate(blog)}
                        title="Duplicate Article"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        title="Delete Article"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
