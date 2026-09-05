'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import HeroSection from '@/components/HeroSection';
import BrandLogoSlider from '@/components/BrandLogoSlider';
import PlatformServices from '@/components/PlatformServices';
import ClientReviewsSlider from '@/components/ClientReviewsSlider';
import FaqAccordion from '@/components/FaqAccordion';
import ContactSection from '@/components/ContactSection';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function EcommerceDelhiPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can Arvian help my online business grow?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, with lots of experience and wide ranges of services Arvian can help you to make relevant strategies for growing your business."
                }
              },
              {
                "@type": "Question",
                "name": "How can Arvian help improve my product listings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Arvian team uses its skills to create product listings. They optimize these listings with SEO. This includes clear descriptions, quality images, and the right keywords. These strategies help increase visibility and engage customers."
                }
              },
              {
                "@type": "Question",
                "name": "Does Arvian provide advertising services for e-commerce platforms?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Arvian makes and manages custom ads across various channels. This helps to increase product visibility and sales."
                }
              },
              {
                "@type": "Question",
                "name": "Can Arvian assist with account health monitoring?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Arvian regularly checks account performance. This ensures compliance with platform guidelines and helps prevent suspensions. It also supports operational efficiency."
                }
              }
            ]
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "E-Commerce Service Provider in Delhi | Arvian Business Solutions",
            "image": "/abt-img/flipkart-web-about.png",
            "description": "We are a one-stop eCommerce solution provider in Delhi, offering complete listings, product optimisation & order management to boost your online business.",
            "brand": {
              "@type": "Brand",
              "name": "Arvian Business Solutions Pvt Ltd."
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "5",
              "ratingCount": "72"
            }
          }),
        }}
      />

      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          onOpenPopup={() => setPopupOpen(true)}
          title="E-Commerce Service Provider in Delhi"
          description="We are a one-stop eCommerce solution provider in Delhi, offering complete listings, product optimisation & order management to boost your online business."
        />

        {/* Brand Logos Slider */}
        <BrandLogoSlider />

        {/* About Section */}
        <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Image */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-lg">
                  <Image
                    src="/abt-img/flipkart-web-about.png"
                    alt="E-Commerce Service Provider Delhi"
                    width={550}
                    height={450}
                    className="w-full h-auto object-contain rounded-2xl shadow-lg border border-gray-100"
                    priority
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base text-justify">
                <p>
                  In Delhi&apos;s competitive digital landscape, businesses need a trusted partner to drive their online sales. <strong className="text-gray-950">Arvian Business Solutions</strong> has earned its reputation as the leading <b className="text-[#f71735]">E-Commerce service provider in Delhi</b>, offering comprehensive, platform-specific solutions tailored to each client&apos;s needs.
                </p>
                <p>
                  We understand the unique challenges businesses face when establishing a presence on eCommerce platforms. At Arvian, we specialise in customising inventory management, customer service, and operational solutions that streamline processes and deliver exceptional results. Our commitment to outstanding customer service and operational excellence sets us apart as a top choice for eCommerce support in Delhi.
                </p>
                <p>
                  Unlike other agencies that offer generic services, Arvian takes the time to understand your specific needs, goals, and sales targets. Every strategy we implement is designed to propel your business to the next level. We provide expert services for top platforms like Amazon, Flipkart, Myntra, and Shopify, helping you succeed in the ever-evolving world of online commerce.
                </p>
                
                <div className="pt-2">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f71735] text-white font-bold text-sm hover:bg-[#cc0000] shadow-md transition-all cursor-pointer"
                  >
                    <span>Get Custom Strategy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why Choose Arvian Section */}
        <section className="py-16 sm:py-20 bg-gray-50/50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                Why Choose Arvian Business Solutions for Your E-Commerce Success?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-3">
                Selecting the right services for your e-commerce business is important. Businesses in Delhi choose Arvian Business Solutions for many reasons. Here are some advantages of working with us:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#f71735] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <span className="text-[#f71735]">Expertise &amp; Experience:</span> Proven Knowledge
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our years of experience and knowledge make for great e-commerce strategies to make your business successful. The Arvian team’s knowledge of different platforms and online business methods can be proven effective and successful for your business.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#f71735] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <span className="text-[#f71735]">End-to-End Services:</span> Complete Management
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Arvian provides a complete set of services. This includes product listing, inventory management, advertising, and account health monitoring. The exclusive services manage the growth of your online businesses.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#f71735] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <span className="text-[#f71735]">All-in-One Services:</span> Hassle-Free Growth
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We keep track of your online services. This includes product listings and customer support. This helps you to focus on important tasks of a business.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#f71735] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <span className="text-[#f71735]">Competitive Pricing:</span> High ROI
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We are a top e-commerce service provider in Delhi. We supply affordable solutions that generate high investment returns for every rupee spent.
                </p>
              </div>

              {/* Card 5 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#f71735] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <span className="text-[#f71735]">Transparency:</span> Honest Communication
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We make sure that all the services and fee structures will be clear to you. We maintain transparent reporting and active communication at every milestone.
                </p>
              </div>

              {/* Card 6 */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#f71735] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <span className="text-[#f71735]">Dedicated Support:</span> 24/7 Availability
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Arvian is the best and most specialised service provider in Delhi for your business. This ensures a seamless shopping experience on various online platforms.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Our E-Commerce Services Tailored for Delhi */}
        <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                Our E-Commerce Services Tailored for Delhi Entrepreneurs
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-3">
                <strong className="text-[#f71735]">Arvian Business Solutions</strong> offers services for e-commerce entrepreneurs in Delhi. We help them succeed in a competitive market. Here are some customised services we offer:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Image */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-lg">
                  <Image
                    src="/ecommerce-growth-partners.webp"
                    alt="Complete E-commerce Platforms Management Services"
                    width={550}
                    height={450}
                    className="w-full h-auto object-cover rounded-2xl shadow-xl border border-gray-100"
                  />
                </div>
              </div>

              {/* Right Services List */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    <span className="text-[#f71735]">Inventory &amp; Order Management:</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We keep a track of all your inventories to ensure products are always in stock. This prevents delays in deliveries and maintains customer satisfaction.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    <span className="text-[#f71735]">Product Listing &amp; Optimisation:</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our team creates high-quality product listings that enhance visibility and improve conversion rates, giving your platform a competitive edge.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    <span className="text-[#f71735]">Customer Support:</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We provide reliable and responsive customer service. Our team quickly resolves issues and answers queries, helping you build lasting customer relationships.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    <span className="text-[#f71735]">Marketing &amp; SEO:</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We drive traffic to your store through pay-per-click campaigns, SEO strategies, and social media marketing, boosting visibility and increasing sales.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    <span className="text-[#f71735]">Marketplace Management:</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    As a leading e-commerce service provider in Delhi, we ensure smooth management of your e-commerce store across platforms, helping your business run efficiently.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    <span className="text-[#f71735]">Business Analytics:</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We provide clear, regular reports that offer valuable insights into your business performance. These analytics help identify areas for improvement and growth.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Platform-Specific Services Section */}
        <PlatformServices />

        {/* Google Client Reviews Slider */}
        <ClientReviewsSlider />

        {/* FAQ Section */}
        <FaqAccordion
          title="FAQs on E-Commerce Solutions in Delhi"
          faqs={[
            {
              question: "Can Arvian help my online business grow?",
              answer: "Yes, with lots of experience and wide ranges of services Arvian can help you to make relevant strategies for growing your business."
            },
            {
              question: "How can Arvian help improve my product listings?",
              answer: "The Arvian team uses its skills to create product listings. They optimize these listings with SEO. This includes clear descriptions, quality images, and the right keywords. These strategies help increase visibility and engage customers."
            },
            {
              question: "Does Arvian provide advertising services for e-commerce platforms?",
              answer: "Arvian makes and manages custom ads across various channels. This helps to increase product visibility and sales."
            },
            {
              question: "Can Arvian assist with account health monitoring?",
              answer: "Arvian regularly checks account performance. This ensures compliance with platform guidelines and helps prevent suspensions. It also supports operational efficiency."
            }
          ]}
        />

        {/* Contact Section */}
        <ContactSection sourcePage="Delhi E-Commerce Service Provider Page" />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Delhi Landing Page" />
    </>
  );
}
