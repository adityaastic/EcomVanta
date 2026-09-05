'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCmsContent } from '@/lib/useCmsContent';

interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Can EcomVanta help my online business scale revenue?",
    answer: "Yes! With years of marketplace mastery and a comprehensive suite of growth services, EcomVanta builds data-driven roadmaps to maximize GMV, improve margins, and scale brand visibility across Amazon, Flipkart, Blinkit, and Shopify.",
  },
  {
    question: "How does EcomVanta optimize product listings and conversion rates?",
    answer: "Our creative and SEO strategists completely revamp listing architecture with keyword-optimized copy, 3D infographic renders, lifestyle A+ content/EBC, and brand story modules designed to lift organic ranking and conversion rates.",
  },
  {
    question: "Does EcomVanta manage marketplace advertising (PPC/Performance Marketing)?",
    answer: "Yes, our PPC experts deploy AI-assisted bid management, sponsored product/brand/display campaigns, and off-marketplace meta ads to drive high-margin ROAS and capture competitor market share.",
  },
  {
    question: "How do you protect account health and prevent suspensions?",
    answer: "Our account directors proactively audit your seller account metrics 24/7, keeping defect rates, late shipment rates, and policy compliance at peak green health while resolving seller central cases instantly.",
  },
];

interface FaqAccordionProps {
  title?: string;
  faqs?: FaqItem[];
}

export default function FaqAccordion({
  title = "Frequently Asked Questions",
  faqs,
}: FaqAccordionProps) {
  const { content } = useCmsContent();
  const activeFaqs = faqs || (content?.homepage?.faqs?.length ? content.homepage.faqs : DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold text-[#0066FF] tracking-widest">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
            {title}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] mx-auto mt-3 rounded-full" />
        </div>

        <div className="space-y-4">
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-xs ${
                  isOpen
                    ? 'border-[#0066FF]/40 shadow-md shadow-blue-500/5 bg-blue-50/20'
                    : 'border-gray-200 hover:border-blue-200 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-gray-900 text-base sm:text-lg bg-transparent hover:bg-blue-50/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0066FF] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-blue-100/50 bg-white/60 animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
