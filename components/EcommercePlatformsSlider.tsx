'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PlatformLogo {
  name: string;
  logo: string;
  href: string;
  width?: number;
  height?: number;
}

const ECOMMERCE_PLATFORMS: PlatformLogo[] = [
  { name: 'Pepperfry', logo: '/ecommerce-logos/pepperfry.svg', href: '/contact-us' },
  { name: 'Tata 1mg', logo: '/ecommerce-logos/tata-1mg.svg', href: '/contact-us' },
  { name: 'FirstCry', logo: '/ecommerce-logos/firstcry.svg', href: '/contact-us' },
  { name: 'Amazon', logo: '/ecommerce-logos/amazon.svg', href: '/amazon-seller-account-management-services' },
  { name: 'Flipkart', logo: '/ecommerce-logos/flipkart.svg', href: '/flipkart-account-management-services' },
  { name: 'Myntra', logo: '/ecommerce-logos/myntra.svg', href: '/myntra-account-management-services' },
  { name: 'Nykaa', logo: '/ecommerce-logos/nykaa.svg', href: '/nykaa-seller-onboarding-services' },
  { name: 'Blinkit', logo: '/ecommerce-logos/blinkit.svg', href: '/blinkit-seller-account-management-services' },
  { name: 'Zepto', logo: '/ecommerce-logos/zepto.svg', href: '/zepto-seller-onboarding-and-account-management-service' },
  { name: 'Swiggy Instamart', logo: '/ecommerce-logos/swiggy-instamart.svg', href: '/swiggy-instamart-seller-account-management-and-onboarding' },
  { name: 'Meesho', logo: '/ecommerce-logos/meesho.svg', href: '/meesho-account-management-services' },
  { name: 'Ajio', logo: '/ecommerce-logos/ajio.svg', href: '/ajio-seller-onboarding-services' },
  { name: 'Tata CLiQ', logo: '/ecommerce-logos/tata-cliq.svg', href: '/tata-cliq-seller-onboarding-services' },
  { name: 'BigBasket', logo: '/ecommerce-logos/bigbasket.svg', href: '/contact-us' },
  { name: 'JioMart', logo: '/ecommerce-logos/jiomart.svg', href: '/contact-us' },
];

export default function EcommercePlatformsSlider() {
  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 mb-2">
          — Multi-Platform Growth
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Our E-Commerce Platforms
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-medium">
          Scale your products across India’s leading marketplaces, fashion destinations & 10-minute quick commerce apps.
        </p>
      </div>

      {/* Infinite Moving Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee-reverse gap-5 sm:gap-6 px-4">
          {/* First Set */}
          {ECOMMERCE_PLATFORMS.map((platform, idx) => (
            <Link
              key={`plat-1-${idx}`}
              href={platform.href}
              className="h-20 sm:h-24 w-48 sm:w-56 flex items-center justify-center px-6 py-4 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#0066FF]/40 hover:scale-105 transition-all duration-300 flex-shrink-0 group cursor-pointer"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="max-h-12 max-w-[170px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}

          {/* Duplicate Set for Seamless Loop */}
          {ECOMMERCE_PLATFORMS.map((platform, idx) => (
            <Link
              key={`plat-2-${idx}`}
              href={platform.href}
              className="h-20 sm:h-24 w-48 sm:w-56 flex items-center justify-center px-6 py-4 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#0066FF]/40 hover:scale-105 transition-all duration-300 flex-shrink-0 group cursor-pointer"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="max-h-12 max-w-[170px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
