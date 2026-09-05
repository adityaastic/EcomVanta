'use client';

import React, { useState, useEffect } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import { HomepageContent } from '@/lib/cmsTypes';
import {
  Save,
  Check,
  Loader2,
  Plus,
  Trash2,
  AlertCircle,
  Home,
  Award,
  Layers,
  HelpCircle,
  Video,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function HomepageEditorPage() {
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'brands' | 'platforms' | 'listing' | 'advantages' | 'testimonials' | 'faqs' | 'cta'>('hero');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.data) {
          setHomepage(data.data.homepage);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load homepage data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!homepage) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'homepage',
          data: homepage,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to save homepage');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !homepage) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  const TABS = [
    { id: 'hero', label: '1. Hero Banner', icon: Home },
    { id: 'stats', label: '2. Stats Counters', icon: Award },
    { id: 'brands', label: '3. Brand Logos', icon: Sparkles },
    { id: 'platforms', label: '4. Platforms Grid', icon: Layers },
    { id: 'listing', label: '5. Listing Services', icon: Layers },
    { id: 'advantages', label: '6. Why Choose Us', icon: Award },
    { id: 'testimonials', label: '7. Video Reviews', icon: Video },
    { id: 'faqs', label: '8. FAQs', icon: HelpCircle },
    { id: 'cta', label: '9. Bottom CTA', icon: Sparkles },
  ] as const;

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Homepage Content & Section Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit all texts, headings, banners, photos, cards, and FAQs displayed on the main landing page.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Homepage</span>
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

      {/* Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. HERO SECTION */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Hero Banner & Above-The-Fold
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Top Badge Tag
              </label>
              <input
                type="text"
                value={homepage.hero.badgeText}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    hero: { ...homepage.hero, badgeText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Heading Prefix
                </label>
                <input
                  type="text"
                  value={homepage.hero.titlePart1}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, titlePart1: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">
                  Heading Highlight (Red)
                </label>
                <input
                  type="text"
                  value={homepage.hero.titleHighlight}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, titleHighlight: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-red-300 rounded-xl bg-red-50/30 text-red-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Heading Suffix
                </label>
                <input
                  type="text"
                  value={homepage.hero.titlePart2}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, titlePart2: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Hero Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={homepage.hero.subtitle}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    hero: { ...homepage.hero, subtitle: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={homepage.hero.primaryCtaText}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, primaryCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={homepage.hero.primaryCtaLink}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, primaryCtaLink: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={homepage.hero.secondaryCtaText}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, secondaryCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={homepage.hero.secondaryCtaLink}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, secondaryCtaLink: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>
            </div>

            <MediaUploader
              label="Hero Banner Image / Illustration"
              value={homepage.hero.heroImage}
              onChange={(url) =>
                setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, heroImage: url },
                })
              }
              helperText="Main right-side hero visual (PNG/WebP/JPG)"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Floating Badge Metric
                </label>
                <input
                  type="text"
                  value={homepage.hero.heroBadgeNumber}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, heroBadgeNumber: e.target.value },
                    })
                  }
                  placeholder="e.g. ₹50Cr+"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Floating Badge Subtext
                </label>
                <input
                  type="text"
                  value={homepage.hero.heroBadgeText}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      hero: { ...homepage.hero, heroBadgeText: e.target.value },
                    })
                  }
                  placeholder="e.g. GMV Generated for Clients"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. STATS COUNTERS */}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Stats & Growth Counters
            </h2>
            <button
              type="button"
              onClick={() => {
                const newStats = [
                  ...homepage.stats,
                  { id: Date.now().toString(), number: '100+', label: 'New Metric', description: 'Description here' },
                ];
                setHomepage({ ...homepage, stats: newStats });
              }}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Stat Counter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homepage.stats.map((stat, index) => (
              <div key={stat.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const filtered = homepage.stats.filter((_, i) => i !== index);
                    setHomepage({ ...homepage, stats: filtered });
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Number / Stat (e.g. 500+, 4.8X)
                  </label>
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => {
                      const updated = [...homepage.stats];
                      updated[index].number = e.target.value;
                      setHomepage({ ...homepage, stats: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...homepage.stats];
                      updated[index].label = e.target.value;
                      setHomepage({ ...homepage, stats: updated });
                    }}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Subtext / Description
                  </label>
                  <input
                    type="text"
                    value={stat.description}
                    onChange={(e) => {
                      const updated = [...homepage.stats];
                      updated[index].description = e.target.value;
                      setHomepage({ ...homepage, stats: updated });
                    }}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BRAND LOGOS */}
      {activeTab === 'brands' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Client Brand Logos Slider
              </h2>
              <p className="text-xs text-gray-500">Logos displayed in the scrolling client partners marquee</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newBrands = [
                  ...homepage.brandLogos,
                  { id: Date.now().toString(), name: 'New Brand', logo: '/Deshi.png' },
                ];
                setHomepage({ ...homepage, brandLogos: newBrands });
              }}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Brand Logo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {homepage.brandLogos.map((brand, index) => (
              <div key={brand.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const filtered = homepage.brandLogos.filter((_, i) => i !== index);
                    setHomepage({ ...homepage, brandLogos: filtered });
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => {
                      const updated = [...homepage.brandLogos];
                      updated[index].name = e.target.value;
                      setHomepage({ ...homepage, brandLogos: updated });
                    }}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <MediaUploader
                  label="Logo Image"
                  value={brand.logo}
                  onChange={(url) => {
                    const updated = [...homepage.brandLogos];
                    updated[index].logo = url;
                    setHomepage({ ...homepage, brandLogos: updated });
                  }}
                  previewHeight="h-20"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MARKETPLACE PLATFORMS */}
      {activeTab === 'platforms' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Marketplace Platform Cards (Amazon, Flipkart, Meesho, etc.)
              </h2>
              <p className="text-xs text-gray-500">Core cards highlighting marketplace channel capabilities</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newPlatforms = [
                  ...homepage.platforms,
                  {
                    id: Date.now().toString(),
                    name: 'New Channel',
                    logo: '/images/images/amazon-logo.webp',
                    title: 'New Channel Management',
                    desc: 'Channel management details here.',
                    link: '/contact-us',
                  },
                ];
                setHomepage({ ...homepage, platforms: newPlatforms });
              }}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Platform Card
            </button>
          </div>

          <div className="space-y-4">
            {homepage.platforms.map((platform, index) => (
              <div key={platform.id || index} className="p-5 bg-gray-50 rounded-2xl border border-gray-200 relative space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    #{index + 1} Platform: {platform.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const filtered = homepage.platforms.filter((_, i) => i !== index);
                      setHomepage({ ...homepage, platforms: filtered });
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value={platform.name}
                      onChange={(e) => {
                        const updated = [...homepage.platforms];
                        updated[index].name = e.target.value;
                        setHomepage({ ...homepage, platforms: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Link / URL
                    </label>
                    <input
                      type="text"
                      value={platform.link}
                      onChange={(e) => {
                        const updated = [...homepage.platforms];
                        updated[index].link = e.target.value;
                        setHomepage({ ...homepage, platforms: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={platform.title}
                      onChange={(e) => {
                        const updated = [...homepage.platforms];
                        updated[index].title = e.target.value;
                        setHomepage({ ...homepage, platforms: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Description Text
                    </label>
                    <textarea
                      rows={2}
                      value={platform.desc}
                      onChange={(e) => {
                        const updated = [...homepage.platforms];
                        updated[index].desc = e.target.value;
                        setHomepage({ ...homepage, platforms: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <MediaUploader
                      label="Platform Logo / Icon"
                      value={platform.logo}
                      onChange={(url) => {
                        const updated = [...homepage.platforms];
                        updated[index].logo = url;
                        setHomepage({ ...homepage, platforms: updated });
                      }}
                      previewHeight="h-20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. LISTING SERVICES */}
      {activeTab === 'listing' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Product Listing & Cataloging Features
              </h2>
              <p className="text-xs text-gray-500">6-grid listing optimization feature highlights</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newListing = [
                  ...homepage.listingServices,
                  {
                    id: Date.now().toString(),
                    icon: '/home-img/SEO-Optimized Product Titles.png',
                    title: 'New Listing Feature',
                    desc: 'Feature description here.',
                  },
                ];
                setHomepage({ ...homepage, listingServices: newListing });
              }}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Listing Card
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homepage.listingServices.map((service, index) => (
              <div key={service.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const filtered = homepage.listingServices.filter((_, i) => i !== index);
                    setHomepage({ ...homepage, listingServices: filtered });
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Feature Title
                  </label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const updated = [...homepage.listingServices];
                      updated[index].title = e.target.value;
                      setHomepage({ ...homepage, listingServices: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={service.desc}
                    onChange={(e) => {
                      const updated = [...homepage.listingServices];
                      updated[index].desc = e.target.value;
                      setHomepage({ ...homepage, listingServices: updated });
                    }}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <MediaUploader
                  label="Icon / Graphic"
                  value={service.icon}
                  onChange={(url) => {
                    const updated = [...homepage.listingServices];
                    updated[index].icon = url;
                    setHomepage({ ...homepage, listingServices: updated });
                  }}
                  previewHeight="h-16"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. ADVANTAGES */}
      {activeTab === 'advantages' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Why Choose Us / Agency Advantages
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Section Title
              </label>
              <input
                type="text"
                value={homepage.advantages.title}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    advantages: { ...homepage.advantages, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Section Subtitle
              </label>
              <input
                type="text"
                value={homepage.advantages.subtitle}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    advantages: { ...homepage.advantages, subtitle: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Advantage Points</span>
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [
                      ...homepage.advantages.items,
                      { id: Date.now().toString(), title: 'New Advantage', desc: 'Advantage details' },
                    ];
                    setHomepage({
                      ...homepage,
                      advantages: { ...homepage.advantages, items: newItems },
                    });
                  }}
                  className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Advantage
                </button>
              </div>

              <div className="space-y-3">
                {homepage.advantages.items.map((item, index) => (
                  <div key={item.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = homepage.advantages.items.filter((_, i) => i !== index);
                        setHomepage({
                          ...homepage,
                          advantages: { ...homepage.advantages, items: filtered },
                        });
                      }}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...homepage.advantages.items];
                          updated[index].title = e.target.value;
                          setHomepage({
                            ...homepage,
                            advantages: { ...homepage.advantages, items: updated },
                          });
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
                          const updated = [...homepage.advantages.items];
                          updated[index].desc = e.target.value;
                          setHomepage({
                            ...homepage,
                            advantages: { ...homepage.advantages, items: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. CLIENT VIDEO TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Client Video Reviews & Testimonials
              </h2>
              <p className="text-xs text-gray-500">Video stories and written seller reviews</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newVideos = [
                  ...homepage.clientVideos,
                  {
                    id: Date.now().toString(),
                    name: 'Client Name',
                    role: 'Brand Founder',
                    videoUrl: '/image/Amardeep.mp4',
                    quote: 'Outstanding growth results with Arvian team.',
                    rating: 5,
                  },
                ];
                setHomepage({ ...homepage, clientVideos: newVideos });
              }}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Client Video
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homepage.clientVideos.map((video, index) => (
              <div key={video.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const filtered = homepage.clientVideos.filter((_, i) => i !== index);
                    setHomepage({ ...homepage, clientVideos: filtered });
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={video.name}
                      onChange={(e) => {
                        const updated = [...homepage.clientVideos];
                        updated[index].name = e.target.value;
                        setHomepage({ ...homepage, clientVideos: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Role / Brand
                    </label>
                    <input
                      type="text"
                      value={video.role || ''}
                      onChange={(e) => {
                        const updated = [...homepage.clientVideos];
                        updated[index].role = e.target.value;
                        setHomepage({ ...homepage, clientVideos: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Video URL or File Path (e.g. /image/Amardeep.mp4)
                  </label>
                  <input
                    type="text"
                    value={video.videoUrl}
                    onChange={(e) => {
                      const updated = [...homepage.clientVideos];
                      updated[index].videoUrl = e.target.value;
                      setHomepage({ ...homepage, clientVideos: updated });
                    }}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Review Quote
                  </label>
                  <textarea
                    rows={2}
                    value={video.quote || ''}
                    onChange={(e) => {
                      const updated = [...homepage.clientVideos];
                      updated[index].quote = e.target.value;
                      setHomepage({ ...homepage, clientVideos: updated });
                    }}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. FAQs */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs text-gray-500">Accordion questions and answers on the homepage</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newFaqs = [
                  ...homepage.faqs,
                  { id: Date.now().toString(), question: 'New Question?', answer: 'Answer details here.' },
                ];
                setHomepage({ ...homepage, faqs: newFaqs });
              }}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {homepage.faqs.map((faq, index) => (
              <div key={faq.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const filtered = homepage.faqs.filter((_, i) => i !== index);
                    setHomepage({ ...homepage, faqs: filtered });
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
                      const updated = [...homepage.faqs];
                      updated[index].question = e.target.value;
                      setHomepage({ ...homepage, faqs: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Answer
                  </label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...homepage.faqs];
                      updated[index].answer = e.target.value;
                      setHomepage({ ...homepage, faqs: updated });
                    }}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. BOTTOM CTA */}
      {activeTab === 'cta' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Bottom Call-To-Action Banner
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Banner Tagline
              </label>
              <input
                type="text"
                value={homepage.bottomCta.tagline}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    bottomCta: { ...homepage.bottomCta, tagline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Banner Headline Title
              </label>
              <input
                type="text"
                value={homepage.bottomCta.title}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    bottomCta: { ...homepage.bottomCta, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                value={homepage.bottomCta.description}
                onChange={(e) =>
                  setHomepage({
                    ...homepage,
                    bottomCta: { ...homepage.bottomCta, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Button Text
                </label>
                <input
                  type="text"
                  value={homepage.bottomCta.buttonText}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      bottomCta: { ...homepage.bottomCta, buttonText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Button Target URL
                </label>
                <input
                  type="text"
                  value={homepage.bottomCta.buttonLink}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      bottomCta: { ...homepage.bottomCta, buttonLink: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
                />
              </div>
            </div>

            <MediaUploader
              label="Banner Background Image"
              value={homepage.bottomCta.backgroundImage || ''}
              onChange={(url) =>
                setHomepage({
                  ...homepage,
                  bottomCta: { ...homepage.bottomCta, backgroundImage: url },
                })
              }
              helperText="Background banner texture or photo"
            />
          </div>
        </div>
      )}

      {/* Floating Save Button Bar at Bottom */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Make sure to click Save to apply homepage changes.
        </p>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving...' : 'Save Homepage'}</span>
        </button>
      </div>
    </div>
  );
}
