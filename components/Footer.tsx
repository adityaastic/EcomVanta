'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/useCmsContent';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUp
} from 'lucide-react';

export default function Footer() {
  const { content } = useCmsContent();
  const branding = content.branding;
  const contactFooter = content.contactFooter;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#0A0A24] text-white pt-16 pb-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f71735]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7000ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img 
                src={branding.footerLogo || branding.darkLogo || '/include/images/light-logo.png'} 
                alt={branding.siteName || 'Arvian Business Solutions'} 
                className="h-14 w-auto object-contain max-w-[200px]"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {contactFooter.footerAboutText || 'Arvian Business Solutions is one of the top e-commerce service providers with 8+ years of experience. We assist companies in growing their businesses online through professional services for Amazon, Flipkart, Meesho, Blinkit, Zepto, Jiomart, Nykaa, and Myntra.'}
            </p>
            
            {/* Social Icons (SVGs) */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={branding.socialLinks?.facebook || 'https://www.facebook.com/ArvianBusinessSolutions/'} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#f71735] hover:border-[#f71735] transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href={branding.socialLinks?.twitter || 'https://twitter.com/ArvianSolutions'} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#f71735] hover:border-[#f71735] transition-all duration-300 shadow-sm"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href={branding.socialLinks?.instagram || 'https://www.instagram.com/arvian_ecommerce/'} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#f71735] hover:border-[#f71735] transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a 
                href={branding.socialLinks?.linkedin || 'https://www.linkedin.com/company/arvian-business-solutions'} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#f71735] hover:border-[#f71735] transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="https://in.pinterest.com/arvianbusinesssolutions_/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#f71735] hover:border-[#f71735] transition-all duration-300 shadow-sm"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.057.238-.19.288-.438.172-1.637-.762-2.66-3.155-2.66-5.079 0-4.135 3.004-7.935 8.667-7.935 4.549 0 8.087 3.242 8.087 7.578 0 4.521-2.85 8.16-6.806 8.16-1.329 0-2.578-.69-3.006-1.506l-.818 3.121c-.296 1.143-1.099 2.574-1.637 3.448 1.196.368 2.463.567 3.78.567 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: E-Commerce Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-[#f71735]/40 pb-2 inline-block">
              E-Commerce Services
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/amazon-seller-account-management-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Amazon Account Management
                </Link>
              </li>
              <li>
                <Link href="/flipkart-account-management-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Flipkart Account Management
                </Link>
              </li>
              <li>
                <Link href="/blinkit-seller-account-management-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Blinkit Account Management
                </Link>
              </li>
              <li>
                <Link href="/meesho-account-management-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Meesho Account Management
                </Link>
              </li>
              <li>
                <Link href="/shopify-store-management-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Shopify Account Management
                </Link>
              </li>
              <li>
                <Link href="/myntra-account-management-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Myntra Account Management
                </Link>
              </li>
              <li>
                <Link href="/amazon-product-listing-catalogue-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Amazon Product Listing
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-product-listing-services" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Ecommerce Product Upload Listing
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-service-provider-in-delhi" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform font-medium text-white">
                  Delhi E-Commerce Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Cities & Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-[#f71735]/40 pb-2 inline-block">
              Ecommerce In Cities
            </h3>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li>
                <Link href="/ecommerce-service-provider-in-delhi" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-service-provider-in-surat" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Surat
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-service-provider-in-meerut" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Meerut
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-service-provider-in-kolkata" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Kolkata
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-service-provider-in-ludhiana" className="hover:text-[#f71735] hover:translate-x-1 inline-block transition-transform">
                  Ludhiana
                </Link>
              </li>
            </ul>

            <h4 className="text-sm font-bold uppercase tracking-wider text-[#f71735] mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about-us" className="hover:text-[#f71735] transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#f71735] transition-colors">Portfolio</Link></li>
              <li><Link href="/blogs" className="hover:text-[#f71735] transition-colors">Blog</Link></li>
              <li><Link href="/career" className="hover:text-[#f71735] transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-[#f71735]/40 pb-2 inline-block">
              Contact Us
            </h3>
            
            <div className="flex items-start gap-3.5 text-sm text-gray-300">
              <MapPin className="w-5 h-5 text-[#f71735] flex-shrink-0 mt-1" />
              <p className="leading-relaxed">
                {contactFooter.officeAddress || 'Arvian Business Solutions, 3rd Floor, Tower B, Sector 62, Noida, NCR, India'}
              </p>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-gray-300">
              <Mail className="w-5 h-5 text-[#f71735] flex-shrink-0" />
              <a href={`mailto:${contactFooter.supportEmail || 'info@arvian.in'}`} className="hover:text-[#f71735] transition-colors">
                {contactFooter.supportEmail || 'info@arvian.in'}
              </a>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-gray-300">
              <Phone className="w-5 h-5 text-[#f71735] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Toll Free</p>
                <a href={`tel:${branding.topbarPhone || '+9118008901413'}`} className="font-semibold hover:text-[#f71735] transition-colors">
                  {branding.tollFreePhone || '1800 890 1413'}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-gray-300">
              <Phone className="w-5 h-5 text-[#f71735] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Direct Support</p>
                <a href={`tel:${contactFooter.contactPhone || '+916377709027'}`} className="font-semibold hover:text-[#f71735] transition-colors">
                  {contactFooter.contactPhone || '+91 6377709027'}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>
            {contactFooter.copyrightText || `Copyright © 2020-${new Date().getFullYear()} Arvian Business Solutions. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[#f71735] text-white flex items-center justify-center shadow-2xl hover:bg-[#cc0000] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
