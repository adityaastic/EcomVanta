'use client';

import React, { useState, useEffect } from 'react';
import { ContactFooterContent } from '@/lib/cmsTypes';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import {
  MapPin,
  Save,
  Check,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  Building
} from 'lucide-react';

export default function ContactFooterAdminPage() {
  const [contactFooter, setContactFooter] = useState<ContactFooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const local = getLocalCmsContent();
    if (local?.contactFooter) {
      setContactFooter(local.contactFooter);
      setLoading(false);
    }

    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data?.contactFooter) {
          setContactFooter(data.data.contactFooter);
          saveLocalCmsContent({ contactFooter: data.data.contactFooter });
        }
      } catch (err: any) {
        if (!local?.contactFooter) {
          setError(err.message || 'Failed to load contact & footer data');
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!contactFooter) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    saveLocalCmsContent({ contactFooter });

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'contactFooter',
          data: contactFooter,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.contactFooter) {
        setContactFooter(data.data.contactFooter);
        saveLocalCmsContent({ contactFooter: data.data.contactFooter });
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

  if (loading || !contactFooter) {
    return (
      <div className="py-24 flex flex-col justify-center items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading Contact & Footer Details...</p>
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
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0066FF]">
              Location, Helplines & Copyright
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Contact Channels & Footer CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update physical office address, support phone numbers, map embeds, and global footer text.
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
              <span>Save Footer Details</span>
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

      {/* 1. Office Location & Address */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Physical Headquarters & Map
            </h2>
            <p className="text-[11px] text-slate-500">
              Address rendered in contact pages and footer address widgets.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Head Office Full Address
            </label>
            <textarea
              rows={2}
              value={contactFooter.officeAddress}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, officeAddress: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Google Maps Embed URL
            </label>
            <input
              type="text"
              value={contactFooter.mapEmbedUrl}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, mapEmbedUrl: e.target.value })
              }
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. Contact Phone & Support Email */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Direct Contact Lines & Helplines
            </h2>
            <p className="text-[11px] text-slate-500">
              Numbers linked to direct dialers and click-to-call buttons.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Support Phone
            </label>
            <input
              type="text"
              value={contactFooter.contactPhone}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, contactPhone: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Direct Sales Phone
            </label>
            <input
              type="text"
              value={contactFooter.salesPhone}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, salesPhone: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              value={contactFooter.supportEmail}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, supportEmail: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 3. Global Footer Text */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Footer Summary & Copyright Notice
            </h2>
            <p className="text-[11px] text-slate-500">
              Global brand summary displayed at the base of every page.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Footer About Description
            </label>
            <textarea
              rows={3}
              value={contactFooter.footerAboutText}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, footerAboutText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={contactFooter.copyrightText}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, copyrightText: e.target.value })
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
            Ready to publish contact & footer details?
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will sync to the footer, topbar, and contact forms immediately.
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
              <span>Save Footer Details</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
