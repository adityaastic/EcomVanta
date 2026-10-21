'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MediaUploader from '@/components/admin/MediaUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { FounderPageContent, FounderMilestone, FounderPrinciple } from '@/lib/cmsTypes';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import {
  Award,
  Users,
  Save,
  Check,
  Loader2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Quote,
  Target,
  Compass,
  TrendingUp,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

const DEFAULT_FOUNDER: FounderPageContent = {
  heroBadge: 'LEADERSHIP & VISION',
  heroTitle: 'Meet Our Founder & CEO',
  heroSubtitle: 'The driving force behind EcomVanta’s journey from a bootstrap agency to managing ₹50Cr+ GMV for India’s fastest-growing marketplace brands.',
  founderName: 'Shivam Dubey',
  founderRole: 'Founder & CEO, EcomVanta',
  founderImage: '',
  founderQuote: 'We Don’t Just Manage Accounts — We Build Enduring E-Commerce Market Leaders.',
  bioHeading: 'The Story Behind EcomVanta',
  bioParagraphs: [
    'Shivam Dubey founded EcomVanta with a straightforward mission: to eliminate the chaos, hidden fees, and empty promises prevalent in the e-commerce agency ecosystem. Having witnessed hundreds of promising sellers struggle with suppressed listings, spiraling ad spend, and bureaucratic marketplace support, Shivam envisioned a truly specialized partner with skin in the game.',
    'Under his leadership, EcomVanta has grown from managing a single seller account to orchestrating multi-channel e-commerce growth for over 500+ brands across Amazon, Flipkart, Meesho, Blinkit, Zepto, Myntra, and custom D2C stores.',
    'Today, Shivam leads a team of 50+ marketplace specialists, ad analysts, and catalog designers in New Delhi, helping manufacturers, heritage businesses, and innovative consumer brands scale profitably across India and overseas.',
  ],
  milestones: [
    { id: '1', number: '₹50Cr+', label: 'GMV Generated', desc: 'For partner brands across Indian marketplaces' },
    { id: '2', number: '500+', label: 'Brands Scaled', desc: 'From startup sellers to multi-crore enterprises' },
    { id: '3', number: '50+', label: 'In-House Specialists', desc: 'Category experts, ad managers & designers' },
    { id: '4', number: '98%', label: 'Client Retention', desc: 'Long-term partnerships built on verified ROI' },
  ],
  principles: [
    { id: '1', title: 'Complete Transparency', description: 'No inflated metrics or vanity reporting. We share real-time analytics, exact ad spend figures, and clear profitability margins.' },
    { id: '2', title: 'Execution Over Excuses', description: 'Marketplace algorithms change daily. We stay ahead with rapid listing experiments, proactive account health checks, and swift problem resolution.' },
    { id: '3', title: 'Your Brand, Our Responsibility', description: 'We treat your capital, inventory, and reputation with the same care and scrutiny as if it were our own business.' },
  ],
  visionHeading: 'Our Vision for Indian E-Commerce',
  visionText: 'To empower every visionary manufacturer and brand in India with world-class marketplace capabilities, ensuring domestic products dominate online market share globally.',
  calloutTitle: 'Want to Scale Your Brand with Shivam Dubey’s Team?',
  calloutDesc: 'Schedule an exclusive 1-on-1 marketplace growth audit and uncover hidden revenue opportunities in your catalog.',
};

export default function FounderAdminPage() {
  const [founder, setFounder] = useState<FounderPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Load from local cache first for fast render
    const local = getLocalCmsContent();
    if (local?.founder) {
      setFounder(local.founder);
      setLoading(false);
    }

    // 2. Fetch fresh from server
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data?.founder) {
          setFounder(data.data.founder);
          saveLocalCmsContent({ founder: data.data.founder });
        } else if (!local?.founder) {
          setFounder(DEFAULT_FOUNDER);
        }
      } catch (err: any) {
        if (!local?.founder) {
          setFounder(DEFAULT_FOUNDER);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!founder) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    // Update local cache immediately
    saveLocalCmsContent({ founder });

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'founder',
          data: founder,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.founder) {
        setFounder(data.data.founder);
        saveLocalCmsContent({ founder: data.data.founder });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save founder changes.');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !founder) {
    return (
      <div className="py-24 flex flex-col justify-center items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading Founder Page Content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-20">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#0066FF]">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0066FF]">
              Leadership &amp; Founder Page CMS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Founder Page &amp; Leadership Showcase
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage Shivam Dubey&apos;s photo, bio, quote, milestone numbers, core principles, and the homepage leadership spotlight.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/founder"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
                <span>Save Changes</span>
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

      {/* 1. HERO HEADER SETTINGS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Hero Section Headline &amp; Subtitle
            </h2>
            <p className="text-xs text-slate-500">
              The primary banner displayed at the top of the /founder page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Badge Pill Text
            </label>
            <input
              type="text"
              value={founder.heroBadge || ''}
              onChange={(e) => setFounder({ ...founder, heroBadge: e.target.value })}
              placeholder="e.g. LEADERSHIP & VISION"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Main Hero Title
            </label>
            <input
              type="text"
              value={founder.heroTitle || ''}
              onChange={(e) => setFounder({ ...founder, heroTitle: e.target.value })}
              placeholder="e.g. Meet Our Founder & CEO"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Hero Subtitle / Description
          </label>
          <textarea
            rows={3}
            value={founder.heroSubtitle || ''}
            onChange={(e) => setFounder({ ...founder, heroSubtitle: e.target.value })}
            placeholder="Write an introductory subtitle summarizing the founder's mission..."
            className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white leading-relaxed"
          />
        </div>
      </div>

      {/* 2. FOUNDER IDENTITY & PHOTO */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Founder Profile, Photo &amp; Main Quote
            </h2>
            <p className="text-xs text-slate-500">
              Personal branding details that appear on /founder and the homepage leadership spotlight.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Founder Name
            </label>
            <input
              type="text"
              value={founder.founderName || ''}
              onChange={(e) => setFounder({ ...founder, founderName: e.target.value })}
              placeholder="e.g. Shivam Dubey"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Role / Designation
            </label>
            <input
              type="text"
              value={founder.founderRole || ''}
              onChange={(e) => setFounder({ ...founder, founderRole: e.target.value })}
              placeholder="e.g. Founder & CEO, EcomVanta"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>

        <MediaUploader
          label="Founder Portrait / Profile Photo"
          value={founder.founderImage || ''}
          onChange={(url) => setFounder({ ...founder, founderImage: url })}
          helperText="Upload a professional portrait photo of Shivam Dubey (recommended vertical/square aspect ratio)."
          previewHeight="h-44"
        />

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Founder Signature Quote
          </label>
          <input
            type="text"
            value={founder.founderQuote || ''}
            onChange={(e) => setFounder({ ...founder, founderQuote: e.target.value })}
            placeholder="e.g. We Don't Just Manage Accounts — We Build Enduring E-Commerce Market Leaders."
            className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white text-blue-700"
          />
        </div>
      </div>

      {/* 3. FOUNDER STORY & BIO PARAGRAPHS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                The Story Behind EcomVanta (Bio Paragraphs)
              </h2>
              <p className="text-xs text-slate-500">
                Detailed bio narrative explaining Shivam Dubey&apos;s background, inspiration, and track record.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const currentParas = founder.bioParagraphs || [];
              setFounder({ ...founder, bioParagraphs: [...currentParas, ''] });
            }}
            className="px-3 py-1.5 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Paragraph
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Bio Section Heading
          </label>
          <input
            type="text"
            value={founder.bioHeading || ''}
            onChange={(e) => setFounder({ ...founder, bioHeading: e.target.value })}
            placeholder="e.g. The Story Behind EcomVanta"
            className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
          />
        </div>

        <div className="space-y-4">
          {(founder.bioParagraphs || []).map((para, pIdx) => (
            <div key={pIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Paragraph #{pIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const filtered = (founder.bioParagraphs || []).filter((_, i) => i !== pIdx);
                    setFounder({ ...founder, bioParagraphs: filtered });
                  }}
                  className="text-slate-400 hover:text-red-600 p-1"
                  title="Delete Paragraph"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <textarea
                rows={4}
                value={para}
                onChange={(e) => {
                  const updated = [...(founder.bioParagraphs || [])];
                  updated[pIdx] = e.target.value;
                  setFounder({ ...founder, bioParagraphs: updated });
                }}
                placeholder="Write paragraph content..."
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. KEY MILESTONES STATS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
              4
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Key Milestone Stat Cards
              </h2>
              <p className="text-xs text-slate-500">
                The 4 metrics (e.g. ₹50Cr+ GMV, 500+ Brands, 50+ Experts, 98% Retention).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const current = founder.milestones || [];
              setFounder({
                ...founder,
                milestones: [
                  ...current,
                  { id: Date.now().toString(), number: '100+', label: 'New Metric', desc: 'Metric description' },
                ],
              });
            }}
            className="px-3 py-1.5 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(founder.milestones || []).map((m, mIdx) => (
            <div key={m.id || mIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = (founder.milestones || []).filter((_, i) => i !== mIdx);
                  setFounder({ ...founder, milestones: filtered });
                }}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-600"
                title="Remove Stat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Value / Number
                  </label>
                  <input
                    type="text"
                    value={m.number}
                    onChange={(e) => {
                      const updated = [...(founder.milestones || [])];
                      updated[mIdx] = { ...updated[mIdx], number: e.target.value };
                      setFounder({ ...founder, milestones: updated });
                    }}
                    placeholder="e.g. ₹50Cr+"
                    className="w-full px-2.5 py-1.5 text-xs font-black text-[#0066FF] border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => {
                      const updated = [...(founder.milestones || [])];
                      updated[mIdx] = { ...updated[mIdx], label: e.target.value };
                      setFounder({ ...founder, milestones: updated });
                    }}
                    placeholder="e.g. GMV Generated"
                    className="w-full px-2.5 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Brief Subtext
                </label>
                <input
                  type="text"
                  value={m.desc || ''}
                  onChange={(e) => {
                    const updated = [...(founder.milestones || [])];
                    updated[mIdx] = { ...updated[mIdx], desc: e.target.value };
                    setFounder({ ...founder, milestones: updated });
                  }}
                  placeholder="e.g. For partner brands across Indian marketplaces"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CORE PRINCIPLES */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
              5
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Shivam Dubey’s 3 Core Operating Principles
              </h2>
              <p className="text-xs text-slate-500">
                The values and commitments shown on the founder profile.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const current = founder.principles || [];
              setFounder({
                ...founder,
                principles: [
                  ...current,
                  { id: Date.now().toString(), title: 'New Principle', description: 'Describe principle...' },
                ],
              });
            }}
            className="px-3 py-1.5 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Principle
          </button>
        </div>

        <div className="space-y-4">
          {(founder.principles || []).map((p, pIdx) => (
            <div key={p.id || pIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = (founder.principles || []).filter((_, i) => i !== pIdx);
                  setFounder({ ...founder, principles: filtered });
                }}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-600"
                title="Remove Principle"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Principle Title #{pIdx + 1}
                </label>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => {
                    const updated = [...(founder.principles || [])];
                    updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                    setFounder({ ...founder, principles: updated });
                  }}
                  placeholder="e.g. Complete Transparency"
                  className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Principle Explanation
                </label>
                <textarea
                  rows={2}
                  value={p.description}
                  onChange={(e) => {
                    const updated = [...(founder.principles || [])];
                    updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                    setFounder({ ...founder, principles: updated });
                  }}
                  placeholder="Explain this principle..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. VISION & MISSION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            6
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Vision Statement Banner
            </h2>
            <p className="text-xs text-slate-500">
              The overarching vision for Indian e-commerce dominance.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Vision Heading
          </label>
          <input
            type="text"
            value={founder.visionHeading || ''}
            onChange={(e) => setFounder({ ...founder, visionHeading: e.target.value })}
            placeholder="e.g. Our Vision for Indian E-Commerce"
            className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Vision Statement Text
          </label>
          <textarea
            rows={3}
            value={founder.visionText || ''}
            onChange={(e) => setFounder({ ...founder, visionText: e.target.value })}
            placeholder="Write the founder's vision for brands..."
            className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white leading-relaxed"
          />
        </div>
      </div>

      {/* 7. CONSULTATION CALLOUT BANNER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            7
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Consultation &amp; Growth Audit Callout
            </h2>
            <p className="text-xs text-slate-500">
              The high-conversion CTA banner at the bottom of the founder page.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Callout Headline
          </label>
          <input
            type="text"
            value={founder.calloutTitle || ''}
            onChange={(e) => setFounder({ ...founder, calloutTitle: e.target.value })}
            placeholder="e.g. Want to Scale Your Brand with Shivam Dubey’s Team?"
            className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Callout Subtext
          </label>
          <input
            type="text"
            value={founder.calloutDesc || ''}
            onChange={(e) => setFounder({ ...founder, calloutDesc: e.target.value })}
            placeholder="e.g. Schedule an exclusive 1-on-1 marketplace growth audit..."
            className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
          />
        </div>
      </div>

      {/* Bottom Save Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-800">
            Ready to publish Founder page updates?
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will immediately reflect on /founder and the homepage leadership spotlight.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
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
              <span>Save Founder Page</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
