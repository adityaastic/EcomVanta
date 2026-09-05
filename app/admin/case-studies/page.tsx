'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  TrendingUp
} from 'lucide-react';
import { CaseStudyData } from '@/lib/caseStudyData';

export default function CaseStudiesListPage() {
  const [caseStudies, setCaseStudies] = useState<Record<string, CaseStudyData>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.data) {
          setCaseStudies(data.data.caseStudies || {});
        }
      } catch (err) {
        console.error('Failed to load case studies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete case study "${slug}"?`)) return;

    setDeletingSlug(slug);
    const updated = { ...caseStudies };
    delete updated[slug];

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'caseStudies',
          data: updated,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCaseStudies(updated);
      } else {
        alert('Failed to delete case study');
      }
    } catch (err) {
      alert('Error deleting case study');
    } finally {
      setDeletingSlug(null);
    }
  };

  const caseStudyList = Object.values(caseStudies);
  const filteredCaseStudies = caseStudyList.filter(
    (cs) =>
      cs.brandName?.toLowerCase().includes(search.toLowerCase()) ||
      cs.title?.toLowerCase().includes(search.toLowerCase()) ||
      cs.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Case Studies & Portfolio CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage success stories, revenue growth metrics, before-and-after snapshots, and client quotes.
          </p>
        </div>

        <Link
          href="/admin/case-studies/new"
          className="px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand or title..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs font-semibold text-gray-500">
          Showing {filteredCaseStudies.length} of {caseStudyList.length} case studies
        </span>
      </div>

      {/* Case Studies Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        </div>
      ) : filteredCaseStudies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          No case studies found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCaseStudies.map((cs) => (
            <div
              key={cs.slug}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {cs.category}
                  </span>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-[#0066FF]"
                    title="View Live Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  {cs.brandLogo && (
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 p-1 flex items-center justify-center shrink-0">
                      <img src={cs.brandLogo} alt={cs.brandName} className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0066FF] transition-colors">
                      {cs.brandName}
                    </h3>
                    <p className="text-[11px] font-mono text-gray-400">/{cs.slug}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-semibold line-clamp-2">
                  {cs.title}
                </p>

                {/* Metrics snapshot preview */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  {cs.snapshot?.slice(0, 2).map((metric, i) => (
                    <div key={i} className="bg-blue-50/50 p-2 rounded-lg border border-blue-100/50">
                      <p className="text-xs font-black text-[#0066FF]">{metric.metric}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">
                  {cs.results?.length || 0} Key Results
                </span>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/admin/case-studies/${cs.slug}`}
                    className="p-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-[#0066FF] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(cs.slug)}
                    disabled={deletingSlug === cs.slug}
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
