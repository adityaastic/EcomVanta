'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Image as ImageIcon,
  Palette,
  Home,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [content, setContent] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, leadsRes] = await Promise.all([
          fetch('/api/admin/content'),
          fetch('/api/admin/leads'),
        ]);

        const contentData = await contentRes.json();
        const leadsData = await leadsRes.json();

        if (contentData.success) {
          setContent(contentData.data);
        }
        if (leadsData.success) {
          setLeads(leadsData.leads || []);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalServices = content ? Object.keys(content.services || {}).length : 21;
  const totalCaseStudies = content ? Object.keys(content.caseStudies || {}).length : 4;
  const totalBlogs = content ? (content.blogs || []).length : 6;
  const totalCareers = content ? (content.careers || []).length : 3;
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  const STATS_CARDS = [
    {
      title: 'Total Inquiries & Leads',
      value: totalLeads,
      subtitle: `${newLeadsCount} New Unread`,
      icon: Inbox,
      color: 'from-blue-600 to-indigo-600',
      href: '/admin/leads',
    },
    {
      title: 'Active Services Pages',
      value: totalServices,
      subtitle: 'Marketplace, Ads & SEO',
      icon: Layers,
      color: 'from-emerald-600 to-teal-600',
      href: '/admin/services',
    },
    {
      title: 'Case Studies',
      value: totalCaseStudies,
      subtitle: 'Brand Growth Portfolios',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      href: '/admin/case-studies',
    },
    {
      title: 'Published Blogs',
      value: totalBlogs,
      subtitle: 'Knowledge Base & Guides',
      icon: BookOpen,
      color: 'from-purple-600 to-pink-600',
      href: '/admin/blogs',
    },
  ];

  const QUICK_ACTIONS = [
    { title: 'Edit Hero & Banner Text', desc: 'Modify top headlines, buttons, and graphics', icon: Home, href: '/admin/homepage' },
    { title: 'Update Brand Logos & Contact', desc: 'Change header/footer logos, phone, email & hours', icon: Palette, href: '/admin/branding' },
    { title: 'Upload Photos & Banners', desc: 'Add new media assets directly with copyable links', icon: ImageIcon, href: '/admin/media' },
    { title: 'Manage Marketplace Services', desc: 'Edit Amazon, Flipkart, Meesho, Shopify content', icon: Layers, href: '/admin/services' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-700/60">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Master Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome to EcomVanta Control Panel
          </h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Manage every section, image, banner, text, logo, service, blog, and customer inquiry across your entire website in real-time.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/homepage"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Edit Homepage Sections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/leads"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>View Inquiries ({newLeadsCount} New)</span>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-radial from-red-600/20 to-transparent pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CARDS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{loading ? '...' : stat.value}</p>
                  <p className="text-[11px] font-medium text-gray-400 mt-1">{stat.subtitle}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <span>Quick Actions & Shortcuts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-red-300 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{action.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-red-600">
                  <span>Open Section</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-gray-500">Latest leads captured from website consultation forms</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs">No inquiries recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Contact Name</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Service Required</th>
                  <th className="py-3 px-4">Source Page</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{lead.name || `${lead.first_name || ''} ${lead.last_name || ''}`}</td>
                    <td className="py-3 px-4 text-gray-600">
                      <div>{lead.phone}</div>
                      <div className="text-[11px] text-gray-400">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">{lead.service || 'General Consultation'}</td>
                    <td className="py-3 px-4 text-gray-500">{lead.source_page || 'Website'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          lead.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : lead.status === 'Converted'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {lead.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
