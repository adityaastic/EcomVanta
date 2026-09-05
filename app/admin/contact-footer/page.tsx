'use client';

import React, { useState, useEffect } from 'react';
import { ContactFooterContent } from '@/lib/cmsTypes';
import {
  MapPin,
  Save,
  Check,
  Loader2,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react';

export default function ContactFooterAdminPage() {
  const [contactFooter, setContactFooter] = useState<ContactFooterContent | null>(null);
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
          setContactFooter(data.data.contactFooter);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load contact & footer data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFooter) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'contactFooter',
          data: contactFooter,
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
        setError(data.error || 'Failed to save contact & footer data');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !contactFooter) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            Contact Details, Maps & Footer CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update physical office address, support phone numbers, map embeds, and global footer text.
          </p>
        </div>

        <button
          type="submit"
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
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          1. Physical Office Address & Map
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Head Office Full Address
            </label>
            <textarea
              rows={2}
              value={contactFooter.officeAddress}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, officeAddress: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Google Maps Embed URL
            </label>
            <input
              type="text"
              value={contactFooter.mapEmbedUrl}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, mapEmbedUrl: e.target.value })
              }
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Contact Phone & Support Email */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          2. Contact Numbers & Emails
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Support Phone
            </label>
            <input
              type="text"
              value={contactFooter.contactPhone}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, contactPhone: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Direct Sales Phone
            </label>
            <input
              type="text"
              value={contactFooter.salesPhone}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, salesPhone: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              value={contactFooter.supportEmail}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, supportEmail: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>
      </div>

      {/* 3. Global Footer Text */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          3. Footer Summary & Copyright
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Footer About Description
            </label>
            <textarea
              rows={3}
              value={contactFooter.footerAboutText}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, footerAboutText: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={contactFooter.copyrightText}
              onChange={(e) =>
                setContactFooter({ ...contactFooter, copyrightText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Save to update contact details and global website footer.
        </p>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Footer'}</span>
        </button>
      </div>
    </form>
  );
}
