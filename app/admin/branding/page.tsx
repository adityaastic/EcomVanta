'use client';

import React, { useState, useEffect } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import { SiteBranding } from '@/lib/cmsTypes';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import {
  Save,
  Check,
  Loader2,
  Sparkles,
  AlertCircle,
  Palette,
  Phone,
  Globe,
  Share2,
  Building2,
  FileText,
  Download
} from 'lucide-react';

export default function BrandingSettingsPage() {
  const [branding, setBranding] = useState<SiteBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const local = getLocalCmsContent();
    if (local?.branding) {
      setBranding(local.branding);
      setLoading(false);
    }

    async function loadContent() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data && data.data.branding) {
          setBranding(data.data.branding);
          saveLocalCmsContent({ branding: data.data.branding });
        }
      } catch (err: any) {
        if (!local?.branding) {
          setError(err.message || 'Failed to load branding data');
        }
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!branding) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    saveLocalCmsContent({ branding });

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'branding',
          data: branding,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.branding) {
        setBranding(data.data.branding);
        saveLocalCmsContent({ branding: data.data.branding });
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

  if (loading || !branding) {
    return (
      <div className="py-24 flex flex-col justify-center items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading Branding Configuration...</p>
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
              <Palette className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0066FF]">
              Visual Identity & Global Contact
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Branding, Logos & Header Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure header & footer logos, business contact numbers, working hours, and social media handles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
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

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Logos & Visual Identity */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">
                Brand Logos & Favicon
              </h2>
              <p className="text-[11px] text-slate-500">
                Upload your transparent PNG/WebP logos for both light navigation and dark backgrounds.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Cloud Media Bucket
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaUploader
            label="Header Logo (Main Navigation)"
            value={branding.headerLogo}
            onChange={(url) => setBranding({ ...branding, headerLogo: url })}
            helperText="Recommended: Transparent PNG or WebP, approx 200x80px"
          />

          <MediaUploader
            label="Dark / Footer Logo"
            value={branding.darkLogo}
            onChange={(url) => setBranding({ ...branding, darkLogo: url, footerLogo: url })}
            helperText="Used on dark navigation bars and website footer"
          />

          <MediaUploader
            label="Website Favicon"
            value={branding.favicon}
            onChange={(url) => setBranding({ ...branding, favicon: url })}
            helperText="Square browser tab icon (32x32px or 64x64px ICO/PNG)"
          />
        </div>
      </div>

      {/* 2. Site General Info */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              General Identity & SEO Meta
            </h2>
            <p className="text-[11px] text-slate-500">
              Company name and default search engine metadata.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Brand / Company Name
            </label>
            <input
              type="text"
              value={branding.siteName}
              onChange={(e) => setBranding({ ...branding, siteName: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Brand Tagline
            </label>
            <input
              type="text"
              value={branding.siteTagline}
              onChange={(e) => setBranding({ ...branding, siteTagline: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={branding.metaDescription}
              onChange={(e) => setBranding({ ...branding, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 3. Header Topbar & Contact Numbers */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Header Topbar & Direct Contact Channels
            </h2>
            <p className="text-[11px] text-slate-500">
              These phone numbers and email addresses are surfaced in the top navigation and instant call links.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Toll Free / Display Phone
            </label>
            <input
              type="text"
              value={branding.tollFreePhone}
              onChange={(e) => setBranding({ ...branding, tollFreePhone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Header Direct Call Link (tel: format)
            </label>
            <input
              type="text"
              value={branding.topbarPhone}
              onChange={(e) => setBranding({ ...branding, topbarPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Primary Support Email
            </label>
            <input
              type="email"
              value={branding.email}
              onChange={(e) => setBranding({ ...branding, email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Business Working Hours
            </label>
            <input
              type="text"
              value={branding.workingHours}
              onChange={(e) => setBranding({ ...branding, workingHours: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 4. Company Catalog & Brochure Download */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Download Catalog & Company Brochure</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  PDF / Document
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Upload your company profile or service catalog PDF to enable instant downloads across the website.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Cloud Media Bucket
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <MediaUploader
              label="Catalog File (PDF / Presentation / Document)"
              value={branding.catalogPdfUrl || ''}
              onChange={(url) => setBranding({ ...branding, catalogPdfUrl: url })}
              helperText="Upload your company PDF brochure or catalog (up to 50MB). Stored securely in Supabase."
              accept="application/pdf,.pdf,.doc,.docx,.ppt,.pptx"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Button Label
            </label>
            <input
              type="text"
              placeholder="Download Catalog"
              value={branding.catalogButtonText || ''}
              onChange={(e) => setBranding({ ...branding, catalogButtonText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
            <p className="text-[10px] text-slate-400 mt-1">Defaults to &quot;Download Catalog&quot; if left empty.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Display Locations
            </label>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={branding.showCatalogInHeader !== false}
                  onChange={(e) => setBranding({ ...branding, showCatalogInHeader: e.target.checked })}
                  className="rounded text-[#0066FF] focus:ring-blue-500 w-4 h-4"
                />
                <span>Header Navbar</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={branding.showCatalogInHero !== false}
                  onChange={(e) => setBranding({ ...branding, showCatalogInHero: e.target.checked })}
                  className="rounded text-[#0066FF] focus:ring-blue-500 w-4 h-4"
                />
                <span>Homepage Hero</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={branding.showCatalogInFooter !== false}
                  onChange={(e) => setBranding({ ...branding, showCatalogInFooter: e.target.checked })}
                  className="rounded text-[#0066FF] focus:ring-blue-500 w-4 h-4"
                />
                <span>Website Footer</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={branding.showCatalogInFloating !== false}
                  onChange={(e) => setBranding({ ...branding, showCatalogInFloating: e.target.checked })}
                  className="rounded text-[#0066FF] focus:ring-blue-500 w-4 h-4"
                />
                <span>Floating Actions</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Social Media Links */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            5
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Official Social Profiles
            </h2>
            <p className="text-[11px] text-slate-500">
              External social profiles linked in header topbar and footer icons.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="text"
              placeholder="https://instagram.com/ecomvanta"
              value={branding.socialLinks?.instagram || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, instagram: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              LinkedIn Company URL
            </label>
            <input
              type="text"
              placeholder="https://linkedin.com/company/ecomvanta"
              value={branding.socialLinks?.linkedin || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Facebook Page URL
            </label>
            <input
              type="text"
              placeholder="https://facebook.com/ecomvanta"
              value={branding.socialLinks?.facebook || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, facebook: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              YouTube Channel URL
            </label>
            <input
              type="text"
              placeholder="https://youtube.com/@ecomvanta"
              value={branding.socialLinks?.youtube || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, youtube: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Clean Bottom Save Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-800">
            Ready to publish branding updates?
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will sync across header, footer, and live website immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
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
              <span>Save Branding Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
