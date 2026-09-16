'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Palette,
  Home,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Users,
  MapPin,
  Inbox,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Database,
  Globe,
  Bell,
  Search,
  CheckCircle2
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'OVERVIEW & CORE',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Branding & Header', href: '/admin/branding', icon: Palette },
      { name: 'Homepage Sections', href: '/admin/homepage', icon: Home },
    ],
  },
  {
    title: 'CONTENT & SERVICES',
    items: [
      { name: 'Services CMS', href: '/admin/services', icon: Layers },
      { name: 'Case Studies', href: '/admin/case-studies', icon: Award },
      { name: 'Blogs & Articles', href: '/admin/blogs', icon: BookOpen },
      { name: 'Careers & Jobs', href: '/admin/careers', icon: Briefcase },
      { name: 'About Us Page', href: '/admin/about-us', icon: Users },
      { name: 'Contact & Footer', href: '/admin/contact-footer', icon: MapPin },
    ],
  },
  {
    title: 'LEADS & ASSETS',
    items: [
      { name: 'Leads & Inquiries', href: '/admin/leads', icon: Inbox, badge: 'Live' },
      { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }
    const token = localStorage.getItem('arvian_admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('arvian_admin_token');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-wide text-slate-300">Loading Enterprise CMS Control...</p>
        </div>
      </div>
    );
  }

  // Generate breadcrumb text
  const currentNav = NAV_GROUPS.flatMap((g) => g.items).find(
    (item) => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
  );

  return (
    <div className="min-h-screen bg-[#0d1527]/[0.03] text-slate-900 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#081120] text-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-slate-800/80 shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-[#060e1c]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] via-[#0052cc] to-[#00C2FF] flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              EV
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm tracking-tight text-white">EcomVanta</h1>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-blue-500/20 text-[#00C2FF] rounded border border-blue-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Enterprise CMS Control</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items by Groups */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <p className="px-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/admin' && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white shadow-lg shadow-blue-600/30'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#00C2FF]'
                        }`}
                      />
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && !isActive && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80 shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Live Site & Logout Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#060e1c] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-blue-950/60 rounded-xl transition-all border border-slate-800 hover:border-blue-700/50 group"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#00C2FF] group-hover:rotate-12 transition-transform" />
              <span>View Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-all border border-transparent hover:border-rose-900/40"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out Control</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/admin" className="hover:text-slate-900 transition-colors">
                Admin Console
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold">
                {currentNav ? currentNav.name : 'Console'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Supabase Cloud Live Pill */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Supabase Cloud Sync</span>
            </div>

            {/* Preview Site Button */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#0066FF] bg-blue-50/80 hover:bg-blue-100/80 rounded-xl transition-all border border-blue-200/70 shadow-xs hover:scale-102"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Preview</span>
            </Link>

            {/* Admin Profile Chip */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0066FF] to-blue-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-extrabold text-slate-900 leading-tight">Aditya</p>
                <p className="text-[10px] text-slate-500 font-semibold">Super Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
