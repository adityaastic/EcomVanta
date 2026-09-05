'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MediaUploader from '@/components/admin/MediaUploader';
import { BlogPostItem } from '@/lib/cmsTypes';
import {
  Save,
  Check,
  Loader2,
  ArrowLeft,
  BookOpen,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const EMPTY_BLOG: BlogPostItem = {
  id: '',
  slug: '',
  title: '',
  category: 'eCommerce Growth',
  image: '/arvian-blogs.jpeg',
  author: 'Arvind Ajmera',
  date: 'September 2026',
  excerpt: '',
  content: '',
  link: '/blogs',
};

export default function BlogEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams.slug;
  const isNew = slugParam === 'new';
  const router = useRouter();

  const [blog, setBlog] = useState<BlogPostItem | null>(null);
  const [blogsList, setBlogsList] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.data) {
          const list = data.data.blogs || [];
          setBlogsList(list);
          if (isNew) {
            setBlog({ ...EMPTY_BLOG, id: Date.now().toString() });
          } else {
            const found = list.find((b: any) => b.slug === slugParam || b.id === slugParam);
            if (found) {
              setBlog({ ...found });
            } else {
              setError(`Blog post "${slugParam}" not found.`);
            }
          }
        }
      } catch (err: any) {
        setError(err.message || 'Error loading blog post');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slugParam, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    if (!blog.title) {
      setError('Please provide a title for the blog post.');
      return;
    }

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    const generatedSlug = blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updatedBlog = { ...blog, slug: generatedSlug, id: blog.id || Date.now().toString() };

    let updatedList: BlogPostItem[];
    if (isNew) {
      updatedList = [updatedBlog, ...blogsList];
    } else {
      updatedList = blogsList.map((b) => (b.id === blog.id || b.slug === slugParam ? updatedBlog : b));
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'blogs',
          data: updatedList,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        const text = await res.text().catch(() => '');
        data = { success: false, error: text || `HTTP ${res.status} response` };
      }

      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        if (isNew) {
          router.push(`/admin/blogs/${generatedSlug}`);
        }
      } else {
        setError(data.error || 'Failed to save blog post');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving blog post');
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
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
        <p className="text-sm text-[#0066FF] font-bold">{error || 'Article not found'}</p>
        <Link href="/admin/blogs" className="text-xs text-[#0066FF] hover:underline">
          Return to Blogs
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {isNew ? 'Create New Blog Post' : `Edit Article`}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              URL: /blogs/{blog.slug || 'article-slug'}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
              <span>Publish / Save</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Box */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Article Title
            </label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              placeholder="e.g. How to Sell on Myntra: Complete Seller Onboarding Guide 2026"
              required
              className="w-full px-3.5 py-2.5 text-sm font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={blog.category}
                onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                placeholder="e.g. Amazon, Flipkart, Quick Commerce"
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={blog.author}
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Published Date
              </label>
              <input
                type="text"
                value={blog.date}
                onChange={(e) => setBlog({ ...blog, date: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              URL Slug
            </label>
            <input
              type="text"
              value={blog.slug}
              onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
              placeholder="e.g. myntra-seller-onboarding-guide"
              className="w-full px-3.5 py-2 text-xs font-mono border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <MediaUploader
            label="Cover Featured Image"
            value={blog.image}
            onChange={(url) => setBlog({ ...blog, image: url })}
            helperText="Thumbnail banner for the article card (approx 800x500px)"
          />

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Short Excerpt / Preview Summary
            </label>
            <textarea
              rows={2}
              value={blog.excerpt}
              onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Article Body / Content
            </label>
            <textarea
              rows={12}
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              placeholder="Write or paste your article content here..."
              className="w-full px-3.5 py-3 text-xs border border-gray-300 rounded-xl font-mono leading-relaxed bg-white"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Saved articles appear immediately on the /blogs route.
        </p>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Article'}</span>
        </button>
      </div>
    </form>
  );
}
