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
  ArrowRight
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
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-sm transition-all duration-300">
        {/* Top bar */}
        <div className="bg-[#f8f9fa] border-b border-gray-200 text-xs text-gray-700 py-1.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a 
                href={`mailto:${branding.email || 'info@arvian.in'}`} 
                className="flex items-center gap-2 hover:text-[#f71735] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f71735]" />
                <span>{branding.email || 'info@arvian.in'}</span>
              </a>
              <a 
                href={`tel:${branding.topbarPhone || '+9118008901413'}`} 
                className="flex items-center gap-2 hover:text-[#f71735] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#f71735]" />
                <span>Toll Free: {branding.tollFreePhone || '1800 890 1413'}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-3.5 h-3.5 text-[#f71735]" />
              <span>{branding.workingHours || '8:00 AM to 6:00 PM (Mon - Sat)'}</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img 
                src={branding.headerLogo || '/include/images/dark-logo.png'} 
                alt={branding.siteName || 'Arvian Business Solutions'} 
                className="h-14 w-auto object-contain max-w-[200px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-800">
              <Link href="/" className="hover:text-[#f71735] transition-colors py-2">
                Home
              </Link>

              {/* Services with Full Mega Menu */}
              <div className="relative menuItem py-6 cursor-pointer group">
                <span className="flex items-center gap-1.5 hover:text-[#f71735] transition-colors font-medium">
                  Services
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-[#f71735]" />
                </span>

                <div className="megaMenu fixed left-1/2 -translate-x-1/2 top-24 w-[92vw] max-w-[1240px] bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="grid grid-cols-4 gap-8">
                    {/* Col 1: Marketplace Management */}
                    <div className="border-r border-gray-100 pr-6">
                      <h3 className="text-xs font-bold text-[#ff0000] uppercase tracking-wider mb-5 pb-2 border-b border-red-50">
                        Marketplace Management
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/amazon-seller-account-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Amazon-logo.webp" alt="Amazon" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Amazon Account Mgmt</span>
                        </Link>
                        <Link href="/flipkart-account-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Flipkart-logo.jpg" alt="Flipkart" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Flipkart Account Mgmt</span>
                        </Link>
                        <Link href="/meesho-account-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Meesho Logo.webp" alt="Meesho" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Meesho Account Mgmt</span>
                        </Link>
                        <Link href="/shopify-store-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <ShoppingBag className="w-5 h-5 text-emerald-600" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Shopify Account Mgmt</span>
                        </Link>
                        <Link href="/myntra-account-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Store className="w-5 h-5 text-pink-600" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Myntra Account Mgmt</span>
                        </Link>
                        <Link href="/amazon-product-listing-catalogue-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Amazon-logo.webp" alt="Amazon" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Amazon Product Listing</span>
                        </Link>
                        <Link href="/etsy-account-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Etsy-logo.png" alt="Etsy" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Etsy Account Mgmt</span>
                        </Link>
                        <Link href="/ecommerce-product-listing-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Arvian_Listing_Logo.png" alt="Listing" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Ecommerce Upload Listing</span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Marketplace Onboarding */}
                    <div className="border-r border-gray-100 pr-6">
                      <h3 className="text-xs font-bold text-[#ff0000] uppercase tracking-wider mb-5 pb-2 border-b border-red-50">
                        Onboarding Services
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/blinkit-seller-account-management-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Blinkit-logo.svg" alt="Blinkit" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Blinkit Onboarding</span>
                        </Link>
                        <Link href="/swiggy-instamart-seller-account-management-and-onboarding" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/instamart-logo.png" alt="Instamart" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Swiggy Instamart</span>
                        </Link>
                        <Link href="/zepto-seller-onboarding-and-account-management-service" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/zepto-logo.webp" alt="Zepto" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Zepto Seller Onboarding</span>
                        </Link>
                        <Link href="/ajio-seller-onboarding-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Ajio logo.png" alt="Ajio" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Ajio Seller Onboarding</span>
                        </Link>
                        <Link href="/tata-cliq-seller-onboarding-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Tata-Cliq.webp" alt="Tata Cliq" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Tata Cliq Onboarding</span>
                        </Link>
                        <Link href="/nykaa-seller-onboarding-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/nykaa-logo.png" alt="Nykaa" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Nykaa Seller Onboarding</span>
                        </Link>
                        <Link href="/myntra-seller-onboarding-services" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Myntra-logo.png" alt="Myntra" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Myntra Onboarding</span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Digital Marketing */}
                    <div className="border-r border-gray-100 pr-6">
                      <h3 className="text-xs font-bold text-[#ff0000] uppercase tracking-wider mb-5 pb-2 border-b border-red-50">
                        Digital Marketing
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/seo-company-in-india" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/SEO_logo.png" alt="SEO" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Search Engine Optimization</span>
                        </Link>
                        <Link href="/meta-ads-management-company-in-india" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/meta-ads-logo.png" alt="Meta Ads" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Meta Ads Management</span>
                        </Link>
                        <Link href="/google-ads-management-company-in-india" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Google Ads logo.avif" alt="Google Ads" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Google Ads Management</span>
                        </Link>
                        <Link href="/performance-marketing-company-in-india" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Arvian_Performance_marketing_Logo.png" alt="Performance" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Performance Marketing</span>
                        </Link>
                        <Link href="/social-media-optimization-company-in-india" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/SMO_logo.jpg" alt="SMO" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Social Media Optimization</span>
                        </Link>
                        <Link href="/graphic-design-company-in-india" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/graphics-logo.webp" alt="Graphics" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Graphic Design</span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Web Development */}
                    <div>
                      <h3 className="text-xs font-bold text-[#ff0000] uppercase tracking-wider mb-5 pb-2 border-b border-red-50">
                        Web Development
                      </h3>
                      <div className="flex flex-col space-y-3 text-sm">
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/wordpress_logo.png" alt="WordPress" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">WordPress Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/shopify_logo.png" alt="Shopify" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Shopify Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/wocommerce-logo.svg" alt="WooCommerce" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">WooCommerce Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/Wix_logo.png" alt="Wix" width={24} height={24} className="w-5 h-5 object-contain" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Wix Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
                          <Image src="/header-img/custom-web.jpg" alt="Custom Web" width={24} height={24} className="w-5 h-5 object-contain rounded" />
                          <span className="group-hover/item:translate-x-1 transition-transform">Custom Web Development</span>
                        </Link>
                        <Link href="/ecommerce-service-provider-in-delhi" className="flex items-center gap-3 text-gray-700 hover:text-[#f71735] transition-colors group/item">
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
                <span className="flex items-center gap-1.5 hover:text-[#f71735] transition-colors font-medium">
                  Case Study
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-[#f71735]" />
                </span>

                <div className="megaMenu absolute left-0 top-18 w-64 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-50">
                  <div className="flex flex-col space-y-3 text-sm">
                    <Link href="/kay-kay-industries-amazon-case-study" className="text-gray-700 hover:text-[#f71735] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>Kay Kay Industries</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#f71735]" />
                    </Link>
                    <Link href="/gataca-performance-supplements-amazon-case-study" className="text-gray-700 hover:text-[#f71735] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>GATACA Supplements</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#f71735]" />
                    </Link>
                    <Link href="/sai-gallery-agarbatti-brand-amazon-case-study" className="text-gray-700 hover:text-[#f71735] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>Sai Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#f71735]" />
                    </Link>
                    <Link href="/nut-o-nut-dry-fruits-brand-amazon-case-study" className="text-gray-700 hover:text-[#f71735] transition-colors py-1 flex items-center justify-between group/cs">
                      <span>Nut o Nut</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cs:opacity-100 transition-opacity text-[#f71735]" />
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/about-us" className="hover:text-[#f71735] transition-colors py-2">
                About us
              </Link>
              <Link href="/portfolio" className="hover:text-[#f71735] transition-colors py-2">
                Portfolio
              </Link>
              <Link href="/blogs" className="hover:text-[#f71735] transition-colors py-2">
                Blog
              </Link>
              <Link href="/career" className="hover:text-[#f71735] transition-colors py-2">
                Careers
              </Link>
            </nav>

            {/* Contact Us Pulsing Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact-us"
                className="arvianPulseBtn text-white px-7 py-2.5 rounded-full font-semibold text-sm tracking-wide shadow-lg transition-all"
              >
                Contact us
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#f71735] focus:outline-none"
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
        <div className="flex justify-between items-center pb-6 border-b border-gray-100">
          <img 
            src={branding.headerLogo || '/include/images/dark-logo.png'} 
            alt={branding.siteName || 'Arvian Business Solutions'} 
            className="h-10 w-auto object-contain max-w-[160px]"
          />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-6 flex flex-col space-y-4 text-base font-medium text-gray-800">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#f71735] border-b border-gray-50"
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex justify-between items-center py-2 text-left font-medium hover:text-[#f71735]"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#f71735]' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="pl-3 mt-2 space-y-3 text-sm text-gray-600 max-h-72 overflow-y-auto pr-2">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider pt-2">Marketplace Management</p>
                <Link href="/amazon-seller-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Amazon Account Management</Link>
                <Link href="/flipkart-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Flipkart Account Management</Link>
                <Link href="/meesho-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Meesho Account Management</Link>
                <Link href="/shopify-store-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Shopify Account Management</Link>
                <Link href="/myntra-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Myntra Account Management</Link>
                <Link href="/amazon-product-listing-catalogue-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Amazon Product Listing</Link>
                
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider pt-2">Onboarding Services</p>
                <Link href="/blinkit-seller-account-management-services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Blinkit Onboarding</Link>
                <Link href="/swiggy-instamart-seller-account-management-and-onboarding" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Swiggy Instamart</Link>
                <Link href="/zepto-seller-onboarding-and-account-management-service" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Zepto Onboarding</Link>
                
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider pt-2">Digital Marketing</p>
                <Link href="/seo-company-in-india" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Search Engine Optimization</Link>
                <Link href="/meta-ads-management-company-in-india" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Meta Ads Management</Link>
                <Link href="/google-ads-management-company-in-india" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Google Ads Management</Link>
              </div>
            )}
          </div>

          {/* Mobile Case Studies Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button 
              onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
              className="w-full flex justify-between items-center py-2 text-left font-medium hover:text-[#f71735]"
            >
              <span>Case Studies</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCaseStudiesOpen ? 'rotate-180 text-[#f71735]' : ''}`} />
            </button>

            {mobileCaseStudiesOpen && (
              <div className="pl-3 mt-2 space-y-2 text-sm text-gray-600">
                <Link href="/kay-kay-industries-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Kay Kay Industries</Link>
                <Link href="/gataca-performance-supplements-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">GATACA</Link>
                <Link href="/sai-gallery-agarbatti-brand-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Sai Gallery</Link>
                <Link href="/nut-o-nut-dry-fruits-brand-amazon-case-study" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-red-600">Nut o Nut</Link>
              </div>
            )}
          </div>

          <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#f71735] border-b border-gray-50">
            About us
          </Link>
          <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#f71735] border-b border-gray-50">
            Portfolio
          </Link>
          <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#f71735] border-b border-gray-50">
            Blog
          </Link>
          <Link href="/career" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#f71735] border-b border-gray-50">
            Careers
          </Link>

          <div className="pt-4">
            <Link 
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="arvianPulseBtn block text-center text-white py-3 rounded-xl font-bold shadow-lg"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
