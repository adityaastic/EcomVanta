'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  name: string;
  initial: string;
  avatarBg?: string;
  avatarImg?: string;
  stars: number;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: 'MAHENDRA SHARMA',
    initial: 'M',
    avatarBg: 'rgb(157, 117, 250)',
    stars: 5,
    text: 'Best ecommerce handling services and very humble and knowledgeable team mm',
  },
  {
    name: 'Sandeep Gupta',
    initial: 'S',
    avatarBg: 'rgb(252, 188, 93)',
    stars: 5,
    text: 'Best services for e-commerce account handling. Especially Amazon account management. Staff is very knowledgeable and humble.',
  },
  {
    name: 'Rinki Kumari',
    initial: 'R',
    avatarBg: 'rgb(185, 187, 63)',
    stars: 4,
    text: 'Amazon account management services grateful',
  },
  {
    name: 'Bhavishya Rohilla',
    initial: 'B',
    avatarBg: 'rgb(117, 117, 250)',
    stars: 5,
    text: "Amazon account management's service",
  },
  {
    name: 'hemant jangid',
    initial: 'H',
    avatarBg: 'rgb(252, 188, 93)',
    stars: 5,
    text: 'Thanks for increase my sales',
  },
  {
    name: 'Ankit',
    initial: 'A',
    avatarImg: '/images/ankit-avatar.png',
    stars: 5,
    text: 'Best Amazon account management services. Thanks for increase my sales',
  },
  {
    name: 'Raju Kumar Kumawat',
    initial: 'R',
    avatarBg: 'rgb(157, 117, 250)',
    stars: 5,
    text: 'Best flipkart seller services.',
  },
];

export default function ClientReviewsSlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visibleReviews: Review[] = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (startIndex + i) % REVIEWS.length;
    visibleReviews.push(REVIEWS[index]);
  }

  return (
    <section className="py-16 bg-[#ffffff] border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching original .manual-add-review-header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2937]">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Carousel Container with Controls */}
        <div className="relative px-2 sm:px-8">
          <button
            onClick={handlePrev}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#0066FF] hover:text-white transition-all cursor-pointer hover:border-[#0066FF]"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#0066FF] hover:text-white transition-all cursor-pointer hover:border-[#0066FF]"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review, idx) => (
              <div
                key={`${review.name}-${idx}`}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between min-h-[220px] hover:shadow-xl hover:border-blue-100 transition-all"
              >
                <div>
                  {/* Avatar & Author */}
                  <div className="flex items-center gap-4 mb-2">
                    {review.avatarImg ? (
                      <Image
                        src={review.avatarImg}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover shadow-xs"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0"
                        style={{ backgroundColor: review.avatarBg }}
                      >
                        {review.initial}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900 text-sm tracking-wide">{review.name}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="text-amber-500 text-sm tracking-widest mb-2 font-black">
                    {[...Array(review.stars)].map((_, s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-[#374151] text-sm leading-relaxed line-clamp-3">
                    {review.text}
                  </p>
                </div>

                {/* Footer with Google Icon */}
                <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/images/googleg_32dp.png"
                      alt="Google"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs">
                      Posted on{' '}
                      <a
                        href="https://www.google.com/search?q=ecomvanta"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-800 font-semibold hover:underline"
                      >
                        Google
                      </a>
                    </span>
                  </div>
                  <a
                    href="https://www.google.com/search?q=ecomvanta"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0066FF] font-semibold hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Read All Reviews Button matching .manual-add-review-btn-read-all */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?q=ecomvanta"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white font-bold text-sm hover:from-[#0052cc] hover:to-[#003d99] transition-all shadow-md shadow-blue-500/20"
          >
            Read all reviews
          </a>
        </div>

      </div>
    </section>
  );
}
