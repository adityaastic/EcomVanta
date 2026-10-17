'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Home, BookOpen, Search } from 'lucide-react';

export default function NotFoundPage() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      fetch('/api/seo/404', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch(() => {});
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="min-h-[75vh] pt-28 pb-20 bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#0066FF] font-black text-2xl border border-blue-200">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Page Not Found
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              The page <code className="px-2 py-0.5 bg-slate-100 rounded text-xs font-mono text-slate-800">{pathname}</code> could not be found or may have moved.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link
              href="/blogs"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Blogs</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
