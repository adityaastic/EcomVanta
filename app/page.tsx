'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import ClientReviewsSlider from '@/components/ClientReviewsSlider';
import FaqAccordion from '@/components/FaqAccordion';
import ContactSection from '@/components/ContactSection';
import { useCmsContent } from '@/lib/useCmsContent';
import { 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Phone, 
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';

const WHY_CHOOSE_ITEMS = [
  {
    icon: '/home-img/Specialization in e-commerce platforms.webp',
    title: 'E-Commerce Specialization',
    desc: 'Dedicated teams specializing in each marketplace algorithm and category dynamics.',
  },
  {
    icon: '/home-img/Custom solution for all business needs.webp',
    title: 'Customized Solutions',
    desc: 'Tailored roadmaps matching your brand stage, margins, and target GMV milestones.',
  },
  {
    icon: '/home-img/Proven track record of increasing sales.webp',
    title: 'Proven Sales Multiplier',
    desc: 'Average 340% GMV increase across our partner accounts in the first 90 days.',
  },
  {
    icon: '/home-img/Affordable and reliable services.webp',
    title: 'Affordable & Scalable',
    desc: 'High ROI services designed for emerging D2C brands and established manufacturers.',
  },
  {
    icon: '/home-img/1000+ successful seller accounts.webp',
    title: '1000+ Accounts Scaled',
    desc: 'Over 8+ years of trusted marketplace growth experience across India.',
  },
  {
    icon: '/home-img/All Platform-certified experts.webp',
    title: 'Certified Account Experts',
    desc: 'Official partner-certified managers for Amazon, Flipkart & Quick Commerce.',
  },
  {
    icon: '/home-img/Transparent reporting and tracking.webp',
    title: 'Transparent Weekly Reports',
    desc: 'Real-time performance tracking and weekly strategy updates with zero hidden data.',
  },
  {
    icon: '/home-img/Fast and responsible support.webp',
    title: 'Rapid Issue Escalation',
    desc: 'Dedicated key account manager with fast turnaround on seller central tickets.',
  },
];

const CATEGORIES = [
  { icon: '/E-Commerce-icon-home-page/Home & Kitchen Products.png', title: 'Home & Kitchen' },
  { icon: '/E-Commerce-icon-home-page/Beauty & Personal Care.png', title: 'Beauty & Personal Care' },
  { icon: '/E-Commerce-icon-home-page/Fashion & Accessories.png', title: 'Fashion & Apparel' },
  { icon: '/E-Commerce-icon-home-page/Mobile & Tech Accessories.png', title: 'Electronics & Tech' },
  { icon: '/E-Commerce-icon-home-page/Fitness & Lifestyle Items.png', title: 'Fitness & Supplements' },
  { icon: '/E-Commerce-icon-home-page/Baby Products.png', title: 'Baby Care & Toys' },
  { icon: '/E-Commerce-icon-home-page/Toys, Gifts & Daily Essentials.png', title: 'Gifts & Essentials' },
  { icon: '/E-Commerce-icon-home-page/Pet Care Items.png', title: 'Pet Care & Supplies' },
];

const INDIAN_HUBS = [
  'Delhi NCR', 'Mumbai', 'Bengaluru', 'Jaipur', 'Surat', 'Ahmedabad', 'Kolkata', 'Hyderabad', 'Chennai', 'Pune', 'Ludhiana', 'Indore'
];

export default function HomePage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();
  const hp = content.homepage;
  const branding = content.branding;

  const hero = hp.hero;
  const platforms = hp.platforms?.length ? hp.platforms : [];
  const listingServices = hp.listingServices?.length ? hp.listingServices : [];
  const clientVideos = hp.clientVideos?.length ? hp.clientVideos : [];

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen">
        
        {/* SECTION 1: Exact Home Hero (Arvian Style with Bottom 4-Column Stats Bar) */}
        <section id="home" className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-20 bg-gradient-to-b from-blue-50/70 via-white to-white flex flex-col justify-center hero-grid-pattern">
          
          {/* Layered Ambient Washes */}
          <div className="absolute top-10 right-10 w-[650px] h-[650px] bg-[#0066FF]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-[#00C2FF]/12 rounded-full blur-[140px] pointer-events-none" />

          {/* Floating Platform Badges */}
          <div className="hidden xl:block absolute top-36 left-[46%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-slow pointer-events-none border border-blue-100 z-10">
            <Image src="/images/images/amazon-logo.webp" alt="Amazon" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <div className="hidden xl:block absolute bottom-44 left-[42%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-reverse pointer-events-none border border-blue-100 z-10">
            <Image src="/flipkart-logo.webp" alt="Flipkart" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <div className="hidden xl:block absolute bottom-32 left-[6%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-slow pointer-events-none border border-blue-100 z-10">
            <Image src="/myntra-logo.webp" alt="Myntra" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <div className="hidden xl:block absolute top-48 right-[5%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-reverse pointer-events-none border border-blue-100 z-10">
            <Image src="/Meesho_logo.png" alt="Meesho" width={40} height={40} className="w-full h-full object-contain" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-10 items-center w-full z-10 mb-14 lg:mb-20">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-blue-200/80 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]" />
                </span>
                <span className="text-[11px] sm:text-xs font-black tracking-[0.18em] text-[#0066FF] uppercase">
                  {hero.badgeText || "INDIA'S #1 E-COMMERCE GROWTH AGENCY"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                {hero.titlePart1 || 'Scale Your'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#00C2FF]">
                  {hero.titleHighlight || 'E-Commerce'}
                </span>
                <br />
                {hero.titlePart2 || 'Brand Revenue & Marketplaces'}
              </h1>

              <p className="text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
                {hero.subtitle || 'EcomVanta delivers complete multi-channel marketplace account management for Amazon, Flipkart, Blinkit, Meesho, Zepto & Shopify including catalog SEO, ads & growth strategy.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="ecomvantaPulseBtn group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:from-[#0052cc] hover:to-[#003d99] transition-all cursor-pointer"
                >
                  <span>{hero.primaryCtaText || 'Book Free Growth Audit'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <a
                  href={`tel:${branding.topbarPhone || '+918787249407'}`}
                  className="inline-flex items-center gap-3 text-slate-800 font-bold text-sm sm:text-base hover:text-[#0066FF] transition-colors py-2"
                >
                  <span className="w-12 h-12 rounded-full border-2 border-blue-200 flex items-center justify-center text-[#0066FF] bg-blue-50 shadow-xs">
                    <Phone className="w-5 h-5" />
                  </span>
                  <span className="border-b-2 border-dashed border-blue-300">Talk to an Expert</span>
                </a>
              </div>

              {/* Trust Strip */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <div className="flex text-amber-500 text-base font-black">★★★★★</div>
                  <span className="ml-2 text-sm font-bold text-slate-900">{hero.trustRating || '4.9 / 5.0'}</span>
                </div>
                <div className="h-6 w-px bg-slate-300 hidden sm:block" />
                <p className="text-xs text-slate-600 font-bold">{hero.trustRatingCount || 'Trusted by 1000+ brands across India'}</p>
                <div className="h-6 w-px bg-slate-300 hidden sm:block" />
                <Image
                  src="/home-img/Flipkart Service Provider Network.png"
                  alt="Marketplace Service Partner"
                  width={140}
                  height={32}
                  className="h-8 w-auto object-contain opacity-95"
                />
              </div>

            </div>

            {/* Right Hero Visual with Larger Frame and Higher Positioned Stat Badges */}
            <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end pt-8 lg:pt-0">
              <div className="relative w-full max-w-[580px] lg:max-w-[640px]">
                
                {/* Main Hero Card Container */}
                <div className="relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-gradient-to-br from-white via-blue-50/70 to-indigo-50/50 p-4 sm:p-6 shadow-2xl border-4 border-white backdrop-blur-md">
                  <img
                    src={hero.heroImage || 'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1789563560397_ChatGPT_Image_Sep_16__2026__06_29_10_PM.webp'}
                    alt={hero.titlePart1 || 'E-Commerce Seller Account Management'}
                    className="w-full h-auto object-contain relative z-10 max-h-[540px] lg:max-h-[620px] scale-105 transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Floating Stat Card 1: Top Left - Positioned Higher Up (Upper) */}
                <div className="absolute -top-7 -left-3 sm:-top-9 sm:-left-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-blue-100 flex items-center gap-3.5 z-30 animate-float-slow">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black text-lg shadow-xs border border-blue-100/80">
                    📈
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">{hero.heroBadgeNumber || '₹50Cr+'}</p>
                    <p className="text-[11px] text-slate-500 font-bold mt-1">{hero.heroBadgeText || 'GMV Generated for Clients'}</p>
                  </div>
                </div>

                {/* Floating Stat Card 2: Bottom Right */}
                <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 p-4 rounded-2xl bg-[#081325] text-white shadow-2xl flex items-center gap-3.5 z-30 border border-blue-900/60">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-white p-0.5 shadow-sm"><Image src="/images/images/amazon-logo.webp" alt="Amazon" width={28} height={28} className="w-full h-full object-contain" /></div>
                    <div className="w-7 h-7 rounded-full bg-white p-0.5 shadow-sm"><Image src="/flipkart-logo.webp" alt="Flipkart" width={28} height={28} className="w-full h-full object-contain" /></div>
                    <div className="w-7 h-7 rounded-full bg-white p-0.5 shadow-sm"><Image src="/myntra-logo.webp" alt="Myntra" width={28} height={28} className="w-full h-full object-contain" /></div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-black text-blue-100 leading-tight">10+ Marketplaces</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Amazon, Flipkart & Quick Comm</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* HERO BOTTOM 4-COLUMN STATS BAR (Exact Arvian Feature) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-[0_15px_40px_rgba(0,102,255,0.08)]">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-3 sm:border-r border-slate-100 last:border-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">1000+</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Sellers Onboarded</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">Across all Indian marketplaces</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-3 lg:border-r border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">10+</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Marketplaces</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">Amazon, Flipkart, Quick Comm</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-3 sm:border-r border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0066FF]">₹50Cr+</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">GMV Managed</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">Proven high ROI growth models</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">98%</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Client Retention</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">Long-term brand partnership</p>
                </div>
              </div>

            </div>
          </div>

        </section>


        {/* SECTION 1.5: Featured Home Video (admin-uploaded) */}
        {hp.heroVideo && (
          <section className="py-16 bg-gradient-to-b from-blue-50/40 to-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— FEATURED VIDEO</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">See EcomVanta in Action</h2>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative bg-black">
                <video
                  src={hp.heroVideo}
                  controls
                  playsInline
                  className="w-full max-h-[600px] object-contain"
                />
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: Client Video Testimonial Grid (Real Seller Experiences) */}
        {clientVideos.length > 0 && (
          <section className="py-16 bg-slate-50/80 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                  — REAL SELLER EXPERIENCES
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Watch How Indian Sellers Scale With Us
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                  Hear directly from brand founders and retail sellers on how EcomVanta scaled their marketplace sales.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {clientVideos.map((vid: any) => (
                  <div
                    key={vid.name || vid.id}
                    className="rounded-3xl overflow-hidden bg-black aspect-[9/16] shadow-xl border border-slate-200 group relative arvian-card flex flex-col justify-end"
                  >
                    <video
                      src={vid.videoUrl || vid.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-[11px] font-bold mb-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Verified Seller</span>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold leading-tight">{vid.name}</p>
                      {vid.role && (
                        <p className="text-[11px] text-slate-300 line-clamp-1">{vid.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: Intro Narrative Callout Box (Exact Arvian 4-Paragraph Layout) */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 border border-blue-200/70 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100/80 text-[#0066FF] font-black text-2xl mb-6 mx-auto">
                “
              </div>

              <div className="space-y-4 max-w-3xl mx-auto text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                <p>
                  Are you ready to turn browsers into loyal buyers? Maximize your sales velocity, reach your target consumers, and scale your business with India’s leading e-commerce growth team.
                </p>
                <p className="text-slate-600 text-sm sm:text-base">
                  Navigating multi-channel platforms like Amazon, Flipkart, Meesho, Myntra, Blinkit, and Shopify can be overwhelming. Each marketplace features unique search ranking algorithms, strict listing policies, changing ad structures, and inventory fulfillment standards.
                </p>
                <p className="text-slate-600 text-sm sm:text-base">
                  At EcomVanta, we manage your store end-to-end: catalog optimization, search discoverability, high-converting A+ content, precision PPC advertising, Buy Box protection, and stock restock alerts.
                </p>
                <p className="font-bold text-[#0066FF] pt-2">
                  Our data-driven strategies ensure sustainable profitability, lower ACOS, and consistent top-of-search ranking across every channel.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:from-[#0052cc] hover:to-[#003d99] transition-all cursor-pointer"
                >
                  <span>Schedule Your Strategy Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: About Us & Growth Partner with Audit CTA Banner */}
        <section id="about" className="py-20 bg-slate-50/60 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              
              <div className="lg:col-span-6 relative">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white relative group">
                  <img
                    src={content.aboutUs?.heroImage || '/ecommerce-growth-partners.webp'}
                    alt="E-Commerce Growth Partners"
                    className="w-full h-auto object-cover max-h-[480px] group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-8">
                    <div className="text-white">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#00C2FF]">Proven Multi-Channel Scale</p>
                      <h4 className="text-xl font-black mt-1">Driving 3X to 10X Revenue Multipliers</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— ABOUT ECOMVANTA</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Your Dedicated <span className="text-[#0066FF]">E-Commerce Growth</span> Partners
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {content.aboutUs?.storyDesc || 'EcomVanta is a premier e-commerce management agency helping manufacturers, D2C brands, and retail sellers scale their revenue on major Indian marketplaces with zero guesswork.'}
                </p>

                {/* 4 Feature Cards in 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs arvian-card flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 p-2">
                      <Image src="/home-img/ecommerce.webp" alt="Ecommerce" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">End-to-End Account Mgmt</h4>
                      <p className="text-[11px] text-slate-500">From onboarding to daily orders</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs arvian-card flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 p-2">
                      <Image src="/home-img/content-marketing.webp" alt="Content" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">A+ Catalog SEO & Visuals</h4>
                      <p className="text-[11px] text-slate-500">Keyword rich copies & 3D graphics</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs arvian-card flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 p-2">
                      <Image src="/home-img/data-driven.webp" alt="Data" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">High-ROI Sponsored Ads</h4>
                      <p className="text-[11px] text-slate-500">Targeted PPC & lowest ACOS</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs arvian-card flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 p-2">
                      <ShieldCheck className="w-7 h-7 text-[#0066FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">100% Policy Protection</h4>
                      <p className="text-[11px] text-slate-500">Account health & claim support</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* AUDIT CTA BANNER */}
            <div className="rounded-3xl bg-gradient-to-r from-[#081325] via-[#004ecc] to-[#0066FF] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#00C2FF]/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-2 text-center md:text-left z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/15">
                  <Sparkles className="w-3.5 h-3.5" /> Free 25-Point Marketplace Audit
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                  Wondering Why Your Marketplace Sales Are Stuck?
                </h3>
                <p className="text-blue-100 text-sm sm:text-base max-w-xl">
                  Let our senior marketplace directors audit your listings, keyword gaps, ad spend leaks, and Buy Box win rate for free.
                </p>
              </div>

              <div className="flex-shrink-0 z-10">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="px-8 py-4 rounded-full bg-white text-[#0066FF] font-black text-sm sm:text-base hover:bg-blue-50 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Book Your Free Audit Now
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: Trusted Partners Brand Marquee */}
        <BrandLogoSlider />

        {/* SECTION 6: Platform Services */}
        {platforms.length > 0 && (
          <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— OUR SERVICES</span>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2">
                  Comprehensive <span className="text-[#0066FF]">E-Commerce Solutions</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-3">
                  Maximize reach and revenue with specialized account management across every major marketplace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {platforms.map((platform: any) => (
                  <div
                    key={platform.name || platform.id}
                    className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm arvian-card flex flex-col justify-between hover:border-blue-300"
                  >
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-blue-50/70 flex items-center justify-center p-3 mb-6 border border-blue-100">
                        <img src={platform.logo} alt={platform.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{platform.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{platform.desc}</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <Link
                        href={platform.link}
                        className="inline-flex items-center gap-2 text-[#0066FF] text-sm font-extrabold hover:text-[#0052cc] group/link"
                      >
                        <span>Explore Service</span>
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7: Product Listing Features (Skyrocket Section) */}
        {listingServices.length > 0 && (
          <section className="py-20 bg-slate-50/70 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— PRODUCT LISTING</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Skyrocket Sales with Professional <span className="text-[#0066FF]">Product Listings</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-3">
                  A high-ranking listing is the difference between 5 orders and 500 orders a day. We optimize every title, image, bullet, and backend keyword for peak conversion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listingServices.map((item: any) => (
                  <div
                    key={item.title || item.id}
                    className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm arvian-card flex items-start gap-4 hover:border-blue-200"
                  >
                    <div className="w-14 h-14 flex-shrink-0 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center p-2.5">
                      <img src={item.icon} alt={item.title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8: Why Choose EcomVanta (8 Features) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— WHY CHOOSE US</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2">
                Why Choose <span className="text-[#0066FF]">EcomVanta?</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                Over 1,000 sellers trust our dedicated team to manage their catalog, scale ads, and protect account health.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm arvian-card text-center flex flex-col items-center justify-between hover:border-blue-200"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center p-3 mb-4">
                    <Image src={item.icon} alt={item.title} width={48} height={48} className="max-w-full max-h-full object-contain" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Location Advantage & Diverse Categories (Exact Arvian 2-Column Showcase) */}
        <section id="case" className="py-20 bg-slate-50/70 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— NATIONWIDE REACH & SECTORS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2">
                Scaling Businesses Across <span className="text-[#0066FF]">India & Diverse Sectors</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                From manufacturing hubs to D2C startup centers, we empower brands across India to reach nationwide marketplace consumers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Strategic Location Advantage */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold border border-blue-100">
                  <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Strategic Pan-India Support</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Connect Your Products to India’s Largest Consumer Bases
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether you are based in the textile clusters of Surat, the electronics markets of Delhi NCR, or the manufacturing zones of Bengaluru, EcomVanta optimizes your regional fulfillment, FBA dispatch, and regional tax compliance.
                </p>

                <div className="pt-2">
                  <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Key Indian Business Hubs Supported:</p>
                  <div className="flex flex-wrap gap-2">
                    {INDIAN_HUBS.map((hub) => (
                      <span
                        key={hub}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
                      >
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#0066FF] flex-shrink-0" />
                  <p className="text-xs text-slate-700 font-semibold">
                    Multi-warehouse distribution and regional prime badge optimization for faster deliveries.
                  </p>
                </div>
              </div>

              {/* Right Column: 8 High-Growth Categories */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.title}
                      className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs arvian-card text-center flex flex-col items-center group hover:border-blue-300"
                    >
                      <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center p-2.5 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Image src={cat.icon} alt={cat.title} width={40} height={40} className="max-w-full max-h-full object-contain" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">{cat.title}</h4>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 10: Seller Spotlight & Video Review Feature Banner */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2.5rem] bg-gradient-to-r from-[#081325] via-[#091E3A] to-[#0052CC] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-blue-900/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2FF]/15 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-[#00C2FF] text-xs font-black tracking-wider uppercase border border-cyan-400/30">
                    <Sparkles className="w-3.5 h-3.5" /> SELLER SPOTLIGHT
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
                    Hear How Our Partners Achieve <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-blue-200">Exponential Growth</span>
                  </h2>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                    Discover how e-commerce brands in fashion, electronics, home essentials, and FMCG transformed underperforming marketplace listings into high-revenue category leaders.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-200">+340% Average Revenue Surge in First 90 Days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-200">60% Reduction in Wasted Ad Spend & Lower ACOS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-200">100% Policy-Safe Listing & Account Health Protection</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setPopupOpen(true)}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-white font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all cursor-pointer"
                    >
                      Book a Free Consultation
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-3xl overflow-hidden bg-black/60 border-2 border-white/20 shadow-2xl backdrop-blur-md p-2">
                    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black max-h-[440px] mx-auto">
                      <video
                        src="/image/Amardeep.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 backdrop-blur-md text-white pointer-events-none">
                        <div className="flex text-amber-400 text-xs font-black mb-1">★★★★★</div>
                        <p className="text-xs font-bold leading-snug">“EcomVanta scaled our Amazon monthly sales from ₹2L to over ₹18L in just 90 days.”</p>
                        <p className="text-[10px] text-cyan-300 font-extrabold mt-1">— Amardeep, Home & Kitchen Brand</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <ClientReviewsSlider />
        
        <FaqAccordion />

        <ContactSection sourcePage="Main Home Page" />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Main Home Page" />
    </>
  );
}
