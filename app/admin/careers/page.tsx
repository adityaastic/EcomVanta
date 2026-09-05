'use client';

import React, { useState, useEffect } from 'react';
import { JobOpening } from '@/lib/cmsTypes';
import {
  Briefcase,
  Plus,
  Trash2,
  Save,
  Check,
  Loader2,
  AlertCircle,
  MapPin,
  Clock
} from 'lucide-react';

export default function CareersAdminPage() {
  const [careers, setCareers] = useState<JobOpening[]>([]);
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
          setCareers(data.data.careers || []);
        }
      } catch (err) {
        console.error('Failed to load careers:', err);
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

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'careers',
          data: careers,
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
        setError(data.error || 'Failed to save career openings');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving careers');
    } finally {
      setSaving(false);
    }
  };

  const handleAddJob = () => {
    const newJob: JobOpening = {
      id: Date.now().toString(),
      title: 'New Position Title',
      department: 'Operations',
      location: 'Delhi / Hybrid',
      type: 'Full-time',
      experience: '1-3 Years',
      description: 'Role overview and key responsibilities.',
      requirements: ['Requirement 1', 'Requirement 2'],
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
            Careers & Hiring Opportunities CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Post and manage job vacancies displayed on the /career page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddJob}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Job Role
          </button>

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
                <span>Save Careers</span>
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

      {/* Jobs List */}
      <div className="space-y-4">
        {careers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
            No active job openings. Click &ldquo;Add Job Role&rdquo; to create one.
          </div>
        ) : (
          careers.map((job, index) => (
            <div
              key={job.id || index}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4 relative"
            >
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                  Position #{index + 1}
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
                    <option value="Open">Status: Open (Hiring)</option>
                    <option value="Closed">Status: Closed</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                    placeholder="Full-time, Part-time, Remote"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Role Description
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
                      Key Qualifications & Requirements
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

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
        <p className="text-xs text-slate-300 font-medium">
          Save your changes to update job listings on the /career page.
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Openings'}</span>
        </button>
      </div>
    </div>
  );
}
