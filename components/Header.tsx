'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/useCmsContent';
import { 
  Mail, 
  Phone, 
  Clock, 
  ChevronDown, 
  Menu, 
  X, 
  Store, 
  ShoppingBag,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onOpenPopup?: () => void;
}

export default function Header({ onOpenPopup }: HeaderProps) {
  const { content } = useCmsContent();
  const branding = content.branding;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,102,255,0.06)] border-b border-slate-100 transition-all duration-300">
        {/* Top bar */}
        <div className="bg-[#081325] text-xs text-slate-300 py-2 hidden md:block border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a 
                href={`mailto:${branding.email || 'ecomvanta40@gmail.com'}`} 
                className="flex items-center gap-2 hover:text-[#00C2FF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span className="font-medium">{branding.email || 'ecomvanta40@gmail.com'}</span>
              </a>
              <a 
                href={`tel:${branding.topbarPhone || '+918787249407'}`} 
                className="flex items-center gap-2 hover:text-[#00C2FF] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span className="font-medium">Direct Support: {branding.tollFreePhone || '+91 878 724 9407'}</span>
              </a>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span>{branding.workingHours || '9:00 AM to 7:00 PM (Mon - Sat)'}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 text-[11px] font-semibold border border-cyan-500/20">
                <Sparkles className="w-3 h-3" /> E-commerce Growth Partner
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center py-2">
              <img 
                src={branding.headerLogo || '/images/ecomvanta-logo.png'} 
                alt={branding.siteName || 'EcomVanta'} 
                className="h-14 w-auto object-contain max-w-[210px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-800">
              <Link href="/" className="hover:text-[#0066FF] transition-colors py-2">
                Home
              </Link>

              {/* Services with Full Mega Menu */}
              <div className="relative menuItem py-6 cursor-pointer group">
                <span className="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors font-semibold">
                  Services
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400 group-hover:text-[#0066FF]" />
                </span>

                <div className="megaMenu fixed left-1/2 -translate-x-1/2 top-24 w-[92vw] max-w-[1240px] bg-white p-8 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,102,255,0.18)] border border-blue-100 z-50">
                  <div className="grid grid-cols-4 gap-8">
                    {/* Col 1: Marketplace Management */}
                    <div className="border-r border-slate-100 pr-6">
                      <h3 className="text-xs font-black text-[#0066FF] uppercase tracking-wider mb-5 pb-2 border-b border-blue-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                        Marketplace Management
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/amazon-seller-account-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Amazon-logo.webp" alt="Amazon" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Amazon Account Mgmt</span>
                        </Link>
                        <Link href="/flipkart-account-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Flipkart-logo.jpg" alt="Flipkart" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Flipkart Account Mgmt</span>
                        </Link>
                        <Link href="/meesho-account-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Meesho Logo.webp" alt="Meesho" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Meesho Account Mgmt</span>
                        </Link>
                        <Link href="/shopify-store-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <ShoppingBag className="w-5 h-5 text-emerald-600" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Shopify Account Mgmt</span>
                        </Link>
                        <Link href="/myntra-account-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Store className="w-5 h-5 text-pink-600" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Myntra Account Mgmt</span>
                        </Link>
                        <Link href="/amazon-product-listing-catalogue-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Amazon-logo.webp" alt="Amazon" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Amazon Product Listing</span>
                        </Link>
                        <Link href="/etsy-account-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Etsy-logo.png" alt="Etsy" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Etsy Account Mgmt</span>
                        </Link>
                        <Link href="/ecommerce-product-listing-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Arvian_Listing_Logo.png" alt="Listing" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Ecommerce Cataloging</span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Marketplace Onboarding */}
                    <div className="border-r border-slate-100 pr-6">
                      <h3 className="text-xs font-black text-[#0066FF] uppercase tracking-wider mb-5 pb-2 border-b border-blue-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00C2FF]"></span>
                        Quick Commerce & Onboarding
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/blinkit-seller-account-management-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Blinkit-logo.svg" alt="Blinkit" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Blinkit Onboarding</span>
                        </Link>
                        <Link href="/swiggy-instamart-seller-account-management-and-onboarding" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/instamart-logo.png" alt="Instamart" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Swiggy Instamart</span>
                        </Link>
                        <Link href="/zepto-seller-onboarding-and-account-management-service" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/zepto-logo.webp" alt="Zepto" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Zepto Seller Onboarding</span>
                        </Link>
                        <Link href="/ajio-seller-onboarding-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Ajio logo.png" alt="Ajio" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Ajio Seller Onboarding</span>
                        </Link>
                        <Link href="/tata-cliq-seller-onboarding-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Tata-Cliq.webp" alt="Tata Cliq" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Tata Cliq Onboarding</span>
                        </Link>
                        <Link href="/nykaa-seller-onboarding-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/nykaa-logo.png" alt="Nykaa" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Nykaa Seller Onboarding</span>
                        </Link>
                        <Link href="/myntra-seller-onboarding-services" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Myntra-logo.png" alt="Myntra" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Myntra Onboarding</span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Digital Marketing */}
                    <div className="border-r border-slate-100 pr-6">
                      <h3 className="text-xs font-black text-[#0066FF] uppercase tracking-wider mb-5 pb-2 border-b border-blue-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Ads & Performance Growth
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/seo-company-in-india" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/SEO_logo.png" alt="SEO" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Search Engine Optimization</span>
                        </Link>
                        <Link href="/meta-ads-management-company-in-india" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/meta-ads-logo.png" alt="Meta Ads" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Meta Ads Management</span>
                        </Link>
                        <Link href="/google-ads-management-company-in-india" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Google Ads logo.avif" alt="Google Ads" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Google Ads Management</span>
                        </Link>
                        <Link href="/performance-marketing-company-in-india" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Arvian_Performance_marketing_Logo.png" alt="Performance" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Performance Marketing</span>
                        </Link>
                        <Link href="/social-media-optimization-company-in-india" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/SMO_logo.jpg" alt="SMO" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Social Media Optimization</span>
                        </Link>
                        <Link href="/graphic-design-company-in-india" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/graphics-logo.webp" alt="Graphics" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Graphic & A+ Design</span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Web Development */}
                    <div>
                      <h3 className="text-xs font-black text-[#0066FF] uppercase tracking-wider mb-5 pb-2 border-b border-blue-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        Brand Web Development
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/wordpress_logo.png" alt="WordPress" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">WordPress Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/shopify_logo.png" alt="Shopify" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Shopify Brand Stores</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/wocommerce-logo.svg" alt="WooCommerce" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">WooCommerce Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/Wix_logo.png" alt="Wix" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Wix Ecommerce Setup</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/custom-web.jpg" alt="Custom Web" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Custom Next.js & React</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-slate-700 hover:text-[#0066FF] transition-colors group/item">
                          <Image src="/header-img/web-maint.jpg" alt="Maintenance" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Website Maintenance</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study Dropdown */}
              <div className="relative menuItem py-6 cursor-pointer group">
                <span className="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors font-semibold">
                  Case Studies
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400 group-hover:text-[#0066FF]" />
                </span>

                <div className="megaMenu absolute left-0 top-18 w-64 bg-white p-5 rounded-2xl shadow-xl border border-blue-100 z-50">
                  <div className="flex flex-col space-y-3 text-sm">
                    <Link href="/kay-kay-industries-amazon-case-study" className="text-slate-700 hover:text-[#0066FF] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>Kay Kay Industries</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#0066FF]" />
                    </Link>
                    <Link href="/gataca-performance-supplements-amazon-case-study" className="text-slate-700 hover:text-[#0066FF] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>GATACA Supplements</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#0066FF]" />
                    </Link>
                    <Link href="/sai-gallery-agarbatti-brand-amazon-case-study" className="text-slate-700 hover:text-[#0066FF] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>Sai Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#0066FF]" />
                    </Link>
                    <Link href="/nut-o-nut-dry-fruits-brand-amazon-case-study" className="text-slate-700 hover:text-[#0066FF] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>Nut o Nut</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#0066FF]" />
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/about-us" className="hover:text-[#0066FF] transition-colors py-2">
                About us
              </Link>
              <Link href="/portfolio" className="hover:text-[#0066FF] transition-colors py-2">
                Portfolio
              </Link>
              <Link href="/blogs" className="hover:text-[#0066FF] transition-colors py-2">
                Blog
              </Link>
              <Link href="/career" className="hover:text-[#0066FF] transition-colors py-2">
                Careers
              </Link>
            </nav>

            {/* Contact Us Pulsing Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact-us"
                className="ecomvantaPulseBtn text-white px-7 py-3 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <span>Free Growth Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#0066FF] focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 backdrop-blur-xs"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[320px] max-w-[85vw] bg-white z-50 shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-6 border-b border-slate-100">
          <img 
            src={branding.headerLogo || '/images/ecomvanta-logo.png'} 
            alt={branding.siteName || 'EcomVanta'} 
            className="h-11 w-auto object-contain max-w-[170px]"
          />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-6 flex flex-col space-y-4 text-base font-semibold text-slate-800">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#0066FF] border-b border-slate-50"
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <div className="border-b border-slate-50 pb-2">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex justify-between items-center py-2 text-left font-semibold hover:text-[#0066FF]"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#0066FF]' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="pl-3 mt-2 space-y-3 text-sm text-slate-600 max-h-72 overflow-y-auto pr-2">
                <p className="text-xs font-bold text-[#0066FF] uppercase tracking-wider pt-2">Marketplace Management</p>
                <Link href="/amazon-seller-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Amazon Account Management</Link>
                <Link href="/flipkart-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Flipkart Account Management</Link>
                <Link href="/meesho-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Meesho Account Management</Link>
                <Link href="/shopify-store-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Shopify Account Management</Link>
                <Link href="/myntra-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Myntra Account Management</Link>
                <Link href="/amazon-product-listing-catalogue-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Amazon Product Listing</Link>
                
                <p className="text-xs font-bold text-[#0066FF] uppercase tracking-wider pt-2">Quick Commerce</p>
                <Link href="/blinkit-seller-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Blinkit Onboarding</Link>
                <Link href="/swiggy-instamart-seller-account-management-and-onboarding" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Swiggy Instamart</Link>
                <Link href="/zepto-seller-onboarding-and-account-management-service" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Zepto Onboarding</Link>
                
                <p className="text-xs font-bold text-[#0066FF] uppercase tracking-wider pt-2">Digital Marketing</p>
                <Link href="/seo-company-in-india" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Search Engine Optimization</Link>
                <Link href="/meta-ads-management-company-in-india" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Meta Ads Management</Link>
                <Link href="/google-ads-management-company-in-india" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Google Ads Management</Link>
              </div>
            )}
          </div>

          {/* Mobile Case Studies Accordion */}
          <div className="border-b border-slate-50 pb-2">
            <button 
              onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
              className="w-full flex justify-between items-center py-2 text-left font-semibold hover:text-[#0066FF]"
            >
              <span>Case Studies</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCaseStudiesOpen ? 'rotate-180 text-[#0066FF]' : ''}`} />
            </button>

            {mobileCaseStudiesOpen && (
              <div className="pl-3 mt-2 space-y-2 text-sm text-slate-600">
                <Link href="/kay-kay-industries-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Kay Kay Industries</Link>
                <Link href="/gataca-performance-supplements-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">GATACA</Link>
                <Link href="/sai-gallery-agarbatti-brand-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Sai Gallery</Link>
                <Link href="/nut-o-nut-dry-fruits-brand-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0066FF]">Nut o Nut</Link>
              </div>
            )}
          </div>

          <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#0066FF] border-b border-slate-50">
            About us
          </Link>
          <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#0066FF] border-b border-slate-50">
            Portfolio
          </Link>
          <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#0066FF] border-b border-slate-50">
            Blog
          </Link>
          <Link href="/career" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#0066FF] border-b border-slate-50">
            Careers
          </Link>

          <div className="pt-4">
            <Link 
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="ecomvantaPulseBtn block text-center text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/30"
            >
              Get Free Audit Call
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

