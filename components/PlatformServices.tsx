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
      'Arvian Business Solutions helps Amazon sellers boost their performance on the platform. Our team offers account setup services and optimises product listings. We also manage advertising campaigns to boost traffic and improve sales. Our support staff helps companies create A+ content and build branded storefronts. This boosts customer loyalty. We help sellers with Fulfilment by Amazon (FBA) tasks. This improves their inventory and order management.',
  },
  {
    title: 'Flipkart Store Management',
    link: '/flipkart-account-management-services',
    content:
      'Arvian excels at managing Flipkart seller accounts. They offer tailored services that boost product visibility and sales. We help customers create better product listings. This boosts their visibility to potential buyers. Our team builds brand stores and runs successful ad campaigns. This helps get your products to the right audience. Our team keeps a close watch on account health. This ensures compliance with Flipkart policies and protects our business from interruptions.',
  },
  {
    title: 'Myntra Store Management',
    link: '/myntra-account-management-services',
    content:
      'Arvian helps businesses build their brands on Myntra. We make product listings that are highly optimised and have appealing descriptions. This attracts more customers. We create promotional strategies that increase product visibility for our clients. This helps them succeed in competitive markets. Arvian manages customer feedback and reviews. This helps them offer great service. Then, it builds brand loyalty and encourages repeat business.',
  },
  {
    title: 'Shopify Store Management',
    link: '/shopify-store-management-services',
    content:
      'Arvian provides Shopify store management solutions. These help businesses set up and manage their online retail operations. We help set up stores and offer design services. This way, we ensure a friendly shopping experience for customers. Our team uses marketing strategies to improve search engine results. We also create content marketing plans that drive website traffic. Arvian boosts Shopify store performance with integrated payment gateways and strong security features. It also offers detailed analytics that turn visitors into loyal customers.',
  },
];

export default function PlatformServices() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
            Platform-Specific Services We Offer in Delhi
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            Our expertise covers various e-commerce platforms that enable businesses to maximise their success. Our company specialises in delivering professional services across several distinct e-commerce platforms.
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
                  className="p-5 rounded-2xl border border-gray-200 hover:border-[#f71735]/40 transition-all bg-white shadow-xs"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={platform.link}
                      className="text-lg font-bold text-[#1A1A1A] hover:text-[#f71735] flex items-center gap-2 transition-colors group"
                    >
                      <span>{platform.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#f71735] transition-colors" />
                    </Link>

                    <button
                      onClick={() => toggleExpand(idx)}
                      className="px-3.5 py-1 text-xs font-semibold rounded-full bg-red-50 text-[#f71735] hover:bg-[#f71735] hover:text-white transition-all cursor-pointer"
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed animate-in fade-in-50 duration-200">
                      <p>{platform.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Feature Banner with Custom Rounded Corner */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-red-50 to-orange-50 p-4 rounded-2xl sm:rounded-tr-[120px] shadow-lg border border-gray-100 flex items-center justify-center">
              <Image
                src="/home-img/Amazon-left-img (1).webp"
                alt="E-Commerce Platforms Service Provider Delhi"
                width={480}
                height={480}
                className="w-full h-full object-contain rounded-xl sm:rounded-tr-[100px]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
