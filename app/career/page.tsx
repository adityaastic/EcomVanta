'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import ContactSection from '@/components/ContactSection';
import { useCmsContent } from '@/lib/useCmsContent';
import { DEFAULT_CAREER_PAGE_CONTENT, DEFAULT_SITE_CONTENT } from '@/lib/cmsTypes';
import { MapPin, Briefcase, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CareerPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();

  const cp = content.careerPage || DEFAULT_CAREER_PAGE_CONTENT;
  const rawCareers = content.careers?.length ? content.careers : DEFAULT_SITE_CONTENT.careers;
  const openings = rawCareers.filter((job) => job.status !== 'Closed');

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
              {cp.heroBadge || '🚀 We Are Hiring!'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight">
              {cp.heroTitle || 'Careers at'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">
                {cp.heroHighlight || 'EcomVanta'}
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {cp.heroSubtitle || 'Build Your Career in eCommerce, Digital Marketing & Brand Growth. Join an elite team scaling top brands on Amazon, Flipkart, Myntra, Zepto, and Blinkit.'}
            </p>
          </div>
        </header>

        {/* PITCH CARD */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gray-50/70 border border-gray-200 shadow-sm text-center space-y-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                {cp.pitchText || "Whether you're an experienced marketplace strategist or looking to launch your career in the hyper-growing e-commerce ecosystem, EcomVanta offers dynamic opportunities to learn, execute, and make a measurable impact."}
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {(cp.pitchBadges?.length ? cp.pitchBadges : ['📍 New Delhi, India', '📈 High-Growth Agency', '🎓 Continuous Learning & Upskilling']).map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-800 shadow-xs"
                  >
                    {badge}
                  </span>
                ))}
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
        {cp.bannerImage && (
          <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 flex items-center justify-center">
                <img
                  src={cp.bannerImage}
                  alt="EcomVanta Team & Culture"
                  className="w-full h-auto object-cover max-h-[520px] rounded-2xl"
                />
              </div>
            </div>
          </section>
        )}

        {/* WHY JOIN & WHAT YOU GET */}
        <section className="py-16 bg-gray-50/60 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-gray-900">
                  {cp.whyJoinTitle || 'Why Join EcomVanta?'}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cp.whyJoinDescription || 'At EcomVanta, we believe our talent is our core engine. When you join EcomVanta, you become part of a merit-based culture focused on innovation, autonomy, and continuous growth.'}
                </p>
                <div className="space-y-2.5 pt-2">
                  {(cp.whyJoinPoints?.length ? cp.whyJoinPoints : [
                    'Cross-functional management across 10+ marketplaces',
                    'Quarterly performance bonuses and rapid role promotions',
                    'Vibrant and collaborative modern workspace'
                  ]).map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-gray-900">
                  {cp.whatYouGetTitle || "What You'll Get"}
                </h2>
                <div className="space-y-3 pt-2">
                  {(cp.whatYouGetItems?.length ? cp.whatYouGetItems : [
                    { id: '1', number: '01', title: 'Hands-On High GMV Brand Scaling Experience' },
                    { id: '2', number: '02', title: 'Sponsored Certifications (Amazon SPN, Flipkart, Meta, Google)' },
                    { id: '3', number: '03', title: 'Direct Mentorship from Senior Marketplace Leaders' },
                    { id: '4', number: '04', title: 'Competitive Compensation & High-Impact Incentives' }
                  ]).map((item, iIdx) => (
                    <div key={item.id || iIdx} className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center gap-3">
                      <span className="text-[#0066FF] font-black text-sm">{item.number || `0${iIdx + 1}`}</span>
                      <span className="text-xs font-bold text-gray-800">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* VACANCIES */}
        <section id="vacancies" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                {cp.openingsHeadingBadge || 'Job Openings'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mt-2">
                {cp.openingsHeadingTitle || 'Current Open Positions'}
              </h2>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {openings.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-3xl border border-gray-200 space-y-4">
                  <Briefcase className="w-10 h-10 text-gray-400 mx-auto" />
                  <h3 className="text-lg font-bold text-gray-800">No active vacancies right now</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    We are always looking for passionate e-commerce specialists. Feel free to send us your profile for future consideration.
                  </p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="px-6 py-2.5 bg-[#0066FF] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#0052cc] transition-colors"
                  >
                    Send Resume
                  </button>
                </div>
              ) : (
                openings.map((job: any) => (
                  <div
                    key={job.id || job.title}
                    className="p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#0066FF]/40 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {job.department && (
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold">
                            {job.department}
                          </span>
                        )}
                        {job.type && (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            {job.type}
                          </span>
                        )}
                        {job.experience && (
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                            Exp: {job.experience}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                        {job.location}
                      </p>
                      <p className="text-sm text-gray-600 pt-1 leading-relaxed max-w-2xl">{job.description || job.desc}</p>

                      {job.requirements && job.requirements.length > 0 && (
                        <div className="pt-2 space-y-1">
                          {job.requirements.map((req: string, rIdx: number) => (
                            <div key={rIdx} className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setPopupOpen(true)}
                      className="ecomvantaPulseBtn px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white text-xs font-extrabold hover:from-[#0052cc] hover:to-[#003d99] transition-colors whitespace-nowrap shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                ))
              )}
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
