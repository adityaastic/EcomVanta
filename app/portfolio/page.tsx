'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import { X, Play, ZoomIn, ArrowRight } from 'lucide-react';

type FilterType = 'all' | 'amazon' | 'brandstore' | 'web';

interface PortfolioItem {
  id: number;
  type: 'image' | 'video';
  category: FilterType;
  categoryLabel: string;
  subCategory?: string;
  title: string;
  mediaSrc: string;
  link?: string;
  linkText?: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. Marketplace Sales Screenshots (Amazon / Marketplace)
  {
    id: 1,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Kay Kay Industries',
    mediaSrc: '/abt-img/Kay-Kay-industries (1).jpeg',
  },
  {
    id: 2,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Sai Gallery',
    mediaSrc: '/abt-img/SaI Gallery 1 year Sales .png',
  },
  {
    id: 3,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Rajendra Medical',
    mediaSrc: '/abt-img/Rajendra Medical 1 year (1).png',
  },
  {
    id: 4,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Nut o Nut',
    mediaSrc: '/abt-img/Nut o Nut 1 year sales (1).png',
  },
  {
    id: 5,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Gataca',
    mediaSrc: '/abt-img/Gataca 1 year sales (1).png',
  },
  {
    id: 6,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Luxe Dermacare',
    mediaSrc: '/abt-img/luxe (1).png',
  },
  {
    id: 7,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Ornalight',
    mediaSrc: '/abt-img/Ornalight.jpeg',
  },
  {
    id: 8,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Rasaveda',
    mediaSrc: '/abt-img/Rasaveda.png',
  },
  {
    id: 9,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Drinkbubz',
    mediaSrc: '/abt-img/Bubz.jpeg',
  },
  {
    id: 10,
    type: 'image',
    category: 'amazon',
    categoryLabel: 'Marketplace',
    title: 'Swadesi Stuff',
    mediaSrc: '/abt-img/Swadesi Stuff.jpeg',
  },

  // 2. Brand Stores (Amazon Storefront Videos)
  {
    id: 11,
    type: 'video',
    category: 'brandstore',
    categoryLabel: 'Brand Stores',
    subCategory: 'Kalprishi',
    title: 'Visit Brand Store →',
    mediaSrc: '/abt-img/Kalprishi-brand-store.mp4',
    link: 'https://www.amazon.in/KALPRISHI-Flavour-Achari-Ghosht-Natural/dp/B0DH51V4MS/ref=sr_1_1?crid=1GO977SF4G398&dib=eyJ2IjoiMSJ9.NyL-6cZHhn99XhTl9qap_YGwXgtioQh3Py66iDNzQjaynuthqK7oNTzc4oLy2k5m41A9iqoo0eejho-iw83w11fN05ekHvs7jZiCDjbC5ALOlb8-aneUaAr6niybLK-zHJbWHTrFND431vWrxtVvrzPqTwOh7PyRucqkw08Od_lB53u85os23hvhbgnjC_KeetFa5aN9PnEAd9vj7RwEkeZXVD0qOj84NNF5UH-j-XmpQQ9HWi-_WceHeKj7baizISt9xNdBH14gCsHbvjC3I0Huf8ZmBNzOGfgftole3Q8.Nd7fl0KFVJzyNJQ5NSBvWBFMG-Lku8rfubm63eyoGzU&dib_tag=se&keywords=kalprishi+achari&qid=1752742135&sprefix=kalprishi+achar%2Caps%2C215&sr=8-1',
  },
  {
    id: 12,
    type: 'video',
    category: 'brandstore',
    categoryLabel: 'Brand Stores',
    subCategory: 'Shiva',
    title: 'Visit Brand Store →',
    mediaSrc: '/abt-img/Shiva-Brand-Store.mp4',
    link: 'https://www.amazon.in/stores/SHIVAS/page/A6075ABF-D2F3-47EB-B3B7-D505BF88C224?lp_asin=B0B756DG8Y&ref_=ast_bln',
  },
  {
    id: 13,
    type: 'video',
    category: 'brandstore',
    categoryLabel: 'Brand Stores',
    subCategory: 'OrangeBerry',
    title: 'Visit Brand Store →',
    mediaSrc: '/abt-img/orrangeberry-brand-store.mp4',
    link: 'https://www.amazon.in/stores/page/8E7E2A44-5606-4FFA-9141-C04804E1A3C7?ingress=2&lp_context_asin=B0CT8VMN9T&visitId=90676b79-361a-449c-a4fb-c9b1464133c8&ref_=ast_bln',
  },
  {
    id: 14,
    type: 'video',
    category: 'brandstore',
    categoryLabel: 'Brand Stores',
    subCategory: 'Dunamiss Cosmetics',
    title: 'Visit Brand Store →',
    mediaSrc: '/abt-img/Dunamiss-Brand-Store.mp4',
    link: 'https://www.amazon.in/stores/Dunamiss/page/5B224EDB-CB50-4BC4-878F-7E6EBC143299?lp_asin=B0CYSWW5WG&ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto',
  },
  {
    id: 15,
    type: 'video',
    category: 'brandstore',
    categoryLabel: 'Brand Stores',
    subCategory: 'Gataca',
    title: 'Visit Brand Store →',
    mediaSrc: '/abt-img/Gataca-Brand-Store.mp4',
    link: 'https://www.amazon.in/stores/Gataca/page/68005995-7CB9-4E91-A161-46E1ADB4D433?lp_asin=B0FB8XHFDM&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto',
  },
  {
    id: 16,
    type: 'video',
    category: 'brandstore',
    categoryLabel: 'Brand Stores',
    subCategory: 'Rugsweave',
    title: 'Visit Brand Store →',
    mediaSrc: '/abt-img/Rugsweave-Brand-Store.mp4',
    link: 'https://www.amazon.com/stores/RUGSWEAVE/page/863B4733-3A67-416D-A0D1-48C9A6942FAA?lp_asin=B0DVPY98PS&ref_=ast_bln',
  },

  // 3. Web Development / Shopify Stores
  {
    id: 17,
    type: 'video',
    category: 'web',
    categoryLabel: 'Web Development',
    subCategory: 'Jaipur Fame',
    title: 'Visit Website →',
    mediaSrc: '/abt-img/Jaipur-Fame-web.mp4',
    link: 'https://jaipurfame.com/',
  },
  {
    id: 18,
    type: 'video',
    category: 'web',
    categoryLabel: 'Web Development',
    subCategory: 'Drinkbubz',
    title: 'Visit Website →',
    mediaSrc: '/abt-img/Bubz-web.mp4',
    link: 'https://drinkbubz.com/',
  },
  {
    id: 19,
    type: 'video',
    category: 'web',
    categoryLabel: 'Web Development',
    subCategory: 'Craftvix',
    title: 'Visit Website →',
    mediaSrc: '/abt-img/Craftvix-web.mp4',
    link: 'https://craftvix.com/',
  },
  {
    id: 20,
    type: 'video',
    category: 'web',
    categoryLabel: 'Web Development',
    subCategory: 'Kiyut',
    title: 'Visit Website →',
    mediaSrc: '/abt-img/Kiyut-Web.mp4',
    link: 'https://kiyut.co/',
  },
  {
    id: 21,
    type: 'video',
    category: 'web',
    categoryLabel: 'Web Development',
    subCategory: 'Fikarnot',
    title: 'Visit Website →',
    mediaSrc: '/abt-img/Fikarnot-Web.mp4',
    link: 'https://fikarnot.co/',
  },
  {
    id: 22,
    type: 'video',
    category: 'web',
    categoryLabel: 'Web Development',
    subCategory: 'styleonx',
    title: 'Visit Website →',
    mediaSrc: '/abt-img/Styleonx-web.mp4',
    link: 'https://www.styleonx.com/',
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20">
        
        {/* SECTION 1: Exact Hero Section with second-bg.png */}
        <section
          className="relative py-16 lg:py-24 bg-cover bg-center overflow-hidden border-b border-gray-100"
          style={{
            backgroundImage: "url('/abt-img/second-bg.png')",
            backgroundColor: '#ffffff',
          }}
        >
          {/* Ambient Lighting Blurs */}
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              Proven Case Studies &amp; Results
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1A1A1A] leading-[1.15] tracking-tight max-w-4xl mx-auto">
              Brands Don&apos;t <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">Just Grow Here,</span> They Dominate.
            </h1>

            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
              Every project in our portfolio reflects a data-driven commitment to scaling GMV, increasing Buy Box win rate, and creating sustainable marketplace leadership.
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-10 pt-8 border-t border-gray-200/60 max-w-3xl mx-auto">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#0066FF]">8+ Yrs</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider mt-1 font-semibold">Experience</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-gray-900">500+</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider mt-1 font-semibold">Projects Scaled</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-[#0066FF]">10X</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider mt-1 font-semibold">Avg ROI Growth</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 & 3: Filter Tabs & Portfolio Grid */}
        <section className="py-16 sm:py-20 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filter Header */}
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
                Our Work
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] mt-1">
                Featured Portfolio
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] mx-auto mt-3 rounded-full" />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Projects
              </button>
              
              <button
                onClick={() => setActiveFilter('amazon')}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                  activeFilter === 'amazon'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Amazon Store
              </button>

              <button
                onClick={() => setActiveFilter('brandstore')}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                  activeFilter === 'brandstore'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Brand Stores
              </button>

              <button
                onClick={() => setActiveFilter('web')}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                  activeFilter === 'web'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Shopify Website
              </button>
            </div>

            {/* Portfolio Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:border-blue-200 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Media Section (Image or Video) */}
                  <div className="overflow-hidden relative aspect-[16/10] bg-gray-100">
                    {item.type === 'image' ? (
                      <div
                        className="relative w-full h-full cursor-pointer overflow-hidden"
                        onClick={() => setLightboxImage(item.mediaSrc)}
                      >
                        <Image
                          src={item.mediaSrc}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <span className="p-3 bg-[#0066FF] rounded-full shadow-lg">
                            <ZoomIn className="w-5 h-5" />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer overflow-hidden"
                        onClick={() => setLightboxVideo(item.mediaSrc)}
                      >
                        <video
                          src={item.mediaSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <span className="p-3.5 bg-[#0066FF] rounded-full shadow-lg">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#0066FF] border border-blue-200/60 rounded-full text-xs font-bold">
                          {item.categoryLabel}
                        </span>
                        {item.subCategory && (
                          <span className="inline-block px-3.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold">
                            {item.subCategory}
                          </span>
                        )}
                      </div>

                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-2xl font-black text-gray-900 hover:text-[#0066FF] transition-colors mt-2 inline-flex items-center gap-2 group/link"
                        >
                          <span>{item.title}</span>
                          <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform text-[#0066FF]" />
                        </a>
                      ) : (
                        <h3 className="text-2xl font-black text-gray-900 mt-2">
                          {item.title}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 4: Blue/Navy CTA Banner */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#081325] via-[#0066FF] to-[#00C2FF] rounded-[40px] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-2xl pointer-events-none" />

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white relative z-10 leading-tight">
                Let&apos;s Build Your Next Success Story
              </h2>

              <p className="text-base sm:text-xl mt-6 opacity-95 max-w-3xl mx-auto leading-relaxed relative z-10 text-blue-100">
                From marketplace scaling to Shopify D2C domination, EcomVanta helps brands unlock exponential growth.
              </p>

              <div className="mt-8 relative z-10">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="px-9 py-4 rounded-full bg-white text-[#0066FF] font-black text-base hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
                >
                  Book Free Growth Audit
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox Modal for Images */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform p-2 cursor-pointer"
            aria-label="Close image popup"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center p-2">
            <img
              src={lightboxImage}
              alt="Enlarged screenshot"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Lightbox Modal for Videos */}
      {lightboxVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxVideo(null)}
        >
          <button
            onClick={() => setLightboxVideo(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform p-2 cursor-pointer"
            aria-label="Close video popup"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={lightboxVideo}
              controls
              autoPlay
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Portfolio Page" />
    </>
  );
}
