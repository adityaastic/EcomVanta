'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import ClientReviewsSlider from '@/components/ClientReviewsSlider';
import FaqAccordion from '@/components/FaqAccordion';
import ContactSection from '@/components/ContactSection';
import { useCmsContent } from '@/lib/useCmsContent';
import { SERVICES_DATABASE } from '@/lib/serviceData';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DynamicServicePage() {
  const params = useParams();
  const rawSlug = (params?.serviceSlug as string) || '';
  const slug = rawSlug.replace(/\.php$/i, '');
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();

  // Check CMS services first, then fallback to database
  const serviceData = content.services?.[slug] || SERVICES_DATABASE[slug];

  // Default title formatting if not in database
  const formattedTitle = serviceData?.title || (
    slug
      ? slug
          .replace(/-/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : 'E-Commerce Management Services'
  );

  const badge = serviceData?.badge || 'Certified Marketplace Growth Partner';
  const subtitle = serviceData?.subtitle || `Scale your revenue with India's top rated ${formattedTitle} provider. We provide complete listing, PPC ad optimization, order fulfillment, and account health maintenance.`;
  const heroImg = serviceData?.heroImage || '/home-img/Amazon-account-management.webp';
  const aboutImg = serviceData?.aboutImage || '/abt-img/flipkart-web-about.png';
  const aboutTitle = serviceData?.aboutTitle || `Why Choose Our ${formattedTitle}?`;
  const aboutDesc = serviceData?.aboutDesc || `At EcomVanta, we create tailored growth roadmaps for every seller. With 8+ years of marketplace experience, our team of dedicated managers will help you rank higher, lower your ACOS, and achieve continuous month-over-month revenue growth.`;
  
  const servicesGrid = serviceData?.servicesGrid || [
    {
      icon: '/brand-img/report.png',
      title: 'Account Onboarding & Setup',
      desc: 'Seamless brand registry, documentation, category whitelisting, and tax compliance.',
    },
    {
      icon: '/brand-img/inventory-management.png',
      title: 'Inventory & Fulfillment Sync',
      desc: 'Real-time multi-warehouse stock replenishment and automated low-stock warnings.',
    },
    {
      icon: '/brand-img/bullhorn.png',
      title: 'Sponsored Ads & PPC Growth',
      desc: 'Laser-targeted keyword bidding and budget optimization for maximum ROAS.',
    },
    {
      icon: '/brand-img/dashboard.png',
      title: 'Catalog & Listing SEO',
      desc: 'Keyword-rich titles, persuasive bullet points, and high-converting infographics.',
    },
    {
      icon: '/brand-img/policy.png',
      title: 'Account Health & Compliance',
      desc: 'Daily monitoring and proactive protection against suppressions and policy violations.',
    },
    {
      icon: '/brand-img/customer-service.png',
      title: 'Review & VOC Management',
      desc: 'Strategic review acquisition and seller rating enhancement.',
    },
  ];

  const advantages = serviceData?.advantages || [
    {
      icon: '/css/Special expertise (2).png',
      title: 'Certified Account Specialists',
      desc: 'Over 8+ years of proven operational experience scaling high-GMV brand accounts.',
    },
    {
      icon: '/css/Increase in sales performance (2).png',
      title: 'Guaranteed Revenue Multiplication',
      desc: 'Algorithmic listing and PPC optimizations ensuring continuous month-over-month growth.',
    },
    {
      icon: '/css/Active issue resolution (2).png',
      title: 'Rapid Case Escalation',
      desc: 'Direct resolution for stranded inventory, listing errors, and fee mismatches.',
    },
  ];

  const faqs = serviceData?.faqs || [
    {
      question: `How does EcomVanta deliver results for ${formattedTitle}?`,
      answer: "We implement an end-to-end framework covering keyword-rich catalog SEO, competitor benchmarking, high-converting imagery, daily ad bid adjustments, and proactive account health monitoring."
    },
    {
      question: "How soon can I see sales growth?",
      answer: "Most of our partner brands experience significant listing visibility gains within the first 14 days and double-digit GMV growth within 30 to 60 days."
    },
    {
      question: "What platforms do you support?",
      answer: "We offer dedicated account management for Amazon, Flipkart, Blinkit, Zepto, Meesho, Myntra, Nykaa, and Shopify."
    }
  ];

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20 bg-white">
        
        {/* HERO SECTION */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-gray-100 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  {badge}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  {formattedTitle}
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  {subtitle}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="ecomvantaPulseBtn px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:from-[#0052cc] hover:to-[#003d99] cursor-pointer transition-all duration-300"
                  >
                    Book Free Growth Audit
                  </button>
                  <a
                    href={`tel:${content.branding.topbarPhone || '+916377709027'}`}
                    className="px-8 py-4 rounded-full bg-white border border-gray-300 text-gray-800 font-bold text-sm hover:bg-blue-50/50 hover:border-blue-300 transition-colors"
                  >
                    Call: {content.branding.tollFreePhone || '+91 6377709027'}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src={heroImg}
                    alt={formattedTitle}
                    className="w-full h-auto object-contain max-h-[450px]"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        <BrandLogoSlider />

        {/* ABOUT / OVERVIEW */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={aboutImg}
                    alt={aboutTitle}
                    className="w-full h-auto object-cover max-h-[400px]"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                  Service Overview
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                  {aboutTitle}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {aboutDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:underline"
                  >
                    <span>Request Custom Strategy Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-20 bg-gray-50/60 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                Tailored Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mt-2">
                What We Deliver
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesGrid.map((srv: any) => (
                <div
                  key={srv.title}
                  className="p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#0066FF]/40 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center p-2.5 mb-6 border border-blue-100">
                      <img src={srv.icon} alt={srv.title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{srv.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        {advantages.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Why EcomVanta</span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
                  The EcomVanta Growth Advantage
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advantages.map((adv: any) => (
                  <div
                    key={adv.title}
                    className="p-6 bg-gray-50/60 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex items-start gap-4"
                  >
                    {adv.icon && (
                      <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl flex items-center justify-center p-2 border border-blue-100">
                        <img src={adv.icon} alt={adv.title} className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900 text-base mb-1">{adv.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ClientReviewsSlider />
        
        <FaqAccordion
          title={`FAQs on ${formattedTitle}`}
          faqs={faqs}
        />

        <ContactSection sourcePage={`${formattedTitle} Page`} />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage={formattedTitle} />
    </>
  );
}
