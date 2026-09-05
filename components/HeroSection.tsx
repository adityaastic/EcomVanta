'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenPopup: () => void;
  title?: string;
  description?: string;
}

export default function HeroSection({
  onOpenPopup,
  title = "E-Commerce Service Provider in Delhi",
  description = "We are a one-stop eCommerce solution provider in Delhi, offering complete listings, product optimisation & order management to boost your online business.",
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      src: '/home-img/Amazon-left-img (1).webp',
      alt: 'Amazon Seller Account Management Delhi',
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
    <section className="relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-white via-white to-[#FFFFED] overflow-hidden border-b border-gray-100">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#f71735] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified Marketplace Partner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-[1.2] tracking-tight">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPopup}
                className="book-botton group"
                id="openPopupBtn"
              >
                <span>Book Now</span>
                <Image
                  src="/Arvian-button-arrow.png"
                  alt="Arrow"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 object-contain"
                />
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex text-amber-500 text-sm">★★★★★</span>
                <span className="font-semibold text-gray-800">5.0 Rating</span>
                <span>(72+ Verified Reviews)</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80">
              <div>
                <p className="text-2xl font-extrabold text-[#f71735]">8+ Yrs</p>
                <p className="text-xs text-gray-600">Industry Experience</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#1A1A1A]">500+</p>
                <p className="text-xs text-gray-600">Brands Scaled</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#f71735]">10X</p>
                <p className="text-xs text-gray-600">Average ROI Growth</p>
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
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
                      currentSlide === index ? 'w-8 bg-[#f71735]' : 'bg-gray-400/60'
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
