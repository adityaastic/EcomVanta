'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useCmsContent } from '@/lib/useCmsContent';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Quote, 
  Calendar, 
  PhoneCall, 
  Mail, 
  Target, 
  Zap, 
  HeartHandshake
} from 'lucide-react';

export default function FounderPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();

  const founder = content.founder || {
    heroBadge: 'LEADERSHIP & VISION',
    heroTitle: 'Meet Our Founder & CEO',
    heroSubtitle: 'The driving force behind EcomVanta’s journey from a bootstrap agency to managing ₹50Cr+ GMV for India’s fastest-growing marketplace brands.',
    founderName: 'Shivam Dubey',
    founderRole: 'Founder & CEO, EcomVanta',
    founderImage: '',
    founderQuote: 'We Don’t Just Manage Accounts — We Build Enduring E-Commerce Market Leaders.',
    bioHeading: 'The Story Behind EcomVanta',
    bioParagraphs: [
      'Shivam Dubey founded EcomVanta with a straightforward mission: to eliminate the chaos, hidden fees, and empty promises prevalent in the e-commerce agency ecosystem. Having witnessed hundreds of promising sellers struggle with suppressed listings, spiraling ad spend, and bureaucratic marketplace support, Shivam envisioned a truly specialized partner with skin in the game.',
      'Under his leadership, EcomVanta has grown from managing a single seller account to orchestrating multi-channel e-commerce growth for over 500+ brands across Amazon, Flipkart, Meesho, Blinkit, Zepto, Myntra, and custom D2C stores.',
      'Today, Shivam leads a team of 50+ marketplace specialists, ad analysts, and catalog designers in New Delhi, helping manufacturers, heritage businesses, and innovative consumer brands scale profitably across India and overseas.',
    ],
    milestones: [
      { id: '1', number: '₹50Cr+', label: 'GMV Generated', desc: 'For partner brands across Indian marketplaces' },
      { id: '2', number: '500+', label: 'Brands Scaled', desc: 'From startup sellers to multi-crore enterprises' },
      { id: '3', number: '50+', label: 'In-House Specialists', desc: 'Category experts, ad managers & designers' },
      { id: '4', number: '98%', label: 'Client Retention', desc: 'Long-term partnerships built on verified ROI' },
    ],
    principles: [
      { id: '1', title: 'Complete Transparency', description: 'No inflated metrics or vanity reporting. We share real-time analytics, exact ad spend figures, and clear profitability margins.' },
      { id: '2', title: 'Execution Over Excuses', description: 'Marketplace algorithms change daily. We stay ahead with rapid listing experiments, proactive account health checks, and swift problem resolution.' },
      { id: '3', title: 'Your Brand, Our Responsibility', description: 'We treat your capital, inventory, and reputation with the same care and scrutiny as if it were our own business.' },
    ],
    visionHeading: 'Our Vision for Indian E-Commerce',
    visionText: 'To empower every visionary manufacturer and brand in India with world-class marketplace capabilities, ensuring domestic products dominate online market share globally.',
    calloutTitle: 'Want to Scale Your Brand with Shivam Dubey’s Team?',
    calloutDesc: 'Schedule an exclusive 1-on-1 marketplace growth audit and uncover hidden revenue opportunities in your catalog.',
  };

  const founderImg = content.aboutUs?.founderImage || founder.founderImage || '';
  const founderName = founder.founderName || 'Shivam Dubey';
  const founderRole = founder.founderRole || 'Founder & CEO, EcomVanta';

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="flex-grow pt-[88px] md:pt-[130px]">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-100">
          <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs mb-4">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
              <span className="text-xs font-black tracking-widest text-[#0066FF] uppercase">
                {founder.heroBadge || 'LEADERSHIP & VISION'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
              {founder.heroTitle || 'Meet Our Founder & CEO'}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              {founder.heroSubtitle || 'The driving force behind EcomVanta’s journey from a bootstrap agency to managing ₹50Cr+ GMV for India’s fastest-growing marketplace brands.'}
            </p>
          </div>
        </section>

        {/* FOUNDER SPOTLIGHT & STORY */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Founder Image Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-[#0066FF] to-cyan-400 rounded-3xl blur-xl opacity-30 animate-pulse" />
                  
                  <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-4 border-white shadow-2xl min-h-[360px]">
                    {founderImg && (
                      <img
                        src={founderImg}
                        alt={`${founderName} - ${founderRole}`}
                        className="w-full h-auto object-cover aspect-[4/5] hover:scale-103 transition-transform duration-700"
                      />
                    )}

                    {/* Gradient Overlay at Bottom with Name & Role */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066FF] text-white text-xs font-black uppercase tracking-wider mb-2 w-fit shadow-md">
                        <Award className="w-3.5 h-3.5" /> Founder Profile
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black !text-white tracking-tight leading-snug">
                        {founderName}
                      </h3>
                      <p className="text-cyan-300 font-bold text-sm mt-0.5">
                        {founderRole}
                      </p>
                    </div>
                  </div>

                  {/* Floating Trust Pill */}
                  <div className="absolute -bottom-5 -right-4 sm:-bottom-6 sm:-right-6 p-4 rounded-2xl bg-white shadow-xl border border-blue-100 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">100% Policy Safe</p>
                      <p className="text-[11px] text-slate-500 font-semibold">Verified Marketplace Scaling</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Story Content */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Founder Quote Callout */}
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 border border-blue-100 shadow-sm">
                  <Quote className="w-10 h-10 text-[#0066FF]/20 absolute top-4 right-4" />
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 italic leading-relaxed">
                    &ldquo;{founder.founderQuote || 'We Don’t Just Manage Accounts — We Build Enduring E-Commerce Market Leaders.'}&rdquo;
                  </p>
                  <p className="mt-3 text-xs font-black tracking-widest text-[#0066FF] uppercase">
                    — {founderName}, {founderRole}
                  </p>
                </div>

                <div className="space-y-4 text-slate-700 text-base leading-relaxed">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {founder.bioHeading || 'The Story Behind EcomVanta'}
                  </h2>

                  {(founder.bioParagraphs && founder.bioParagraphs.length > 0
                    ? founder.bioParagraphs
                    : [
                        'Shivam Dubey founded EcomVanta with a straightforward mission: to eliminate the chaos, hidden fees, and empty promises prevalent in the e-commerce agency ecosystem.',
                        'Having witnessed hundreds of promising sellers struggle with suppressed listings, spiraling ad spend, and bureaucratic marketplace support, Shivam envisioned a truly specialized partner with skin in the game.',
                        'Under his leadership, EcomVanta has grown from managing a single seller account to orchestrating multi-channel e-commerce growth for over 500+ brands across Amazon, Flipkart, Meesho, Blinkit, Zepto, Myntra, and custom D2C stores.',
                      ]
                  ).map((paragraph: string, idx: number) => (
                    <p key={idx} className="font-medium text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:from-[#0052cc] hover:to-[#003d99] transition-all cursor-pointer group"
                  >
                    <span>Book 1-on-1 Growth Audit</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`tel:${content.branding?.topbarPhone || '+918787249407'}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-slate-200 hover:border-[#0066FF] bg-white text-slate-800 font-bold text-sm sm:text-base hover:text-[#0066FF] transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-[#0066FF]" />
                    <span>Direct Call with Team</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* PROVEN MILESTONES STRIP */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50/80 via-white to-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                VERIFIED TRACK RECORD
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Milestones Achieved Under Shivam Dubey’s Leadership
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {(founder.milestones || []).map((m: any, idx: number) => (
                <div
                  key={m.id || idx}
                  className="p-6 rounded-2xl bg-white border border-blue-100/80 shadow-sm text-center sm:text-left hover:shadow-lg transition-all"
                >
                  <h3 className="text-3xl sm:text-4xl font-black text-[#0066FF] tracking-tight">
                    <AnimatedCounter value={m.number} duration={2200} />
                  </h3>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1.5">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE LEADERSHIP PRINCIPLES */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                HOW WE OPERATE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Core Principles We Live By Every Single Day
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(founder.principles || []).map((p: any, idx: number) => (
                <div
                  key={p.id || idx}
                  className="p-8 rounded-3xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] font-black text-lg">
                    {idx === 0 ? <Target className="w-6 h-6" /> : idx === 1 ? <Zap className="w-6 h-6" /> : <HeartHandshake className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER VISION BANNER */}
        <section className="py-16 sm:py-20 bg-[#081325] text-white relative overflow-hidden">
          <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#0066FF]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> {founder.visionHeading || 'Our Vision for Indian E-Commerce'}
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black !text-white leading-tight">
              &ldquo;{founder.visionText || 'To empower every visionary manufacturer and brand in India with world-class marketplace capabilities, ensuring domestic products dominate online market share globally.'}&rdquo;
            </h2>

            <p className="text-sm font-semibold text-slate-400">
              — Shivam Dubey, Founder & CEO
            </p>

            <div className="pt-6">
              <button
                onClick={() => setPopupOpen(true)}
                className="px-9 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C2FF] text-white font-extrabold text-base hover:brightness-110 shadow-2xl shadow-blue-500/40 transition-all cursor-pointer"
              >
                {founder.calloutTitle || 'Schedule Free Growth Audit With Our Specialists'}
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        sourcePage="Founder Page Audit"
      />
    </div>
  );
}
