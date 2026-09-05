'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import ContactSection from '@/components/ContactSection';
import { useCmsContent } from '@/lib/useCmsContent';
import { Award, Target, Users, TrendingUp, CheckCircle, Star } from 'lucide-react';

export default function AboutUsPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();
  const about = content.aboutUs;

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20">
        
        {/* HERO SECTION */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FFFFED] via-white to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#f71735] text-xs font-bold uppercase tracking-wider">
                  About Arvian Business Solutions
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  {about?.heroTitle || 'Driving Unprecedented E-Commerce Growth Since 2018'}
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {about?.heroSubtitle || about?.storyDesc || 'Arvian Business Solutions is one of India\'s leading e-commerce management and growth agencies. With over 8+ years of dedicated marketplace experience, we empower D2C brands, manufacturers, and sellers to dominate Amazon, Flipkart, Blinkit, Meesho, Myntra, and Shopify.'}
                </p>

                {/* Rating Badges from live site */}
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-100">
                    <Image src="/home-img/google_icon.png" alt="Google" width={24} height={24} className="w-6 h-6 object-contain" />
                    <div>
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                      <p className="text-xs font-bold text-gray-800">4.9/5 Rating</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-100">
                    <Image src="/home-img/justdial_icon.png" alt="Justdial" width={24} height={24} className="w-6 h-6 object-contain" />
                    <div>
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                      <p className="text-xs font-bold text-gray-800">Top Rated Agency</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-100">
                    <Image src="/home-img/ambitionbox_icon.png" alt="AmbitionBox" width={24} height={24} className="w-6 h-6 object-contain" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">4.8★ Workplace</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="arvianPulseBtn px-8 py-4 rounded-full bg-[#f71735] text-white font-bold text-sm hover:bg-[#cc0000] shadow-lg cursor-pointer transition-transform duration-300"
                  >
                    Partner With Us
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src={about?.heroImage || '/abt-img/About-new-left.png'}
                    alt="About Arvian"
                    className="w-full h-auto object-cover max-h-[450px]"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4 CORE VALUE PILLARS */}
        <section className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase font-bold text-[#f71735] tracking-widest">Our Foundation</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
                Why Brands Trust Arvian
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#f71735]/40 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                  <Image src="/abt-img/Icon-01.png" alt="Expertise" width={36} height={36} className="w-9 h-9 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Marketplace Mastery</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Deep technical expertise across algorithms for Amazon A9, Flipkart ranking, Blinkit dark stores, and Quick Commerce.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#f71735]/40 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                  <Image src="/abt-img/Icon-02.png" alt="Growth" width={36} height={36} className="w-9 h-9 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ROI-Driven PPC</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Precision ad spend optimization, negative keyword harvesting, and dayparting to keep ACOS at minimum while maximizing GMV.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#f71735]/40 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                  <Image src="/abt-img/Icon-03.png" alt="Account Health" width={36} height={36} className="w-9 h-9 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Account Health Shield</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Proactive resolution of listing suppressions, policy violations, IP claims, and VOC customer feedback ratings.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#f71735]/40 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                  <Image src="/abt-img/Icon-04.png" alt="Dedicated Manager" width={36} height={36} className="w-9 h-9 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dedicated Account Manager</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Direct access to specialized account managers with weekly strategy calls and transparent real-time KPI reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER & LEADERSHIP SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-900 to-[#0A0A24] rounded-3xl p-8 sm:p-14 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-4 border-[#f71735] shadow-2xl">
                  <Image
                    src="/abt-img/Arvind-owner-img.jpeg"
                    alt="Arvind - Founder & CEO"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="text-[#f71735] text-xs uppercase font-bold tracking-widest">
                  Leadership Note
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  &ldquo;We Treat Your Brand Like Our Own.&rdquo;
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  When we founded Arvian Business Solutions, our goal was simple: provide complete transparency, elite execution, and true growth partnership to sellers. Today, our 50+ e-commerce specialists manage hundreds of successful brands across India and global marketplaces.
                </p>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-white">Arvind Sharma</h4>
                  <p className="text-xs text-[#f71735] font-semibold">Founder &amp; CEO, Arvian Business Solutions</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <BrandLogoSlider />
        <ContactSection sourcePage="About Us Page" />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="About Us" />
    </>
  );
}
