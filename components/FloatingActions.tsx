'use client';

import React from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/useCmsContent';
import { Download, FileText } from 'lucide-react';

export default function FloatingActions() {
  const { content } = useCmsContent();
  const branding = content.branding || {};
  const phone = branding.topbarPhone || '+918787249407';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const email = branding.email || 'ecomvanta40@gmail.com';

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3.5 items-center select-none">
      {/* 0. DOWNLOAD CATALOG BUTTON */}
      {branding.showCatalogInFloating !== false && (
        <a
          href={branding.catalogPdfUrl || '/contact-us'}
          target={branding.catalogPdfUrl ? '_blank' : undefined}
          rel={branding.catalogPdfUrl ? 'noreferrer' : undefined}
          download={branding.catalogPdfUrl ? true : undefined}
          aria-label={branding.catalogButtonText || 'Download Catalog'}
          title={branding.catalogButtonText || 'Download Catalog'}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white rounded-2xl shadow-[0_8px_30px_rgba(225,29,72,0.35)] border border-rose-300/40 transition-all duration-300 ease-out hover:-translate-y-1.5 active:scale-95"
        >
          <div className="relative flex flex-col items-center">
            <FileText className="w-5 h-5 text-white" />
            <span className="text-[8px] font-black uppercase tracking-tighter text-rose-100 -mt-0.5">PDF</span>
          </div>
          <span className="absolute inset-0 rounded-2xl bg-rose-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Tooltip on Hover */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {branding.catalogButtonText || 'Download Catalog'}
          </span>
        </a>
      )}

      {/* 1. WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${cleanPhone || '918787249407'}?text=Hi%20${encodeURIComponent(branding.siteName || 'EcomVanta')}%2C%20I%20am%20interested%20in%20your%20services`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="animate-wave-green group relative flex items-center justify-center w-14 h-14 bg-white hover:bg-[#25D366] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-100 transition-all duration-300 ease-out hover:-translate-y-1.5 active:scale-95"
      >
        <Image
          src="/home-img/whatsapp-icon-arvian.webp"
          alt="WhatsApp"
          width={32}
          height={32}
          className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
        />
        <span className="absolute inset-0 rounded-2xl bg-green-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>

      {/* 2. CALL US BUTTON */}
      <a
        href={`tel:${phone}`}
        aria-label={`Call ${branding.siteName || 'EcomVanta'} Support`}
        className="animate-wave-blue group relative flex items-center justify-center w-14 h-14 bg-white hover:bg-blue-600 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-100 transition-all duration-300 ease-out hover:-translate-y-1.5 active:scale-95"
      >
        <Image
          src="/call-icon-arvian.webp"
          alt="Call"
          width={32}
          height={32}
          className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
        />
        <span className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>

      {/* 3. EMAIL BUTTON */}
      <a
        href={`mailto:${email}`}
        aria-label={`Email ${branding.siteName || 'EcomVanta'} Support`}
        className="animate-wave-blue group relative flex items-center justify-center w-14 h-14 bg-white hover:bg-[#0066FF] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-100 transition-all duration-300 ease-out hover:-translate-y-1.5 active:scale-95"
      >
        <Image
          src="/gmail-logo-arvian.webp"
          alt="Email"
          width={32}
          height={32}
          className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
        />
        <span className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>
    </div>
  );
}
