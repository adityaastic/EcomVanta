'use client';

import React from 'react';
import { useCmsContent } from '@/lib/useCmsContent';

export default function BrandLogoSlider() {
  const { content } = useCmsContent();
  const brandLogos = (content?.homepage?.brandLogos || []).filter(
    (b: any) => (b?.logo || b?.src) && String(b?.logo || b?.src).trim().length > 0
  );

  if (brandLogos.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-4">
          {content?.homepage?.brandLogosHeading || 'We Provide Services For These Leading Brands'}
        </h2>

        {/* Continuous Scrolling Marquee */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="flex w-max animate-marquee gap-4">
            {/* First Set */}
            {brandLogos.map((brand: any, idx: number) => (
              <div
                key={`brand-1-${brand.id || idx}`}
                className="w-48 h-24 sm:w-56 sm:h-28 flex items-center justify-center px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:border-[#0066FF]/30 hover:scale-105 flex-shrink-0"
              >
                <img
                  src={brand.logo || brand.src}
                  alt={brand.name || brand.alt || 'Brand Logo'}
                  className="max-h-20 sm:max-h-24 max-w-full w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {brandLogos.map((brand: any, idx: number) => (
              <div
                key={`brand-2-${brand.id || idx}`}
                className="w-48 h-24 sm:w-56 sm:h-28 flex items-center justify-center px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:border-[#0066FF]/30 hover:scale-105 flex-shrink-0"
              >
                <img
                  src={brand.logo || brand.src}
                  alt={brand.name || brand.alt || 'Brand Logo'}
                  className="max-h-20 sm:max-h-24 max-w-full w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
