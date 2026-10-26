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
import EcommercePlatformsSlider from '@/components/EcommercePlatformsSlider';
import { useCmsContent } from '@/lib/useCmsContent';
import { SERVICES_DATABASE } from '@/lib/serviceData';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DynamicServicePage() {
  const params = useParams();
  const rawSlug = (params?.serviceSlug as string) || '';
  const slug = rawSlug.replace(/\.php$/i, '');
  const [popupOpen, setPopupOpen] = useState(false);
  const { content } = useCmsContent();

  // Merge database defaults with CMS service overrides so new fields like longContentHtml work seamlessly
  const dbService = SERVICES_DATABASE[slug];
  const cmsService = content.services?.[slug];
  const serviceData = (dbService || cmsService)
    ? {
        ...dbService,
        ...cmsService,
        longContentHtml: cmsService?.longContentHtml || dbService?.longContentHtml || '',
      }
    : undefined;

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
  const longContentHtml = serviceData?.longContentHtml || '';
  
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
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold">
                  {badge}
                </span>

                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                  {formattedTitle}
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {subtitle}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="ecomvantaPulseBtn px-7 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:from-[#0052cc] hover:to-[#003d99] cursor-pointer transition-all duration-300"
                  >
                    Request a Free Account Audit Call
                  </button>
                  <a
                    href={`https://wa.me/918787249407?text=${encodeURIComponent(`Hi EcomVanta, I want to enquire about ${formattedTitle}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-4 rounded-full bg-white border border-slate-300 text-slate-900 font-bold text-sm hover:bg-blue-50/50 hover:border-blue-300 transition-colors"
                  >
                    WhatsApp us: {content.branding?.tollFreePhone || '+91 878 724 9407'}
                  </a>
                  <a
                    href={`tel:${content.branding?.topbarPhone || '+918787249407'}`}
                    className="px-6 py-4 rounded-full bg-white border border-slate-300 text-slate-900 font-bold text-sm hover:bg-blue-50/50 hover:border-blue-300 transition-colors"
                  >
                    Call: {content.branding?.tollFreePhone || '+91 878 724 9407'}
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
                <span className="text-xs font-extrabold text-[#0066FF] tracking-wide">
                  Service Overview
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  {aboutTitle}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {aboutDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:underline cursor-pointer"
                  >
                    <span>Request a Free Account Audit Call</span>
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
              <span className="text-xs font-extrabold text-[#0066FF] tracking-wide">
                Tailored Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
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
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        {advantages.length > 0 && (
          <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-extrabold text-[#0066FF] tracking-wide">Why EcomVanta</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Why Choose EcomVanta?
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
                      <h3 className="font-bold text-slate-900 text-base mb-1">{adv.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RICH LONG-FORM DOC / SEO GUIDE CONTENT (Editable from Admin Panel) */}
        {longContentHtml && (
          <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                onClick={(e) => {
                  const target = (e.target as HTMLElement).closest('a');
                  if (target && (target.getAttribute('href') === '#audit' || target.getAttribute('href') === '#quote')) {
                    e.preventDefault();
                    setPopupOpen(true);
                  }
                }}
                className="service-doc-content text-slate-600 leading-relaxed space-y-4
                  [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-slate-100 first:[&_h2]:mt-0 first:[&_h2]:pt-0 first:[&_h2]:border-t-0
                  [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-extrabold [&_h3]:text-slate-900 [&_h3]:mt-7 [&_h3]:mb-2.5
                  [&_p]:text-base [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5 [&_ul]:text-base [&_ul]:text-slate-600
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2.5 [&_ol]:mb-5 [&_ol]:text-base [&_ol]:text-slate-600
                  [&_li]:leading-relaxed
                  [&_strong]:font-bold [&_strong]:text-slate-900
                  [&_a]:text-[#0066FF] [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#0052cc]
                  [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-slate-200 [&_table]:text-sm
                  [&_thead]:bg-slate-900 [&_thead]:text-white
                  [&_th]:py-3.5 [&_th]:px-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-xs
                  [&_td]:py-3.5 [&_td]:px-4 [&_td]:border-t [&_td]:border-slate-200 [&_td]:text-slate-600 [&_td]:align-top
                  [&_tbody_tr:nth-child(even)]:bg-slate-50/70"
                dangerouslySetInnerHTML={{ __html: longContentHtml }}
              />
            </div>
          </section>
        )}

        {/* Moving E-Commerce Platforms & Marketplaces Marquee (Above Rating & Reviews) */}
        <EcommercePlatformsSlider />

        <ClientReviewsSlider />
        
        <FaqAccordion
          title="Frequently Asked Questions"
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
