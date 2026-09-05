'use client';

import React from 'react';
import Image from 'next/image';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-4 items-center select-none">
      {/* 1. WHATSAPP BUTTON */}
      <a
        href="https://wa.me/918787249407?text=Hi%20EcomVanta%2C%20I%20am%20interested%20in%20your%20services"
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
        href="tel:+918787249407"
        aria-label="Call EcomVanta Support"
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
        href="mailto:ecomvanta40@gmail.com"
        aria-label="Email EcomVanta Support"
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
