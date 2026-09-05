'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenPopup: () => void;
  title?: string;
  description?: string;
}

export default function HeroSection({
  onOpenPopup,
  title = "Powering Brands. Scaling E-commerce Across All Marketplaces",
  description = "Your all-in-one marketplace growth partner for Amazon, Flipkart, Meesho, Myntra, Blinkit, and Brand D2C. We manage listings, advertising campaigns, catalogue optimizations, and daily operations to scale your revenues.",
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      src: '/home-img/Amazon-left-img (1).webp',
      alt: 'Amazon Seller Account Management',
    },
    {
      src: '/home-img/Flipkart-left-banner.webp',
      alt: 'Flipkart Account Management Services',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 overflow-hidden border-b border-slate-100">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066FF] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Dedicated E-commerce Scaling Partner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E36] leading-[1.18] tracking-tight">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPopup}
                className="book-botton group"
                id="openPopupBtn"
              >
                <span>Book Free Audit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200">
                <span className="flex text-amber-400 text-sm">★★★★★</span>
                <span className="font-bold text-slate-900">5.0 Star Rating</span>
                <span className="text-slate-400">|</span>
                <span className="text-blue-600 font-semibold">100+ Brands Scaled</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="p-3 rounded-2xl bg-white border border-blue-100 shadow-xs">
                <p className="text-2xl font-black text-[#0066FF]">8+ Yrs</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">E-com Expertise</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-blue-100 shadow-xs">
                <p className="text-2xl font-black text-[#0B1E36]">500+</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Brands Handled</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-cyan-100 shadow-xs">
                <p className="text-2xl font-black text-cyan-600">10X</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Average Growth</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image Carousel with Floating Circle */}
          <div className="lg:col-span-6 relative">
            {/* Animated Floating Circle Behind */}
            <div className="absolute -top-6 -left-6 w-full h-full pointer-events-none animate-float hidden sm:block">
              <Image
                src="/circle.png"
                alt="Decoration"
                width={500}
                height={500}
                className="w-full h-full object-contain opacity-40"
              />
            </div>

            {/* Carousel Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <div className="relative aspect-[4/3] w-full">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-contain p-2"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === index ? 'w-8 bg-[#0066FF]' : 'bg-slate-300'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

