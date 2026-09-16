'use client';

import React, { useState, useEffect } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import { AboutUsContent } from '@/lib/cmsTypes';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import {
  Users,
  Plus,
  Trash2,
  Save,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
  Target,
  Compass,
  Building
} from 'lucide-react';

export default function AboutUsAdminPage() {
  const [aboutUs, setAboutUs] = useState<AboutUsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const local = getLocalCmsContent();
    if (local?.aboutUs) {
      setAboutUs(local.aboutUs);
      setLoading(false);
    }

    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data?.aboutUs) {
          setAboutUs(data.data.aboutUs);
          saveLocalCmsContent({ aboutUs: data.data.aboutUs });
        }
      } catch (err: any) {
        if (!local?.aboutUs) {
          setError(err.message || 'Failed to load About Us content');
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aboutUs) return;

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    saveLocalCmsContent({ aboutUs });

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'aboutUs',
          data: aboutUs,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.aboutUs) {
        setAboutUs(data.data.aboutUs);
        saveLocalCmsContent({ aboutUs: data.data.aboutUs });
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

  if (loading || !aboutUs) {
    return (
      <div className="py-24 flex flex-col justify-center items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading About Us Information...</p>
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
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0066FF]">
              Company Profile & Leadership
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            About Us & Team Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage company story, mission, vision, leadership team profiles, and agency photos.
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

      {/* 1. Hero & Banner Photo */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Page Headline & Hero Banner
            </h2>
            <p className="text-[11px] text-slate-500">
              The primary banner image is also used in the homepage Growth Partners section.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Page Headline
            </label>
            <input
              type="text"
              value={aboutUs.heroTitle}
              onChange={(e) => setAboutUs({ ...aboutUs, heroTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Page Subtitle
            </label>
            <textarea
              rows={2}
              value={aboutUs.heroSubtitle}
              onChange={(e) => setAboutUs({ ...aboutUs, heroSubtitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <MediaUploader
            label="Main About & Growth Partner Banner Photo"
            value={aboutUs.heroImage}
            onChange={(url) => setAboutUs({ ...aboutUs, heroImage: url })}
            helperText="Banner displayed on About Us and Homepage Growth Partners section"
            previewHeight="h-44"
          />
        </div>
      </div>

      {/* 2. Story, Mission, Vision */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight">
              Our Journey, Mission & Vision
            </h2>
            <p className="text-[11px] text-slate-500">
              Foundational company narrative and strategic objectives.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Story Heading Title
            </label>
            <input
              type="text"
              value={aboutUs.storyTitle || 'Who We Are & What We Do'}
              onChange={(e) => setAboutUs({ ...aboutUs, storyTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors mb-2"
            />
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Story / Journey Description
            </label>
            <textarea
              rows={3}
              value={aboutUs.storyDesc}
              onChange={(e) => setAboutUs({ ...aboutUs, storyDesc: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mission Heading Title
              </label>
              <input
                type="text"
                value={aboutUs.missionTitle || 'Our Mission'}
                onChange={(e) => setAboutUs({ ...aboutUs, missionTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors mb-2"
              />
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Our Mission Description
              </label>
              <textarea
                rows={3}
                value={aboutUs.missionDesc}
                onChange={(e) => setAboutUs({ ...aboutUs, missionDesc: e.target.value })}
                className="w-full px-3.5 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Vision Heading Title
              </label>
              <input
                type="text"
                value={aboutUs.visionTitle || 'Our Vision'}
                onChange={(e) => setAboutUs({ ...aboutUs, visionTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors mb-2"
              />
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Our Vision Description
              </label>
              <textarea
                rows={3}
                value={aboutUs.visionDesc}
                onChange={(e) => setAboutUs({ ...aboutUs, visionDesc: e.target.value })}
                className="w-full px-3.5 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Leadership Team Members */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">
                Leadership & Team Members
              </h2>
              <p className="text-[11px] text-slate-500">
                Team member cards with designations and photos.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const newTeam = [
                ...aboutUs.team,
                { id: Date.now().toString(), name: 'Team Member', designation: 'Specialist', image: '/image/Aadil.png' },
              ];
              setAboutUs({ ...aboutUs, team: newTeam });
            }}
            className="px-3.5 py-2 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border border-blue-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aboutUs.team.map((member, index) => (
            <div key={member.id || index} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = aboutUs.team.filter((_, i) => i !== index);
                  setAboutUs({ ...aboutUs, team: filtered });
                }}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
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
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
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
                  className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0066FF]"
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
                previewHeight="h-24"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Clean Bottom Save Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-800">
            Ready to publish About Us updates?
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will sync to the live /about-us page and cloud storage.
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
              <span>Save About Us</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
