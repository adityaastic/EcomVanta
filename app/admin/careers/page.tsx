'use client';

import React, { useState, useEffect } from 'react';
import { JobOpening, CareerPageContent, DEFAULT_CAREER_PAGE_CONTENT } from '@/lib/cmsTypes';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import MediaUploader from '@/components/admin/MediaUploader';
import {
  Briefcase,
  Plus,
  Trash2,
  Save,
  Check,
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function CareersAdminPage() {
  const [careers, setCareers] = useState<JobOpening[]>([]);
  const [careerPage, setCareerPage] = useState<CareerPageContent>(DEFAULT_CAREER_PAGE_CONTENT);
  const [activeTab, setActiveTab] = useState<'positions' | 'page'>('positions');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const local = getLocalCmsContent();
    if (local?.careers) {
      setCareers(local.careers);
    }
    if (local?.careerPage) {
      setCareerPage(local.careerPage);
    }
    if (local?.careers || local?.careerPage) {
      setLoading(false);
    }

    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data) {
          if (data.data.careers) {
            setCareers(data.data.careers);
          }
          if (data.data.careerPage) {
            setCareerPage({ ...DEFAULT_CAREER_PAGE_CONTENT, ...data.data.careerPage });
          }
          saveLocalCmsContent({
            careers: data.data.careers,
            careerPage: data.data.careerPage,
          });
        }
      } catch (err) {
        if (!local?.careers) {
          console.error('Failed to load careers:', err);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    saveLocalCmsContent({ careers, careerPage });

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'careers',
          data: {
            careers,
            careerPage,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.careers) setCareers(data.data.careers);
        if (data.data.careerPage) setCareerPage(data.data.careerPage);
        saveLocalCmsContent({
          careers: data.data.careers,
          careerPage: data.data.careerPage,
        });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleAddJob = () => {
    const newJob: JobOpening = {
      id: Date.now().toString(),
      title: 'New Position Title',
      department: 'Marketplace Operations',
      location: 'New Delhi / Hybrid',
      type: 'Full-time',
      experience: '1-3 Years',
      description: 'Lead Amazon & Flipkart brand management, PPC ad strategy, and client relations for top D2C brands.',
      requirements: ['Experience managing Amazon / Flipkart seller accounts', 'Strong communication and analytical skills'],
      status: 'Open',
    };
    setCareers([newJob, ...careers]);
  };

  const handleDeleteJob = (id: string) => {
    setCareers(careers.filter((c) => c.id !== id));
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Careers & Hiring CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage open job positions, career banner images, and hiring copy displayed on the /career page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'positions' && (
            <button
              type="button"
              onClick={handleAddJob}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Position
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
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
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'positions'
              ? 'border-[#0066FF] text-[#0066FF]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Openings ({careers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('page')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'page'
              ? 'border-[#0066FF] text-[#0066FF]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Page Banner & Copy</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* TAB 1: JOB OPENINGS */}
      {activeTab === 'positions' && (
        <div className="space-y-4">
          {careers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
              No active job openings. Click &ldquo;Add Position&rdquo; to create one.
            </div>
          ) : (
            careers.map((job, index) => (
              <div
                key={job.id || index}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4 relative"
              >
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                    Position #{index + 1}: {job.title || 'Untitled'}
                  </span>

                  <div className="flex items-center gap-2">
                    <select
                      value={job.status}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].status = e.target.value as 'Open' | 'Closed';
                        setCareers(updated);
                      }}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                        job.status === 'Open'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      <option value="Open">Status: Open (Visible on website)</option>
                      <option value="Closed">Status: Closed (Hidden)</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Position"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].title = e.target.value;
                        setCareers(updated);
                      }}
                      className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={job.department}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].department = e.target.value;
                        setCareers(updated);
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Experience Required
                    </label>
                    <input
                      type="text"
                      value={job.experience}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].experience = e.target.value;
                        setCareers(updated);
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={job.location}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].location = e.target.value;
                        setCareers(updated);
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Job Type
                    </label>
                    <input
                      type="text"
                      value={job.type}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].type = e.target.value;
                        setCareers(updated);
                      }}
                      placeholder="Full-time, Part-time, Remote, Hybrid"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Role Overview & Description
                    </label>
                    <textarea
                      rows={3}
                      value={job.description}
                      onChange={(e) => {
                        const updated = [...careers];
                        updated[index].description = e.target.value;
                        setCareers(updated);
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-4 space-y-2 pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                        Key Responsibilities & Qualifications
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...careers];
                          updated[index].requirements = [...(updated[index].requirements || []), 'New requirement'];
                          setCareers(updated);
                        }}
                        className="text-[11px] font-bold text-[#0066FF] hover:text-[#0052cc] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet Point
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {job.requirements?.map((req, rIndex) => (
                        <div key={rIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => {
                              const updated = [...careers];
                              const reqs = [...(updated[index].requirements || [])];
                              reqs[rIndex] = e.target.value;
                              updated[index].requirements = reqs;
                              setCareers(updated);
                            }}
                            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...careers];
                              updated[index].requirements = (updated[index].requirements || []).filter((_, i) => i !== rIndex);
                              setCareers(updated);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: PAGE BANNER & COPY */}
      {activeTab === 'page' && (
        <div className="space-y-6">
          {/* 1. CAREER BANNER IMAGE */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#0066FF]" /> Career Page Team / Banner Image
            </h3>
            <p className="text-xs text-gray-500">
              Upload or update the wide showcase photo displayed in the middle of the Career page.
            </p>

            <MediaUploader
              label="Career Page Team Showcase Image"
              value={careerPage.bannerImage || ''}
              onChange={(url) => setCareerPage({ ...careerPage, bannerImage: url })}
              helperText="Upload a high-resolution team photo or office workspace image (PNG, WebP, JPG)"
              previewHeight="h-44"
            />
          </div>

          {/* 2. HERO SECTION COPY */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF]" /> Hero Header & Pitch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Hero Badge
                </label>
                <input
                  type="text"
                  value={careerPage.heroBadge || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, heroBadge: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Title Prefix
                </label>
                <input
                  type="text"
                  value={careerPage.heroTitle || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, heroTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Title Highlight
                </label>
                <input
                  type="text"
                  value={careerPage.heroHighlight || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, heroHighlight: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-bold text-[#0066FF] border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={careerPage.heroSubtitle || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Intro Pitch Statement
                </label>
                <textarea
                  rows={2}
                  value={careerPage.pitchText || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, pitchText: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>

          {/* 3. WHY JOIN SECTION */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0066FF]" /> Why Join & Culture
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={careerPage.whyJoinTitle || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, whyJoinTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Section Description
                </label>
                <textarea
                  rows={2}
                  value={careerPage.whyJoinDescription || ''}
                  onChange={(e) => setCareerPage({ ...careerPage, whyJoinDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                    Why Join Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(careerPage.whyJoinPoints || []), 'New point'];
                      setCareerPage({ ...careerPage, whyJoinPoints: updated });
                    }}
                    className="text-[11px] font-bold text-[#0066FF] hover:text-[#0052cc] flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Point
                  </button>
                </div>

                {careerPage.whyJoinPoints?.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={pt}
                      onChange={(e) => {
                        const updated = [...(careerPage.whyJoinPoints || [])];
                        updated[pIdx] = e.target.value;
                        setCareerPage({ ...careerPage, whyJoinPoints: updated });
                      }}
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (careerPage.whyJoinPoints || []).filter((_, i) => i !== pIdx);
                        setCareerPage({ ...careerPage, whyJoinPoints: updated });
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-800">
            Ready to publish career changes?
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will sync to the /career portal and database in real-time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving to Cloud...</span>
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Saved to Supabase!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Careers CMS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
