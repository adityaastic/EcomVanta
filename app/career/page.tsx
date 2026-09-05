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
import { MapPin, Briefcase, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const DEFAULT_OPENINGS = [
  {
    title: 'Senior Amazon Account Manager',
    department: 'Marketplace Operations',
    location: 'Jaipur, Rajasthan (On-Site / Hybrid)',
    type: 'Full Time',
    description: '3+ years experience managing high GMV Amazon seller and vendor central accounts, FBA logistics, Buy Box, and Brand Registry.',
  },
  {
    title: 'Ecommerce PPC & Ads Specialist',
    department: 'Performance Marketing',
    location: 'Jaipur, Rajasthan',
    type: 'Full Time',
    description: 'Expert in Amazon Sponsored Products/Brands/Display ads, Flipkart PCA ads, Meta conversion pixels, and ROAS optimization.',
  },
  {
    title: 'Catalog & SEO Executive',
    department: 'Content & Design',
    location: 'Jaipur, Rajasthan',
    type: 'Full Time',
    description: 'Skilled in keyword research, reverse ASIN harvesting, A+ content copywriting, and bulk Excel flat file uploads.',
  },
  {
    title: 'Graphic & Brand Storefront Designer',
    department: 'Creative Design',
    location: 'Jaipur, Rajasthan',
    type: 'Full Time',
    description: 'Proficient in Photoshop, Illustrator, and Canva for designing high-converting lifestyle infographics, Amazon Brand Stores, and A+ banners.',
  },
  {
    title: 'Quick Commerce Manager (Blinkit / Zepto)',
    department: 'Operations',
    location: 'Jaipur, Rajasthan',
    type: 'Full Time',
    description: 'Experienced in quick commerce onboarding, dark store inventory distribution, and micro-fulfillment tracking.',
  },
];

export default function CareerPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();
  const openings = content.careers?.length ? content.careers : DEFAULT_OPENINGS;

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20">
        
        {/* HERO */}
        <header className="relative py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 via-white to-white text-center overflow-hidden border-b border-gray-100">
          <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold uppercase tracking-wider">
              We Are Hiring!
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight">
              Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">EcomVanta</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Build Your Career in eCommerce, Digital Marketing &amp; Brand Growth. Join an elite team scaling top brands on Amazon, Flipkart, Myntra, Zepto, and Blinkit.
            </p>
          </div>
        </header>

        {/* PITCH CARD */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gray-50/70 border border-gray-200 shadow-sm text-center space-y-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Whether you&apos;re an experienced marketplace strategist or looking to launch your career in the hyper-growing e-commerce ecosystem, EcomVanta offers dynamic opportunities to learn, execute, and make a measurable impact.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-800 shadow-xs">
                  📍 New Delhi, India
                </span>
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-800 shadow-xs">
                  📈 High-Growth Agency
                </span>
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-800 shadow-xs">
                  🎓 Continuous Learning &amp; Upskilling
                </span>
              </div>

              <div>
                <a
                  href="#vacancies"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 hover:from-[#0052cc] hover:to-[#003d99] transition-all"
                >
                  <span>View Open Positions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM IMAGE BANNER */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
              <Image
                src="/arvian-team-image.jpeg"
                alt="EcomVanta Team"
                width={1200}
                height={600}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          </div>
        </section>

        {/* WHY JOIN & WHAT YOU GET */}
        <section className="py-16 bg-gray-50/60 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-gray-900">Why Join EcomVanta?</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  At EcomVanta, we believe our talent is our core engine. When you join EcomVanta, you become part of a merit-based culture focused on innovation, autonomy, and continuous growth.
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                    <span>Cross-functional management across 10+ marketplaces</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                    <span>Quarterly performance bonuses and rapid role promotions</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                    <span>Vibrant and collaborative modern workspace</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-gray-900">What You&apos;ll Get</h2>
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center gap-3">
                    <span className="text-[#0066FF] font-black text-sm">01</span>
                    <span className="text-xs font-bold text-gray-800">Hands-On High GMV Brand Scaling Experience</span>
                  </div>
                  <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center gap-3">
                    <span className="text-[#0066FF] font-black text-sm">02</span>
                    <span className="text-xs font-bold text-gray-800">Sponsored Certifications (Amazon SPN, Flipkart, Meta, Google)</span>
                  </div>
                  <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center gap-3">
                    <span className="text-[#0066FF] font-black text-sm">03</span>
                    <span className="text-xs font-bold text-gray-800">Direct Mentorship from Senior Marketplace Leaders</span>
                  </div>
                  <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center gap-3">
                    <span className="text-[#0066FF] font-black text-sm">04</span>
                    <span className="text-xs font-bold text-gray-800">Competitive Compensation &amp; High-Impact Incentives</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* VACANCIES */}
        <section id="vacancies" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Job Openings</span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mt-2">
                Current Open Positions
              </h2>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {openings.map((job: any) => (
                <div
                  key={job.title}
                  className="p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#0066FF]/40 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold">
                        {job.department || job.dept}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                      {job.location}
                    </p>
                    <p className="text-sm text-gray-600 pt-1 leading-relaxed max-w-2xl">{job.description || job.desc}</p>
                  </div>

                  <button
                    onClick={() => setPopupOpen(true)}
                    className="ecomvantaPulseBtn px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white text-xs font-extrabold hover:from-[#0052cc] hover:to-[#003d99] transition-colors whitespace-nowrap shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BrandLogoSlider />
        <ContactSection sourcePage="Careers Page" />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Careers Page" />
    </>
  );
}
