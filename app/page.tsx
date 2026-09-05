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
  ChevronRight
} from 'lucide-react';

const WHY_CHOOSE_ITEMS = [
  {
    icon: '/home-img/Specialization in e-commerce platforms.webp',
    title: 'E-Commerce Specialization',
    desc: 'Dedicated teams specializing in each marketplace algorithm.',
  },
  {
    icon: '/home-img/Custom solution for all business needs.webp',
    title: 'Customized Solutions',
    desc: 'Tailored roadmaps matching your brand stage and target GMV.',
  },
  {
    icon: '/home-img/Proven track record of increasing sales.webp',
    title: 'Proven Sales Multiplier',
    desc: 'Average 340% GMV increase across our partner accounts.',
  },
  {
    icon: '/home-img/Affordable and reliable services.webp',
    title: 'Affordable & Scalable',
    desc: 'High ROI services designed for emerging and established sellers.',
  },
  {
    icon: '/home-img/1000+ successful seller accounts.webp',
    title: '1000+ Accounts Scaled',
    desc: 'Over 8+ years of trusted marketplace growth experience.',
  },
  {
    icon: '/home-img/All Platform-certified experts.webp',
    title: 'Certified Account Experts',
    desc: 'Official partner-certified managers for Amazon, Flipkart & Quick Commerce.',
  },
  {
    icon: '/home-img/Transparent reporting and tracking.webp',
    title: 'Transparent Weekly Reports',
    desc: 'Real-time performance tracking and weekly strategy updates.',
  },
  {
    icon: '/home-img/Fast and responsible support.webp',
    title: 'Rapid Issue Escalation',
    desc: 'Dedicated manager with fast turnaround on seller tickets.',
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
        
        {/* SECTION 1: Exact Home Hero (Arvian Agency Style) */}
        <section className="relative overflow-hidden pt-28 pb-16 md:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-white min-h-[92vh] flex items-center hero-grid-pattern">
          
          {/* Layered Ambient Washes */}
          <div className="absolute top-10 right-10 w-[650px] h-[650px] bg-[#0066FF]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-[#00C2FF]/12 rounded-full blur-[140px] pointer-events-none" />

          {/* Floating Platform Badges with smooth floating animation */}
          <div className="hidden xl:block absolute top-32 left-[48%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-slow pointer-events-none border border-blue-100 z-10">
            <Image src="/images/images/amazon-logo.webp" alt="Amazon" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <div className="hidden xl:block absolute bottom-36 left-[44%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-reverse pointer-events-none border border-blue-100 z-10">
            <Image src="/flipkart-logo.webp" alt="Flipkart" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <div className="hidden xl:block absolute bottom-24 left-[7%] w-14 h-14 rounded-2xl bg-white shadow-xl p-2.5 animate-float-slow pointer-events-none border border-blue-100 z-10">
            <Image src="/myntra-logo.webp" alt="Myntra" width={40} height={40} className="w-full h-full object-contain" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
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
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#00C2FF]">
                  {hero.titleHighlight || 'E-Commerce'}
                  <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 9 Q 75 2, 150 6 T 298 4" stroke="#0066FF" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                {hero.titlePart2 || 'Brand Revenue & Marketplaces'}
              </h1>

              <p className="text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
                {hero.subtitle || 'EcomVanta delivers complete multi-channel marketplace account management for Amazon, Flipkart, Blinkit, Myntra, Zepto & Shopify including catalog SEO, ads & growth strategy.'}
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
                <div className="h-6 w-px bg-slate-300" />
                <p className="text-xs text-slate-600 font-bold">{hero.trustRatingCount || 'Trusted by 1000+ brands across India'}</p>
                <div className="h-6 w-px bg-slate-300" />
                <Image
                  src="/home-img/Flipkart Service Provider Network.png"
                  alt="Marketplace Service Partner"
                  width={140}
                  height={32}
                  className="h-8 w-auto object-contain opacity-95"
                />
              </div>

            </div>

            {/* Right Hero Visual with Floating Stat Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/40 p-3 shadow-2xl border-4 border-white backdrop-blur-xs">
                <img
                  src={hero.heroImage || '/home-img/arvian-home-banner-img.webp'}
                  alt={hero.titlePart1 || 'E-Commerce Seller Account Management'}
                  className="w-full h-auto object-contain relative z-10 max-h-[500px]"
                />

                {/* Floating Stat Card 1: Top Left */}
                <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-blue-100 flex items-center gap-3 z-20 animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black text-base shadow-xs">
                    📈
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-none">{hero.heroBadgeNumber || '+340%'}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">{hero.heroBadgeText || 'Avg Sales Growth'}</p>
                  </div>
                </div>

                {/* Floating Stat Card 2: Bottom Right */}
                <div className="absolute bottom-4 right-4 p-3.5 rounded-2xl bg-[#081325] text-white shadow-xl flex items-center gap-3 z-20 border border-blue-900/50">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white p-0.5"><Image src="/images/images/amazon-logo.webp" alt="Amazon" width={24} height={24} className="w-full h-full object-contain" /></div>
                    <div className="w-6 h-6 rounded-full bg-white p-0.5"><Image src="/flipkart-logo.webp" alt="Flipkart" width={24} height={24} className="w-full h-full object-contain" /></div>
                    <div className="w-6 h-6 rounded-full bg-white p-0.5"><Image src="/myntra-logo.webp" alt="Myntra" width={24} height={24} className="w-full h-full object-contain" /></div>
                  </div>
                  <p className="text-xs font-extrabold text-blue-100">10+ Marketplaces</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: Client Video Testimonial Grid */}
        {clientVideos.length > 0 && (
          <section className="py-14 bg-slate-50/70 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                  Real Seller Experiences
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Client Success Stories in Action
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {clientVideos.map((vid: any) => (
                  <div
                    key={vid.name || vid.id}
                    className="rounded-2xl overflow-hidden bg-black aspect-[9/16] shadow-lg border border-slate-200 group relative arvian-card"
                  >
                    <video
                      src={vid.videoUrl || vid.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-bold pointer-events-none">
                      {vid.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: Intro Callout */}
        <section className="max-w-5xl mx-auto px-6 py-12 my-10 bg-white border border-blue-500/20 shadow-xl shadow-blue-500/5 rounded-3xl text-center">
          <p className="text-base sm:text-xl font-semibold text-slate-800 leading-relaxed max-w-3xl mx-auto">
            &ldquo;Are you ready to turn browsers into loyal buyers? Maximize your sales velocity, reach your target consumers, and scale your business with India&apos;s leading e-commerce growth team.&rdquo;
          </p>
        </section>

        {/* SECTION 4: About Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src={content.aboutUs?.heroImage || '/ecommerce-growth-partners.webp'}
                    alt="E-Commerce Growth Partners"
                    className="w-full h-auto object-cover max-h-[460px]"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— ABOUT US</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Your Dedicated <span className="text-[#0066FF]">E-Commerce Growth</span> Partners
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {content.aboutUs?.storyDesc || 'EcomVanta is a premier e-commerce management agency helping manufacturers, D2C brands, and retail sellers scale their revenue on major Indian marketplaces.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-blue-50/30 border border-blue-100 text-center arvian-card">
                    <Image src="/home-img/ecommerce.webp" alt="Ecommerce" width={40} height={40} className="w-10 h-10 mx-auto mb-2 object-contain" />
                    <h4 className="font-bold text-xs text-slate-900">Marketplace Mastery</h4>
                  </div>
                  <div className="p-5 rounded-2xl bg-blue-50/30 border border-blue-100 text-center arvian-card">
                    <Image src="/home-img/content-marketing.webp" alt="Content" width={40} height={40} className="w-10 h-10 mx-auto mb-2 object-contain" />
                    <h4 className="font-bold text-xs text-slate-900">A+ Catalog SEO</h4>
                  </div>
                  <div className="p-5 rounded-2xl bg-blue-50/30 border border-blue-100 text-center arvian-card">
                    <Image src="/home-img/data-driven.webp" alt="Data" width={40} height={40} className="w-10 h-10 mx-auto mb-2 object-contain" />
                    <h4 className="font-bold text-xs text-slate-900">Data-Driven PPC</h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: Client Brands Marquee */}
        <section className="py-14 bg-slate-50/70 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— TRUSTED PARTNERS</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
              We Power Growth For Leading Brands
            </h2>
          </div>
          <BrandLogoSlider />
        </section>

        {/* SECTION 6: Platform Services */}
        {platforms.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— OUR SERVICES</span>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2">
                  Comprehensive <span className="text-[#0066FF]">E-Commerce Solutions</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-3">
                  Maximize reach and revenue with customized account management across every major marketplace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {platforms.map((platform: any) => (
                  <div
                    key={platform.name || platform.id}
                    className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs arvian-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center p-2.5 mb-6 border border-blue-100">
                        <img src={platform.logo} alt={platform.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{platform.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{platform.desc}</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <Link
                        href={platform.link}
                        className="inline-flex items-center gap-1.5 text-[#0066FF] text-xs font-bold hover:underline group/link"
                      >
                        <span>Explore Service</span>
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7: Product Listing Features */}
        {listingServices.length > 0 && (
          <section className="py-20 bg-slate-50/70 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— PRODUCT LISTING</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Skyrocket Sales with Professional <span className="text-[#0066FF]">Product Listings</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listingServices.map((item: any) => (
                  <div
                    key={item.title || item.id}
                    className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs arvian-card flex items-start gap-4"
                  >
                    <div className="w-12 h-12 flex-shrink-0 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center p-2">
                      <img src={item.icon} alt={item.title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm arvian-card text-center flex flex-col items-center justify-between"
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

        {/* SECTION 9: Managed Categories */}
        <section className="py-20 bg-slate-50/70 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">— CATEGORIES WE MANAGE</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Categories We Successfully Grow
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs arvian-card text-center flex flex-col items-center group"
                >
                  <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center p-2 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={cat.icon} alt={cat.title} width={40} height={40} className="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{cat.title}</h4>
                </div>
              ))}
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
