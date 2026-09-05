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
    question: "Can Arvian help my online business grow?",
    answer: "Yes, with lots of experience and wide ranges of services Arvian can help you to make relevant strategies for growing your business.",
  },
  {
    question: "How can Arvian help improve my product listings?",
    answer: "The Arvian team uses its skills to create product listings. They optimize these listings with SEO. This includes clear descriptions, quality images, and the right keywords. These strategies help increase visibility and engage customers.",
  },
  {
    question: "Does Arvian provide advertising services for e-commerce platforms?",
    answer: "Arvian makes and manages custom ads across various channels. This helps to increase product visibility and sales.",
  },
  {
    question: "Can Arvian assist with account health monitoring?",
    answer: "Arvian regularly checks account performance. This ensures compliance with platform guidelines and helps prevent suspensions. It also supports operational efficiency.",
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
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1A1A1A] mb-10">
          {title}
        </h2>

        <div className="space-y-4">
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 shadow-xs hover:border-[#f71735]/40"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-gray-900 text-base sm:text-lg bg-white hover:bg-gray-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#f71735] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 bg-gray-50/30 animate-in fade-in-50 duration-200">
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
