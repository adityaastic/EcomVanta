'use client';

import React, { useState, useEffect } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import { AboutUsContent } from '@/lib/cmsTypes';
import {
  Users,
  Plus,
  Trash2,
  Save,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function AboutUsAdminPage() {
  const [aboutUs, setAboutUs] = useState<AboutUsContent | null>(null);
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
          setAboutUs(data.data.aboutUs);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load About Us content');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutUs) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'aboutUs',
          data: aboutUs,
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
        setError(data.error || 'Failed to save About Us content');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !aboutUs) {
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
            About Us Page CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage company story, mission, vision, team profiles, and office graphics.
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
              <span>Save About Us</span>
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

      {/* 1. Hero & Team Photo */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          1. Hero Banner & Headline
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Page Headline
            </label>
            <input
              type="text"
              value={aboutUs.heroTitle}
              onChange={(e) => setAboutUs({ ...aboutUs, heroTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Page Subtitle
            </label>
            <textarea
              rows={2}
              value={aboutUs.heroSubtitle}
              onChange={(e) => setAboutUs({ ...aboutUs, heroSubtitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <MediaUploader
            label="Team / Culture Banner Photo"
            value={aboutUs.heroImage}
            onChange={(url) => setAboutUs({ ...aboutUs, heroImage: url })}
          />
        </div>
      </div>

      {/* 2. Story, Mission, Vision */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          2. Story, Mission & Vision
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Story Heading Title
            </label>
            <input
              type="text"
              value={aboutUs.storyTitle || 'Our Journey'}
              onChange={(e) => setAboutUs({ ...aboutUs, storyTitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white mb-2 font-bold"
            />
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Our Journey Story
            </label>
            <textarea
              rows={3}
              value={aboutUs.storyDesc}
              onChange={(e) => setAboutUs({ ...aboutUs, storyDesc: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Mission Heading Title
              </label>
              <input
                type="text"
                value={aboutUs.missionTitle || 'Our Mission'}
                onChange={(e) => setAboutUs({ ...aboutUs, missionTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white mb-2 font-bold"
              />
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Our Mission Description
              </label>
              <textarea
                rows={3}
                value={aboutUs.missionDesc}
                onChange={(e) => setAboutUs({ ...aboutUs, missionDesc: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Vision Heading Title
              </label>
              <input
                type="text"
                value={aboutUs.visionTitle || 'Our Vision'}
                onChange={(e) => setAboutUs({ ...aboutUs, visionTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white mb-2 font-bold"
              />
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Our Vision Description
              </label>
              <textarea
                rows={3}
                value={aboutUs.visionDesc}
                onChange={(e) => setAboutUs({ ...aboutUs, visionDesc: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Leadership Team Members */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            3. Leadership & Core Team Members
          </h2>
          <button
            type="button"
            onClick={() => {
              const newTeam = [
                ...aboutUs.team,
                { id: Date.now().toString(), name: 'Team Member', designation: 'Specialist', image: '/image/Aadil.png' },
              ];
              setAboutUs({ ...aboutUs, team: newTeam });
            }}
            className="px-3 py-1.5 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aboutUs.team.map((member, index) => (
            <div key={member.id || index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = aboutUs.team.filter((_, i) => i !== index);
                  setAboutUs({ ...aboutUs, team: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...aboutUs.team];
                    updated[index].name = e.target.value;
                    setAboutUs({ ...aboutUs, team: updated });
                  }}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={member.designation}
                  onChange={(e) => {
                    const updated = [...aboutUs.team];
                    updated[index].designation = e.target.value;
                    setAboutUs({ ...aboutUs, team: updated });
                  }}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <MediaUploader
                label="Profile Photo"
                value={member.image}
                onChange={(url) => {
                  const updated = [...aboutUs.team];
                  updated[index].image = url;
                  setAboutUs({ ...aboutUs, team: updated });
                }}
                previewHeight="h-20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Save your changes to update the /about-us page.
        </p>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save About Us'}</span>
        </button>
      </div>
    </form>
  );
}
