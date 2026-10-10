'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Store, 
  ShoppingBag, 
  Sparkles, 
  Search, 
  TrendingUp, 
  Layers, 
  Star, 
  Zap, 
  Globe, 
  Code, 
  MessageCircle, 
  PhoneCall, 
  Palette, 
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

interface ServiceTickerItem {
  title: string;
  href: string;
  category: string;
  icon?: any;
  color?: string;
  badgeBg?: string;
}

const ROW_1_SERVICES: ServiceTickerItem[] = [
  // Marketplace Management
  { title: 'Amazon Account Mgmt', href: '/amazon-seller-account-management-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Flipkart Account Mgmt', href: '/flipkart-account-management-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Meesho Account Mgmt', href: '/meesho-account-management-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Shopify Account Mgmt', href: '/shopify-store-management-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Myntra Account Mgmt', href: '/myntra-account-management-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Amazon Product Listing', href: '/amazon-product-listing-catalogue-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Etsy Account Mgmt', href: '/etsy-account-management-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Rating & Review Mgmt', href: '/ecommerce-rating-and-review-management-services', category: 'Marketplace', color: '#F59E0B', badgeBg: 'bg-amber-50 text-amber-600 border-amber-200' },
  { title: 'Ecommerce Cataloging', href: '/ecommerce-product-listing-services', category: 'Marketplace', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  // Quick Commerce & Onboarding
  { title: 'Blinkit Onboarding', href: '/blinkit-seller-account-management-services', category: 'Quick Commerce', color: '#FACC15', badgeBg: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { title: 'Swiggy Instamart', href: '/swiggy-instamart-seller-account-management-and-onboarding', category: 'Quick Commerce', color: '#EA580C', badgeBg: 'bg-orange-50 text-orange-600 border-orange-200' },
  { title: 'Zepto Seller Onboarding', href: '/zepto-seller-onboarding-and-account-management-service', category: 'Quick Commerce', color: '#9333EA', badgeBg: 'bg-purple-50 text-purple-600 border-purple-200' },
  { title: 'Ajio Seller Onboarding', href: '/ajio-seller-onboarding-services', category: 'Quick Commerce', color: '#0284C7', badgeBg: 'bg-sky-50 text-sky-600 border-sky-200' },
  { title: 'Tata Cliq Onboarding', href: '/tata-cliq-seller-onboarding-services', category: 'Quick Commerce', color: '#E11D48', badgeBg: 'bg-rose-50 text-rose-600 border-rose-200' },
  { title: 'Nykaa Seller Onboarding', href: '/nykaa-seller-onboarding-services', category: 'Quick Commerce', color: '#DB2777', badgeBg: 'bg-pink-50 text-pink-600 border-pink-200' },
  { title: 'Myntra Onboarding', href: '/myntra-seller-onboarding-services', category: 'Quick Commerce', color: '#E11D48', badgeBg: 'bg-rose-50 text-rose-600 border-rose-200' },
];

const ROW_2_SERVICES: ServiceTickerItem[] = [
  // Ads & Performance Growth
  { title: 'Search Engine Optimization', href: '/seo-company-in-india', category: 'Growth & Ads', color: '#2563EB', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  { title: 'Meta Ads Management', href: '/meta-ads-management-company-in-india', category: 'Growth & Ads', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Google Ads Management', href: '/google-ads-management-company-in-india', category: 'Growth & Ads', color: '#EA4335', badgeBg: 'bg-red-50 text-red-600 border-red-200' },
  { title: 'Performance Marketing', href: '/performance-marketing-company-in-india', category: 'Growth & Ads', color: '#7C3AED', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' },
  { title: 'Social Media Optimization', href: '/social-media-optimization-company-in-india', category: 'Growth & Ads', color: '#0D9488', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200' },
  { title: 'WhatsApp Integration', href: '/whatsapp-integration-services', category: 'Marketing', color: '#16A34A', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { title: 'SMS, Voice & WhatsApp Marketing', href: '/sms-voice-call-whatsapp-marketing-services', category: 'Marketing', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Graphic & A+ Design', href: '/graphic-design-company-in-india', category: 'Creative', color: '#EC4899', badgeBg: 'bg-pink-50 text-pink-700 border-pink-200' },
  // Brand Web Development
  { title: 'WordPress Development', href: '/ecommerce-service-provider-in-delhi', category: 'Web Dev', color: '#0284C7', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200' },
  { title: 'Shopify Brand Stores', href: '/ecommerce-service-provider-in-delhi', category: 'Web Dev', color: '#16A34A', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { title: 'WooCommerce Development', href: '/ecommerce-service-provider-in-delhi', category: 'Web Dev', color: '#7C3AED', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' },
  { title: 'Wix Ecommerce Setup', href: '/ecommerce-service-provider-in-delhi', category: 'Web Dev', color: '#0F172A', badgeBg: 'bg-slate-100 text-slate-800 border-slate-300' },
  { title: 'Custom Next.js & React', href: '/ecommerce-service-provider-in-delhi', category: 'Web Dev', color: '#0066FF', badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200' },
  { title: 'Website Maintenance', href: '/ecommerce-service-provider-in-delhi', category: 'Web Dev', color: '#059669', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export default function HomeServicesTicker() {
  return (
    <section className="py-10 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-[11px] uppercase font-black text-[#0066FF] tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>
              Comprehensive Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Our Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-md">
            Complete growth ecosystem across 10+ marketplaces, quick commerce, performance ads & web development.
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Marquees - Moving Left to Right */}
      <div className="relative w-full overflow-hidden space-y-4 py-2">
        {/* Left & Right Smooth Edge Fade Out Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* ROW 1: Moving from Left to Right (animate-marquee-reverse) */}
        <div className="flex w-max animate-marquee-reverse gap-4.5 px-2">
          {/* First Array */}
          {ROW_1_SERVICES.map((item, idx) => (
            <Link
              key={`row1-a-${idx}`}
              href={item.href}
              className="group flex items-center gap-3 px-5 py-3 bg-white/95 rounded-2xl border border-slate-200/90 shadow-[0_4px_15px_rgba(0,102,255,0.04)] hover:shadow-lg hover:shadow-blue-500/10 hover:border-[#0066FF]/40 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#0066FF] group-hover:scale-125 transition-transform" />
              <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                {item.title}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                {item.category}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}

          {/* Duplicate Array for Seamless Loop */}
          {ROW_1_SERVICES.map((item, idx) => (
            <Link
              key={`row1-b-${idx}`}
              href={item.href}
              className="group flex items-center gap-3 px-5 py-3 bg-white/95 rounded-2xl border border-slate-200/90 shadow-[0_4px_15px_rgba(0,102,255,0.04)] hover:shadow-lg hover:shadow-blue-500/10 hover:border-[#0066FF]/40 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#0066FF] group-hover:scale-125 transition-transform" />
              <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                {item.title}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                {item.category}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}
        </div>

        {/* ROW 2: Moving from Left to Right (slightly different pace) */}
        <div className="flex w-max animate-marquee-reverse-fast gap-4.5 px-2">
          {/* First Array */}
          {ROW_2_SERVICES.map((item, idx) => (
            <Link
              key={`row2-a-${idx}`}
              href={item.href}
              className="group flex items-center gap-3 px-5 py-3 bg-white/95 rounded-2xl border border-slate-200/90 shadow-[0_4px_15px_rgba(0,102,255,0.04)] hover:shadow-lg hover:shadow-blue-500/10 hover:border-emerald-400/50 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                {item.title}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                {item.category}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}

          {/* Duplicate Array for Seamless Loop */}
          {ROW_2_SERVICES.map((item, idx) => (
            <Link
              key={`row2-b-${idx}`}
              href={item.href}
              className="group flex items-center gap-3 px-5 py-3 bg-white/95 rounded-2xl border border-slate-200/90 shadow-[0_4px_15px_rgba(0,102,255,0.04)] hover:shadow-lg hover:shadow-blue-500/10 hover:border-emerald-400/50 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              <span className="text-[14px] font-extrabold text-slate-800 group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                {item.title}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                {item.category}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
