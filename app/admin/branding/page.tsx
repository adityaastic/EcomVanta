'use client';

import React, { useState, useEffect } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import { SiteBranding } from '@/lib/cmsTypes';
import { Save, Check, Loader2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export default function BrandingSettingsPage() {
  const [branding, setBranding] = useState<SiteBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.data) {
          setBranding(data.data.branding);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load branding data');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branding) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'branding',
          data: branding,
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
      } else {
        setError(data.error || 'Failed to save branding');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !branding) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Branding, Logos & Header Information
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update your corporate identity, header and footer logos, contact details, and social links.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
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
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0066FF]" />
          <span>1. Website Logos & Visuals</span>
        </h2>

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
            helperText="Logo used in dark backgrounds or footer"
          />

          <MediaUploader
            label="Website Favicon"
            value={branding.favicon}
            onChange={(url) => setBranding({ ...branding, favicon: url })}
            helperText="Square icon (32x32px or 64x64px ICO/PNG)"
          />
        </div>
      </div>

      {/* 2. Site General Info */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          2. General Site Identity & SEO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Brand / Company Name
            </label>
            <input
              type="text"
              value={branding.siteName}
              onChange={(e) => setBranding({ ...branding, siteName: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Brand Tagline
            </label>
            <input
              type="text"
              value={branding.siteTagline}
              onChange={(e) => setBranding({ ...branding, siteTagline: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={branding.metaDescription}
              onChange={(e) => setBranding({ ...branding, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* 3. Header Topbar & Contact Numbers */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          3. Header Topbar & Contact Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Toll Free Number (Displayed in Header)
            </label>
            <input
              type="text"
              value={branding.tollFreePhone}
              onChange={(e) => setBranding({ ...branding, tollFreePhone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Header Direct Call Link (tel: format)
            </label>
            <input
              type="text"
              value={branding.topbarPhone}
              onChange={(e) => setBranding({ ...branding, topbarPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Primary Support Email
            </label>
            <input
              type="email"
              value={branding.email}
              onChange={(e) => setBranding({ ...branding, email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Business Working Hours
            </label>
            <input
              type="text"
              value={branding.workingHours}
              onChange={(e) => setBranding({ ...branding, workingHours: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* 4. Social Media Links */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          4. Social Media Profiles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="text"
              value={branding.socialLinks?.instagram || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, instagram: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              LinkedIn Company URL
            </label>
            <input
              type="text"
              value={branding.socialLinks?.linkedin || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Facebook Page URL
            </label>
            <input
              type="text"
              value={branding.socialLinks?.facebook || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, facebook: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              YouTube Channel URL
            </label>
            <input
              type="text"
              value={branding.socialLinks?.youtube || ''}
              onChange={(e) =>
                setBranding({
                  ...branding,
                  socialLinks: { ...branding.socialLinks, youtube: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Button Bar at Bottom */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Make sure to click Save to apply all branding changes to the live site.
        </p>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving...' : 'Save Branding'}</span>
        </button>
      </div>
    </form>
  );
}
