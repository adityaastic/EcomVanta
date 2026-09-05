'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import ContactSection from '@/components/ContactSection';
import { CaseStudyData } from '@/lib/caseStudyData';
import { 
  ArrowLeft, 
  ZoomIn, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Quote, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CaseStudyTemplateProps {
  data: CaseStudyData;
}

export default function CaseStudyTemplate({ data }: CaseStudyTemplateProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20 bg-white">
        
        {/* HERO SECTION */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-gray-100 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Case Studies</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200/60 text-xs font-bold uppercase tracking-wider">
                    {data.category}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">• Amazon India</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                  {data.title}
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {data.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="ecomvantaPulseBtn px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 cursor-pointer transition-all"
                  >
                    Scale Your Brand With Us
                  </button>
                </div>
              </div>

              {/* Brand Logo Box */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-xl flex items-center justify-center aspect-square w-64 h-64 relative hover:border-blue-300 transition-all">
                  <Image
                    src={data.brandLogo}
                    alt={data.brandName}
                    width={180}
                    height={180}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROJECT SNAPSHOT METRICS */}
        <section className="py-16 bg-gray-50/60 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Growth Highlights</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">Project Snapshot</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.snapshot.map((snap) => (
                <div
                  key={snap.label}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all text-center"
                >
                  <p className="text-3xl sm:text-4xl font-black text-[#0066FF]">{snap.metric}</p>
                  <h4 className="font-bold text-gray-900 text-sm mt-2">{snap.label}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{snap.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE CHALLENGE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Obstacles Faced</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                  {data.challengeTitle}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Before partnering with EcomVanta, {data.brandName} faced critical hurdles in scaling their online marketplace presence.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {data.challenges.map((chal, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 flex items-start gap-4 hover:border-blue-200 transition-all"
                  >
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-[#0066FF] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">{chal}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* THE ECOMVANTA SOLUTION (6 STEPS) */}
        <section className="py-20 bg-gray-50/60 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Our Playbook</span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mt-2">
                {data.solutionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.solutions.map((sol) => (
                <div
                  key={sol.title}
                  className="p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#0066FF]/40 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center p-2.5 mb-6 border border-blue-100">
                      <Image src={sol.icon} alt={sol.title} width={40} height={40} className="max-w-full max-h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{sol.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{sol.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFIED DASHBOARD PROOF */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Documented Growth</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
                Verified Seller Central Dashboard
              </h2>
              <p className="text-gray-500 text-xs mt-2">Click screenshot to enlarge and view verified sales numbers</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 bg-gray-50 cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={data.dashboardImage}
                  alt={`${data.brandName} Dashboard`}
                  width={1100}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-4 bg-[#0066FF] text-white rounded-full shadow-2xl">
                    <ZoomIn className="w-6 h-6" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATALOG SHOWCASE */}
        {data.listingImage && (
          <section className="py-16 bg-gray-50/60 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Catalog Optimization</span>
                  <h3 className="text-3xl font-black text-gray-900">
                    High-Converting Product Detail Pages
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    By redesigning lifestyle imagery, adding dimensional infographics, and copywriting benefit-focused bullet points, we increased organic session conversion rates significantly.
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                    <Image
                      src={data.listingImage}
                      alt="Listing Optimization"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* TESTIMONIAL QUOTE */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#081325] via-[#0B1E36] to-[#07101E] text-white shadow-2xl text-center relative overflow-hidden border border-blue-900/40">
              <Quote className="w-12 h-12 text-[#00C2FF]/40 mx-auto mb-4" />
              <p className="text-lg sm:text-2xl font-bold leading-relaxed italic text-gray-100 max-w-2xl mx-auto">
                &ldquo;{data.testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="font-extrabold text-base text-white">{data.testimonial.author}</h4>
                <p className="text-xs text-[#00C2FF] font-semibold">{data.testimonial.designation}</p>
              </div>
            </div>
          </div>
        </section>

        <BrandLogoSlider />
        <ContactSection sourcePage={`${data.brandName} Case Study`} />
      </main>

      {/* Lightbox Modal for Dashboard Screenshot */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform p-2 cursor-pointer"
            aria-label="Close image popup"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center p-2">
            <img
              src={data.dashboardImage}
              alt="Enlarged Dashboard Proof"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage={data.brandName} />
    </>
  );
}
