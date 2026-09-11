'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/useCmsContent';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUp,
  Sparkles,
  ShieldCheck
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
    <footer className="bg-[#07101E] text-white pt-16 pb-8 relative overflow-hidden border-t border-slate-800">
      {/* Background radial glow */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-5">
            <Link href="/" className="inline-block bg-white p-3.5 rounded-2xl shadow-xl shadow-blue-500/10 transition-transform duration-300 hover:scale-102">
              <img 
                src={branding.footerLogo || branding.darkLogo || '/images/ecomvanta-logo.png'} 
                alt={branding.siteName || 'EcomVanta'} 
                className="h-14 sm:h-16 md:h-18 w-auto object-contain max-w-[230px] sm:max-w-[260px]"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              {contactFooter.footerAboutText || 'EcomVanta is your dedicated marketplace growth partner from setup to sales. We scale eCommerce businesses across Amazon, Flipkart, Meesho, Blinkit, Zepto, Myntra, and Brand D2C Websites.'}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certified E-commerce Scaling Agency</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href={branding.socialLinks?.facebook || 'https://facebook.com/ecomvanta'} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href={branding.socialLinks?.twitter || 'https://twitter.com/ecomvanta'} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all duration-300 shadow-sm"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href={branding.socialLinks?.instagram || 'https://instagram.com/ecomvanta'} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a 
                href={branding.socialLinks?.linkedin || 'https://linkedin.com/company/ecomvanta'} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: E-Commerce Services */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 border-b border-blue-500/30 pb-2 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF]"></span>
              E-Commerce Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/amazon-seller-account-management-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Amazon Account Management
                </Link>
              </li>
              <li>
                <Link href="/flipkart-account-management-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Flipkart Account Management
                </Link>
              </li>
              <li>
                <Link href="/blinkit-seller-account-management-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Blinkit Quick Commerce
                </Link>
              </li>
              <li>
                <Link href="/meesho-account-management-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Meesho Account Management
                </Link>
              </li>
              <li>
                <Link href="/shopify-store-management-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Shopify Store Management
                </Link>
              </li>
              <li>
                <Link href="/myntra-account-management-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Myntra Account Management
                </Link>
              </li>
              <li>
                <Link href="/amazon-product-listing-catalogue-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Amazon Product Listing &amp; A+
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-product-listing-services" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">
                  Ecommerce Catalog Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 border-b border-blue-500/30 pb-2 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
              <li><Link href="/about-us" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">About EcomVanta</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">Success Portfolio</Link></li>
              <li><Link href="/blogs" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">E-commerce Insights Blog</Link></li>
              <li><Link href="/career" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">Careers &amp; Openings</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#00C2FF] hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Case Studies
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link href="/kay-kay-industries-amazon-case-study" className="hover:text-white">Kay Kay Industries</Link></li>
              <li><Link href="/gataca-performance-supplements-amazon-case-study" className="hover:text-white">GATACA Supplements</Link></li>
              <li><Link href="/sai-gallery-agarbatti-brand-amazon-case-study" className="hover:text-white">Sai Gallery</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-6 border-b border-blue-500/30 pb-2 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Connect With Us
            </h3>
            
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p className="leading-relaxed">
                {contactFooter.officeAddress || 'EcomVanta Business Solutions, New Delhi, India'}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <a href={`mailto:${contactFooter.supportEmail || 'ecomvanta40@gmail.com'}`} className="hover:text-cyan-300 transition-colors">
                {contactFooter.supportEmail || 'ecomvanta40@gmail.com'}
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Direct Support</p>
                <a href={`tel:${contactFooter.contactPhone || '+918787249407'}`} className="font-bold text-white hover:text-cyan-300 transition-colors">
                  {contactFooter.contactPhone || '+91 878 724 9407'}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C2FF] text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:brightness-110 transition-all"
              >
                Schedule Free Audit Call
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>
            {contactFooter.copyrightText || `Copyright © ${new Date().getFullYear()} EcomVanta. All rights reserved. Powering Brands. Scaling E-commerce.`}
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
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C2FF] text-white flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}

