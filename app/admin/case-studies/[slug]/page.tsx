'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MediaUploader from '@/components/admin/MediaUploader';
import { CaseStudyData } from '@/lib/caseStudyData';
import {
  Save,
  Check,
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  ExternalLink,
  Award,
  AlertCircle
} from 'lucide-react';

const EMPTY_CASE_STUDY: CaseStudyData = {
  slug: '',
  brandName: '',
  brandLogo: '/abt-img/Kay kay - logo.png',
  category: 'eCommerce Scaling',
  title: '',
  subtitle: '',
  snapshot: [
    { metric: '+250%', label: 'Revenue Growth', sublabel: 'Month-over-month increase' },
    { metric: '15%', label: 'ACOS Reduced', sublabel: 'Down from 38% initial burn' },
    { metric: '3,500+', label: 'Monthly Orders', sublabel: 'Consistent high volume' },
    { metric: '#1', label: 'Bestseller Rank', sublabel: 'In primary category' },
  ],
  challengeTitle: 'The Business Challenge',
  challenges: ['High ad spend with unprofitable ACOS', 'Poor organic listing visibility'],
  solutionTitle: 'Our Strategic Solution',
  solutions: [
    { icon: '/abt-img/Product Listing Optimization.png', title: 'Catalog Optimization', desc: 'Revamped titles, bullet points, and infographics.' },
  ],
  resultsTitle: 'Transformative Growth & ROI',
  results: [
    { stat: '+250%', title: 'Revenue Expansion', desc: 'Scaled monthly revenues consistently.' },
  ],
  dashboardImage: '/abt-img/kay-kay-1.png',
  listingImage: '/abt-img/kay-kay-2.png',
  testimonial: {
    quote: 'Arvian completely turned around our eCommerce performance.',
    author: 'Founder & Managing Director',
    designation: 'Client Brand',
  },
};

export default function CaseStudyEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams.slug;
  const isNew = slugParam === 'new';
  const router = useRouter();

  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [allCaseStudies, setAllCaseStudies] = useState<Record<string, CaseStudyData>>({});
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
          const map = data.data.caseStudies || {};
          setAllCaseStudies(map);
          if (isNew) {
            setCaseStudy({ ...EMPTY_CASE_STUDY });
          } else if (map[slugParam]) {
            setCaseStudy({ ...map[slugParam] });
          } else {
            setError(`Case study "${slugParam}" not found.`);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Error loading case study');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slugParam, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseStudy) return;

    if (!caseStudy.slug || !caseStudy.brandName || !caseStudy.title) {
      setError('Please provide a valid slug, brand name, and title.');
      return;
    }

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    const formattedSlug = caseStudy.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const updatedCaseStudy = { ...caseStudy, slug: formattedSlug };
    const updatedMap = { ...allCaseStudies, [formattedSlug]: updatedCaseStudy };

    if (!isNew && slugParam !== formattedSlug) {
      delete updatedMap[slugParam];
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'caseStudies',
          data: updatedMap,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        if (isNew) {
          router.push(`/admin/case-studies/${formattedSlug}`);
        }
      } else {
        setError(data.error || 'Failed to save case study');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving case study');
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

  if (!caseStudy) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
        <p className="text-sm text-red-600 font-bold">{error || 'Case study not found'}</p>
        <Link href="/admin/case-studies" className="text-xs text-blue-600 hover:underline">
          Return to Case Studies
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
            href="/admin/case-studies"
            className="p-2 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {isNew ? 'Create New Case Study' : `Edit: ${caseStudy.brandName}`}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              URL: /{caseStudy.slug || 'case-study-slug'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <Link
              href={`/${caseStudy.slug}`}
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
                <span>Save Case Study</span>
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

      {/* 1. Basic Info & Brand */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          1. Brand Identity & URL
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              URL Slug
            </label>
            <input
              type="text"
              value={caseStudy.slug}
              onChange={(e) => setCaseStudy({ ...caseStudy, slug: e.target.value })}
              placeholder="e.g. kay-kay-industries-amazon-case-study"
              required
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Brand / Client Name
            </label>
            <input
              type="text"
              value={caseStudy.brandName}
              onChange={(e) => setCaseStudy({ ...caseStudy, brandName: e.target.value })}
              placeholder="e.g. Kay Kay Industries"
              required
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Industry / Category
            </label>
            <input
              type="text"
              value={caseStudy.category}
              onChange={(e) => setCaseStudy({ ...caseStudy, category: e.target.value })}
              placeholder="e.g. Industrial Tools & Hardware"
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <MediaUploader
              label="Brand Logo"
              value={caseStudy.brandLogo}
              onChange={(url) => setCaseStudy({ ...caseStudy, brandLogo: url })}
              previewHeight="h-16"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Case Study Headline Title
            </label>
            <input
              type="text"
              value={caseStudy.title}
              onChange={(e) => setCaseStudy({ ...caseStudy, title: e.target.value })}
              placeholder="e.g. How Kay Kay Industries Scaled Amazon Revenue by +340%"
              required
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Subtitle / Strategy Summary
            </label>
            <textarea
              rows={2}
              value={caseStudy.subtitle}
              onChange={(e) => setCaseStudy({ ...caseStudy, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Snapshot Metrics (4 Highlights) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          2. Snapshot Growth Metrics (Top 4 Cards)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {caseStudy.snapshot?.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <span className="text-[10px] font-bold text-red-600 uppercase">Metric #{index + 1}</span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Metric (e.g. +340%)"
                  value={item.metric}
                  onChange={(e) => {
                    const updated = [...caseStudy.snapshot];
                    updated[index].metric = e.target.value;
                    setCaseStudy({ ...caseStudy, snapshot: updated });
                  }}
                  className="px-2.5 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => {
                    const updated = [...caseStudy.snapshot];
                    updated[index].label = e.target.value;
                    setCaseStudy({ ...caseStudy, snapshot: updated });
                  }}
                  className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                />
                <input
                  type="text"
                  placeholder="Sublabel"
                  value={item.sublabel}
                  onChange={(e) => {
                    const updated = [...caseStudy.snapshot];
                    updated[index].sublabel = e.target.value;
                    setCaseStudy({ ...caseStudy, snapshot: updated });
                  }}
                  className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Screenshots & Visuals */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          3. Proof Screenshots & Showcase Images
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MediaUploader
            label="Revenue Dashboard Screenshot"
            value={caseStudy.dashboardImage}
            onChange={(url) => setCaseStudy({ ...caseStudy, dashboardImage: url })}
          />

          <MediaUploader
            label="Optimized Product Listing / A+ Image"
            value={caseStudy.listingImage}
            onChange={(url) => setCaseStudy({ ...caseStudy, listingImage: url })}
          />
        </div>
      </div>

      {/* 5. Business Challenges */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              5. Business Challenges
            </h2>
            <p className="text-xs text-gray-500">Core pain points the client was facing</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newChallenges = [...(caseStudy.challenges || []), 'New client challenge'];
              setCaseStudy({ ...caseStudy, challenges: newChallenges });
            }}
            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Challenge
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Section Title
          </label>
          <input
            type="text"
            value={caseStudy.challengeTitle || 'The Business Challenge'}
            onChange={(e) => setCaseStudy({ ...caseStudy, challengeTitle: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white mb-3"
          />
        </div>

        <div className="space-y-2">
          {caseStudy.challenges?.map((challenge, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={challenge}
                onChange={(e) => {
                  const updated = [...(caseStudy.challenges || [])];
                  updated[index] = e.target.value;
                  setCaseStudy({ ...caseStudy, challenges: updated });
                }}
                className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  const filtered = (caseStudy.challenges || []).filter((_, i) => i !== index);
                  setCaseStudy({ ...caseStudy, challenges: filtered });
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Strategic Solutions */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              6. Strategic Solutions & Interventions
            </h2>
            <p className="text-xs text-gray-500">Key steps taken to scale the brand</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newSolutions = [
                ...(caseStudy.solutions || []),
                { icon: '/abt-img/Product Listing Optimization.png', title: 'New Solution', desc: 'Strategy description' },
              ];
              setCaseStudy({ ...caseStudy, solutions: newSolutions });
            }}
            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Solution
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Section Title
          </label>
          <input
            type="text"
            value={caseStudy.solutionTitle || 'Our Strategic Solution'}
            onChange={(e) => setCaseStudy({ ...caseStudy, solutionTitle: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white mb-3"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {caseStudy.solutions?.map((sol, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = (caseStudy.solutions || []).filter((_, i) => i !== index);
                  setCaseStudy({ ...caseStudy, solutions: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Solution Title
                </label>
                <input
                  type="text"
                  value={sol.title}
                  onChange={(e) => {
                    const updated = [...(caseStudy.solutions || [])];
                    updated[index].title = e.target.value;
                    setCaseStudy({ ...caseStudy, solutions: updated });
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
                  value={sol.desc}
                  onChange={(e) => {
                    const updated = [...(caseStudy.solutions || [])];
                    updated[index].desc = e.target.value;
                    setCaseStudy({ ...caseStudy, solutions: updated });
                  }}
                  className="w-full px-3 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <MediaUploader
                label="Solution Icon"
                value={sol.icon}
                onChange={(url) => {
                  const updated = [...(caseStudy.solutions || [])];
                  updated[index].icon = url;
                  setCaseStudy({ ...caseStudy, solutions: updated });
                }}
                previewHeight="h-14"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 7. Results & ROI Cards */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              7. Transformative Results & ROI
            </h2>
            <p className="text-xs text-gray-500">Key performance highlights and outcomes</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newResults = [
                ...(caseStudy.results || []),
                { stat: '+300%', title: 'Revenue Growth', desc: 'Result description' },
              ];
              setCaseStudy({ ...caseStudy, results: newResults });
            }}
            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Result Card
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Section Title
          </label>
          <input
            type="text"
            value={caseStudy.resultsTitle || 'Transformative Growth & ROI'}
            onChange={(e) => setCaseStudy({ ...caseStudy, resultsTitle: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white mb-3"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {caseStudy.results?.map((res, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = (caseStudy.results || []).filter((_, i) => i !== index);
                  setCaseStudy({ ...caseStudy, results: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-red-600 uppercase tracking-wider mb-1">
                    Stat / Metric
                  </label>
                  <input
                    type="text"
                    value={res.stat}
                    onChange={(e) => {
                      const updated = [...(caseStudy.results || [])];
                      updated[index].stat = e.target.value;
                      setCaseStudy({ ...caseStudy, results: updated });
                    }}
                    placeholder="e.g. +250%"
                    className="w-full px-3 py-1.5 text-xs font-bold border border-red-300 rounded-lg bg-red-50/40 text-red-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={res.title}
                    onChange={(e) => {
                      const updated = [...(caseStudy.results || [])];
                      updated[index].title = e.target.value;
                      setCaseStudy({ ...caseStudy, results: updated });
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={res.desc}
                  onChange={(e) => {
                    const updated = [...(caseStudy.results || [])];
                    updated[index].desc = e.target.value;
                    setCaseStudy({ ...caseStudy, results: updated });
                  }}
                  className="w-full px-3 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Client Testimonial */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          8. Client Quote & Testimonial
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Testimonial Quote
            </label>
            <textarea
              rows={3}
              value={caseStudy.testimonial?.quote || ''}
              onChange={(e) =>
                setCaseStudy({
                  ...caseStudy,
                  testimonial: { ...caseStudy.testimonial, quote: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={caseStudy.testimonial?.author || ''}
                onChange={(e) =>
                  setCaseStudy({
                    ...caseStudy,
                    testimonial: { ...caseStudy.testimonial, author: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Designation & Company
              </label>
              <input
                type="text"
                value={caseStudy.testimonial?.designation || ''}
                onChange={(e) =>
                  setCaseStudy({
                    ...caseStudy,
                    testimonial: { ...caseStudy.testimonial, designation: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Changes will immediately update /{caseStudy.slug || 'case-study-url'}
        </p>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Case Study'}</span>
        </button>
      </div>
    </form>
  );
}
