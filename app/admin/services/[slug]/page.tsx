'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MediaUploader from '@/components/admin/MediaUploader';
import { ServiceData } from '@/lib/serviceData';
import {
  Save,
  Check,
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  HelpCircle,
  Award,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const EMPTY_SERVICE: ServiceData = {
  slug: '',
  badge: 'Marketplace Partner',
  title: '',
  subtitle: '',
  heroImage: '/flipkart-account/product-dashboard.png',
  aboutImage: '/abt-img/flipkart-web-about.png',
  aboutTitle: '',
  aboutDesc: '',
  servicesGrid: [
    { icon: '/home-img/SEO-Optimized Product Titles.png', title: 'Listing Optimization', desc: 'Optimized product titles and copy.' },
    { icon: '/home-img/Keyword-rich Descriptions & bullet points.png', title: 'Ad Campaign Scaling', desc: 'Targeted ROAS management.' },
  ],
  advantages: [
    { title: 'Dedicated Manager', desc: 'Certified eCommerce specialist assigned to your account.' },
  ],
  faqs: [
    { question: 'What documents are required to start?', answer: 'We require GST certificate, trademark authorization, and catalog access.' },
  ],
};

export default function ServiceEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams.slug;
  const isNew = slugParam === 'new';
  const router = useRouter();

  const [service, setService] = useState<ServiceData | null>(null);
  const [allServices, setAllServices] = useState<Record<string, ServiceData>>({});
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
          const servicesMap = data.data.services || {};
          setAllServices(servicesMap);
          if (isNew) {
            setService({ ...EMPTY_SERVICE });
          } else if (servicesMap[slugParam]) {
            setService({ ...servicesMap[slugParam] });
          } else {
            setError(`Service with slug "${slugParam}" not found.`);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Error loading service');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slugParam, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    if (!service.slug || !service.title) {
      setError('Please provide a valid slug and title.');
      return;
    }

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    const formattedSlug = service.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const updatedService = { ...service, slug: formattedSlug };
    const updatedMap = { ...allServices, [formattedSlug]: updatedService };

    if (!isNew && slugParam !== formattedSlug) {
      delete updatedMap[slugParam];
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services',
          data: updatedMap,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        if (isNew) {
          router.push(`/admin/services/${formattedSlug}`);
        }
      } else {
        setError(data.error || 'Failed to save service');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
        <p className="text-sm text-red-600 font-bold">{error || 'Service not found'}</p>
        <Link href="/admin/services" className="text-xs text-blue-600 hover:underline">
          Return to Services List
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
            href="/admin/services"
            className="p-2 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {isNew ? 'Create New Service' : `Edit: ${service.title}`}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              URL: /{service.slug || 'your-service-slug'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <Link
              href={`/${service.slug}`}
              target="_blank"
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              <span>Live Page</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
                <span>Save Service</span>
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

      {/* 1. Basic Service Setup */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          1. General Details & URL Slug
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Service URL Slug
            </label>
            <input
              type="text"
              value={service.slug}
              onChange={(e) => setService({ ...service, slug: e.target.value })}
              placeholder="e.g. amazon-seller-account-management-services"
              required
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Header Badge Text
            </label>
            <input
              type="text"
              value={service.badge}
              onChange={(e) => setService({ ...service, badge: e.target.value })}
              placeholder="e.g. Official Flipkart Partner Network"
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Service Main Title
            </label>
            <input
              type="text"
              value={service.title}
              onChange={(e) => setService({ ...service, title: e.target.value })}
              placeholder="e.g. Flipkart Account Management Services"
              required
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Service Subtitle / Tagline
            </label>
            <textarea
              rows={2}
              value={service.subtitle}
              onChange={(e) => setService({ ...service, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <MediaUploader
              label="Hero Banner Image / Dashboard Screenshot"
              value={service.heroImage}
              onChange={(url) => setService({ ...service, heroImage: url })}
            />
          </div>
        </div>
      </div>

      {/* 2. About & Section Content */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          2. About & Overview Section
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              About Section Heading
            </label>
            <input
              type="text"
              value={service.aboutTitle}
              onChange={(e) => setService({ ...service, aboutTitle: e.target.value })}
              placeholder="e.g. Maximize Your Brand Visibility on Marketplace"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              About Description Copy
            </label>
            <textarea
              rows={4}
              value={service.aboutDesc}
              onChange={(e) => setService({ ...service, aboutDesc: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <MediaUploader
            label="About Section Image"
            value={service.aboutImage || ''}
            onChange={(url) => setService({ ...service, aboutImage: url })}
          />
        </div>
      </div>

      {/* 3. Features & Deliverables Grid */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              3. Service Deliverables & Features Grid
            </h2>
            <p className="text-xs text-gray-500">Feature cards shown in the deliverables section</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newGrid = [
                ...service.servicesGrid,
                {
                  icon: '/home-img/SEO-Optimized Product Titles.png',
                  title: 'New Feature',
                  desc: 'Feature description.',
                },
              ];
              setService({ ...service, servicesGrid: newGrid });
            }}
            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Feature Card
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.servicesGrid.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = service.servicesGrid.filter((_, i) => i !== index);
                  setService({ ...service, servicesGrid: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...service.servicesGrid];
                    updated[index].title = e.target.value;
                    setService({ ...service, servicesGrid: updated });
                  }}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={item.desc}
                  onChange={(e) => {
                    const updated = [...service.servicesGrid];
                    updated[index].desc = e.target.value;
                    setService({ ...service, servicesGrid: updated });
                  }}
                  className="w-full px-3 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <MediaUploader
                label="Feature Icon"
                value={item.icon}
                onChange={(url) => {
                  const updated = [...service.servicesGrid];
                  updated[index].icon = url;
                  setService({ ...service, servicesGrid: updated });
                }}
                previewHeight="h-14"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Service Specific FAQs */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            4. Service Frequently Asked Questions (FAQs)
          </h2>
          <button
            type="button"
            onClick={() => {
              const newFaqs = [
                ...service.faqs,
                { question: 'New Question?', answer: 'Answer here.' },
              ];
              setService({ ...service, faqs: newFaqs });
            }}
            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-2">
              <button
                type="button"
                onClick={() => {
                  const filtered = service.faqs.filter((_, i) => i !== index);
                  setService({ ...service, faqs: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Question #{index + 1}
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...service.faqs];
                    updated[index].question = e.target.value;
                    setService({ ...service, faqs: updated });
                  }}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Answer
                </label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...service.faqs];
                    updated[index].answer = e.target.value;
                    setService({ ...service, faqs: updated });
                  }}
                  className="w-full px-3 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Save your changes to publish directly to /{service.slug || 'service-url'}
        </p>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Service'}</span>
        </button>
      </div>
    </form>
  );
}
