'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ServiceData } from '@/lib/serviceData';

export default function ServicesListPage() {
  const [services, setServices] = useState<Record<string, ServiceData>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.data) {
          setServices(data.data.services || {});
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete service "${slug}"?`)) return;

    setDeletingSlug(slug);
    const updated = { ...services };
    delete updated[slug];

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services',
          data: updated,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setServices(updated);
      } else {
        alert('Failed to delete service');
      }
    } catch (err) {
      alert('Error deleting service');
    } finally {
      setDeletingSlug(null);
    }
  };

  const serviceList = Object.values(services);
  const filteredServices = serviceList.filter(
    (s) =>
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.slug?.toLowerCase().includes(search.toLowerCase()) ||
      s.badge?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Marketplace & Marketing Services CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage all 20+ service landing pages, feature grids, advantages, and custom FAQs.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs font-semibold text-gray-500">
          Showing {filteredServices.length} of {serviceList.length} services
        </span>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          No services found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 truncate max-w-[200px]">
                    {service.badge || 'Service'}
                  </span>
                  <Link
                    href={`/${service.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-red-600"
                    title="View Live Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {service.subtitle || service.aboutDesc}
                </p>

                <div className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded truncate">
                  /{service.slug}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">
                  {service.servicesGrid?.length || 0} features • {service.faqs?.length || 0} FAQs
                </span>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/admin/services/${service.slug}`}
                    className="p-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(service.slug)}
                    disabled={deletingSlug === service.slug}
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
