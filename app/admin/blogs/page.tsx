'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  Calendar,
  User
} from 'lucide-react';
import { BlogPostItem } from '@/lib/cmsTypes';

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.data) {
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    setDeletingId(id);
    const updated = blogs.filter((b) => b.id !== id);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'blogs',
          data: updated,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBlogs(updated);
      } else {
        alert('Failed to delete blog');
      }
    } catch (err) {
      alert('Error deleting blog');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Blogs & Knowledge Articles CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Publish and manage marketplace guides, seller tips, and thought leadership articles.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs by title or category..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs font-semibold text-gray-500">
          Showing {filteredBlogs.length} of {blogs.length} articles
        </span>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          No blog posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Thumbnail Image */}
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Cover Image
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                  {blog.category || 'Article'}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{blog.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{blog.author}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {blog.excerpt || blog.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/admin/blogs/${blog.slug || blog.id}`}
                    className="p-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Article</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    disabled={deletingId === blog.id}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
