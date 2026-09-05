'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface PlatformItem {
  title: string;
  link: string;
  content: string;
}

const PLATFORMS: PlatformItem[] = [
  {
    title: 'Amazon Seller Services',
    link: '/amazon-seller-account-management-services',
    content:
      'EcomVanta helps Amazon sellers scale their brand revenues and marketplace market share. Our certified team offers end-to-end account setup, SEO listing optimization, PPC advertising management, and A+ Brand Store development for exponential return on ad spend.',
  },
  {
    title: 'Flipkart Store Management',
    link: '/flipkart-account-management-services',
    content:
      'EcomVanta specializes in scaling Flipkart seller accounts. We drive product discoverability, optimize catalog rankings, manage Big Billion Days campaigns, and safeguard account health standards for uninterrupted sales growth.',
  },
  {
    title: 'Myntra & Fashion Growth',
    link: '/myntra-account-management-services',
    content:
      'EcomVanta empowers fashion and apparel brands to thrive on Myntra. We create captivating visual catalogues, strategic seasonal promotions, and review management workflows to build long-term customer loyalty.',
  },
  {
    title: 'Shopify Store Management',
    link: '/shopify-store-management-services',
    content:
      'EcomVanta delivers full-stack Shopify D2C store management solutions. From bespoke UI storefront design to high-converting Meta/Google ad funnels and checkout rate optimization, we build high-margin direct-to-consumer businesses.',
  },
];

export default function PlatformServices() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-3">
            Multi-Platform Mastery
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E36] tracking-tight">
            Platform-Specific Solutions by EcomVanta
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Our specialized multi-channel management enables direct seller accounts and marketplace brands to achieve sustained profitability and market leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Expandable List */}
          <div className="lg:col-span-6 space-y-4">
            {PLATFORMS.map((platform, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={platform.title}
                  className={`p-6 rounded-3xl border transition-all duration-300 ${
                    isExpanded 
                      ? 'border-blue-300 bg-blue-50/20 shadow-md shadow-blue-500/5' 
                      : 'border-slate-200 hover:border-blue-300 bg-white shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={platform.link}
                      className="text-lg font-bold text-[#0B1E36] hover:text-[#0066FF] flex items-center gap-2 transition-colors group"
                    >
                      <span>{platform.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                    </Link>

                    <button
                      onClick={() => toggleExpand(idx)}
                      className="px-4 py-1.5 text-xs font-bold rounded-full bg-blue-50 text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all cursor-pointer shadow-xs"
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed animate-in fade-in-50 duration-200">
                      <p>{platform.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Feature Banner with Custom Rounded Corner */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-blue-50 via-sky-50 to-cyan-50 p-6 rounded-3xl sm:rounded-tr-[120px] shadow-xl border border-blue-100 flex items-center justify-center">
              <Image
                src="/home-img/Amazon-left-img (1).webp"
                alt="EcomVanta Marketplace Platform Services"
                width={480}
                height={480}
                className="w-full h-full object-contain rounded-2xl sm:rounded-tr-[100px]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

