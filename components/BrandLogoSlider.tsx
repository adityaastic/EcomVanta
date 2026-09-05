'use client';

import React from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/useCmsContent';

const DEFAULT_LOGOS = [
  { logo: '/Rasaveda.png', name: 'Rasaveda' },
  { logo: '/Ninety Two.png', name: 'Ninety Two' },
  { logo: '/Forest Found.png', name: 'Forest Found' },
  { logo: '/Deshi.png', name: 'Deshi' },
  { logo: '/Bubz.png', name: 'Bubz' },
  { logo: '/Snackes .png', name: 'Snackes' },
  { logo: '/Nufyt.png', name: 'Nufyt' },
  { logo: '/Aadil.png', name: 'Aadil' },
  { logo: '/Krishna logo .png', name: 'Krishna' },
  { logo: '/RPURE logo .png', name: 'RPURE' },
  { logo: '/SS logo .png', name: 'SS' },
  { logo: '/home-img/Lenskart-logo.webp', name: 'Lenskart' },
  { logo: '/Arvian-client-3.webp', name: 'Renee Cosmetics' },
  { logo: '/home-img/Skin-logo.webp', name: 'Skin Elements' },
  { logo: '/Arvian-client-2.webp', name: 'Pee Safe' },
  { logo: '/home-img/Ustra-logo.webp', name: 'Ustraa' },
  { logo: '/home-img/fnp-logo.webp', name: 'Ferns N Petals' },
  { logo: '/Arvian-client-4.webp', name: 'Plantex' },
  { logo: '/home-img/Happilo-logo.webp', name: 'Happilo' },
  { logo: '/Arvian-client-1.webp', name: 'Forty Wings' },
  { logo: '/Arvian-client-5.webp', name: 'Cushionblue' },
  { logo: '/home-img/ankit-international-logo.webp', name: 'Ankit International' },
];

export default function BrandLogoSlider() {
  const { content } = useCmsContent();
  const brandLogos = content?.homepage?.brandLogos?.length ? content.homepage.brandLogos : DEFAULT_LOGOS;

  return (
    <section className="py-14 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#1A1A1A] mb-10">
          We Provide Services For These Leading Brands
        </h2>

        {/* Continuous Scrolling Marquee */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex w-max animate-marquee gap-6">
            {/* First Set */}
            {brandLogos.map((brand: any, idx: number) => (
              <div
                key={`brand-1-${idx}`}
                className="w-48 h-24 sm:w-56 sm:h-28 flex items-center justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 hover:border-[#f71735]/30 hover:scale-105 flex-shrink-0"
              >
                <img
                  src={brand.logo || brand.src}
                  alt={brand.name || brand.alt}
                  className="max-h-16 max-w-[160px] w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {brandLogos.map((brand: any, idx: number) => (
              <div
                key={`brand-2-${idx}`}
                className="w-48 h-24 sm:w-56 sm:h-28 flex items-center justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 hover:border-[#f71735]/30 hover:scale-105 flex-shrink-0"
              >
                <img
                  src={brand.logo || brand.src}
                  alt={brand.name || brand.alt}
                  className="max-h-16 max-w-[160px] w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
