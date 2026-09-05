'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import ClientReviewsSlider from '@/components/ClientReviewsSlider';
import FaqAccordion from '@/components/FaqAccordion';
import ContactSection from '@/components/ContactSection';
import { CheckCircle2, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

const SERVICES_GRID = [
  {
    icon: '/brand-img/report.png',
    title: 'Account Setup & Onboarding',
    desc: 'Seamless brand registry, GTIN exemptions, category approvals, and tax setting configurations.',
  },
  {
    icon: '/brand-img/inventory-management.png',
    title: 'FBA Inventory Management',
    desc: 'Stock replenishment forecasting, inbound shipping plan creation, and stranded inventory fixes.',
  },
  {
    icon: '/brand-img/bullhorn.png',
    title: 'Amazon PPC Advertising',
    desc: 'Sponsored Products, Sponsored Brands & Display ads optimization for lower ACOS and maximum ROAS.',
  },
  {
    icon: '/brand-img/dashboard.png',
    title: 'Catalog & Listing Optimization',
    desc: 'Keyword-rich titles, persuasive bullet points, high-res lifestyle infographics, and Premium A+ content.',
  },
  {
    icon: '/brand-img/spending.png',
    title: 'Competitor & Price Benchmarking',
    desc: 'Automated Buy Box monitoring, competitor pricing analysis, and coupon/deal campaign execution.',
  },
  {
    icon: '/brand-img/policy.png',
    title: 'Account Health & Reinstatement',
    desc: 'Guaranteed defense against policy violations, counterfeit claims, and voice of customer defects.',
  },
  {
    icon: '/brand-img/customer-service.png',
    title: 'Review & Feedback Strategy',
    desc: 'Amazon Vine program enrollment, seller feedback management, and buyer messaging compliance.',
  },
  {
    icon: '/brand-img/data.png',
    title: 'Brand Store & Storefronts',
    desc: 'Custom multi-page responsive storefront design to cross-sell products and build customer loyalty.',
  },
  {
    icon: '/brand-img/writer.png',
    title: 'Weekly KPI & GMV Reporting',
    desc: 'Comprehensive executive reports on sales rank, session conversion rates, organic rank, and profit margins.',
  },
];

const ADVANTAGES = [
  {
    icon: '/css/Special expertise (2).png',
    title: 'Specialized Amazon Expertise',
    desc: 'Over 8+ years managing high GMV seller and vendor central accounts across categories.',
  },
  {
    icon: '/css/Time efficiency (2).png',
    title: 'Time & Operational Efficiency',
    desc: 'Save 30+ hours weekly on daily operational management, cases, and ad bid maintenance.',
  },
  {
    icon: '/css/Increase in sales performance (2).png',
    title: 'Guaranteed Sales Growth',
    desc: 'Data-driven algorithmic optimizations ensuring month-over-month revenue multiplication.',
  },
  {
    icon: '/css/Active issue resolution (2).png',
    title: 'Proactive Case Resolution',
    desc: 'Instant ticket escalation for suppressed listings, stranded units, and tax invoice mismatches.',
  },
  {
    icon: '/css/Data-operated strategies (2).png',
    title: 'Data-Driven Keyword Strategy',
    desc: 'Proprietary reverse-ASIN tools to capture high intent organic customer traffic.',
  },
];

export default function AmazonServicesPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20">
        
        {/* HERO */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-gray-100 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  Amazon SPN Certified Growth Partner
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                  Amazon Seller Account <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">Management Services</span>
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Scale your Amazon business with end-to-end management. From high-converting A+ catalog design and listing SEO to high-ROI Sponsored Ads and inventory management.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="ecomvantaPulseBtn px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 hover:from-[#0052cc] hover:to-[#003d99] cursor-pointer transition-all duration-300"
                  >
                    Get Free Account Audit
                  </button>
                  <a
                    href="tel:+916377709027"
                    className="px-8 py-4 rounded-full bg-white border border-gray-300 text-gray-800 font-bold text-sm hover:bg-blue-50/50 hover:border-blue-300 transition-colors"
                  >
                    Call: +91 6377709027
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <Image
                    src="/home-img/Amazon-account-management.webp"
                    alt="Amazon Account Management"
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        <BrandLogoSlider />

        {/* 9 GRID SERVICES */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                Comprehensive 360° Management
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mt-2">
                Our Amazon Management Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_GRID.map((srv) => (
                <div
                  key={srv.title}
                  className="p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#0066FF]/40 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100">
                      <Image src={srv.icon} alt={srv.title} width={36} height={36} className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{srv.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE ECOMVANTA FOR AMAZON */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
                Why Sellers Partner with EcomVanta
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADVANTAGES.map((adv) => (
                <div
                  key={adv.title}
                  className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                    <Image src={adv.icon} alt={adv.title} width={32} height={32} className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">{adv.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientReviewsSlider />
        
        <FaqAccordion
          title="Frequently Asked Questions on Amazon Management"
          faqs={[
            {
              question: "How do you help reduce Amazon Advertising ACOS?",
              answer: "We perform daily keyword pruning, negative keyword harvesting, bid adjustments by placement (Top of Search vs Rest of Search), and dayparting schedule rules."
            },
            {
              question: "What is required to start Amazon Account Management?",
              answer: "We only require secondary user permissions to your Amazon Seller Central with catalog, advertising, and pricing access."
            },
            {
              question: "Do you handle listing suppressions and brand registry?",
              answer: "Yes, our team manages end-to-end Brand Registry enrollment, trademark submission, A+ content approval, and listing error resolutions."
            }
          ]}
        />

        <ContactSection sourcePage="Amazon Management Page" />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Amazon Management" />
    </>
  );
}
