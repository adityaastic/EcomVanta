'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import ContactSection from '@/components/ContactSection';
import { useCmsContent } from '@/lib/useCmsContent';
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: number | string;
  title: string;
  category: string;
  image: string;
  author: string;
  date: string;
  link: string;
}

const ALL_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "eCommerce Account Management: What Does an Account Manager Actually Do?",
    category: "eCommerce",
    image: "/blog/images/ecom-into.png",
    author: "Arvind Ajmera",
    date: "August 31, 2026",
    link: "/contact-us",
  },
  {
    id: 2,
    title: "How to Sell on AJIO: Complete Seller Registration and Account Setup Guide",
    category: "Ajio",
    image: "/blog/images/ajio-into.png",
    author: "Arvind Ajmera",
    date: "August 22, 2026",
    link: "/contact-us",
  },
  {
    id: 3,
    title: "How to Sell on Myntra: Seller Onboarding Guide 2026",
    category: "Myntra",
    image: "/blog/images/Become a Myntra Seller.jpeg",
    author: "Arvind Ajmera",
    date: "August 11, 2026",
    link: "/contact-us",
  },
  {
    id: 4,
    title: "Top 20 Best-Selling Products on eCommerce Marketplaces During Rakhi in India",
    category: "Sell Online",
    image: "/blog/images/new-blogimag.jpg",
    author: "Arvind Ajmera",
    date: "August 04, 2026",
    link: "/contact-us",
  },
  {
    id: 5,
    title: "10 Amazon Selling Mistakes That Reduce Sales and Profits",
    category: "Amazon",
    image: "/blogs-img/10 Amazon Selling Mistakes That Reduce Sales and Profits.webp",
    author: "Arvind Ajmera",
    date: "July 23, 2026",
    link: "/contact-us",
  },
  {
    id: 6,
    title: "Blinkit Seller Onboarding Guide (2026): How to Sell on Blinkit Successfully",
    category: "Blinkit",
    image: "/blogs-img/Blinkit Seller Onboarding Guide (2026) How to Sell on Blinkit Successfully.webp",
    author: "Arvind Ajmera",
    date: "July 10, 2026",
    link: "/contact-us",
  },
  {
    id: 7,
    title: "How to Sell on Zepto in 2026: Complete Zepto Seller Registration Guide",
    category: "Zepto",
    image: "/blogs-img/How to Sell on Zepto in 2026- Complete Zepto Seller Registration Guide3.webp",
    author: "Arvind Ajmera",
    date: "June 20, 2026",
    link: "/contact-us",
  },
  {
    id: 8,
    title: "How to Sell Online in India: Step-by-Step Guide for Beginners",
    category: "Sell Online",
    image: "/blogs-img/How to Sell Online in India- Step-by-Step Guide for Beginners1.png",
    author: "Arvind Ajmera",
    date: "June 18, 2026",
    link: "/contact-us",
  },
  {
    id: 9,
    title: "How to Solve Flipkart Seller Account Suspension Issues",
    category: "Flipkart",
    image: "/blogs-img/How to Solve Flipkart Seller Account Suspension Issues.webp",
    author: "Arvind Ajmera",
    date: "June 17, 2026",
    link: "/contact-us",
  },
  {
    id: 10,
    title: "How to List Products on Flipkart Seller Central 2026",
    category: "Flipkart",
    image: "/blogs-img/How to List Products on Flipkart Seller Central.webp",
    author: "Arvind Ajmera",
    date: "May 28, 2026",
    link: "/contact-us",
  },
  {
    id: 11,
    title: "How to Create a Flipkart Seller Account in 2026 | Step-by-Step Guide",
    category: "Flipkart",
    image: "/blogs-img/How to Create a Flipkart Seller Account in 2026 Step-by-Step 1.png",
    author: "Arvind Ajmera",
    date: "May 25, 2026",
    link: "/contact-us",
  },
  {
    id: 12,
    title: "A Complete Guide on How to Sell Products Online on Meesho",
    category: "Meesho",
    image: "/images/A Complete Guide on How to Sell Products Online on Meesho in 2026.webp",
    author: "Arvind Ajmera",
    date: "April 08, 2026",
    link: "/contact-us",
  },
  {
    id: 13,
    title: "Understanding ACoS, TACoS & ROAS for Amazon Advertising",
    category: "Amazon",
    image: "/images/Understanding ACoS, TACoS & ROAS for Amazon Advertising.webp",
    author: "Arvind Ajmera",
    date: "Feb 23, 2026",
    link: "/contact-us",
  },
  {
    id: 14,
    title: "Essential Shopify Product Listing Optimization for Maximum Visibility",
    category: "Shopify",
    image: "/images/understanding-acos-tacos-and-roas-for-amazon-advertising.jpg",
    author: "Arvind Ajmera",
    date: "Feb 12, 2026",
    link: "/contact-us",
  },
  {
    id: 15,
    title: "Complete Guide to Choosing the Right Etsy Account Management Services",
    category: "Etsy",
    image: "/blogs-img/complete-guide-to-choosing-the-right-etsy-account-management-services.webp",
    author: "Arvind Ajmera",
    date: "January 27, 2026",
    link: "/contact-us",
  },
  {
    id: 16,
    title: "Top 10 Essentials for High-Converting Amazon Product Descriptions",
    category: "Amazon",
    image: "/images/how-to-write-high-converting-amazon-product-descriptions.php.webp",
    author: "Arvind Ajmera",
    date: "January 07, 2026",
    link: "/contact-us",
  },
  {
    id: 17,
    title: "Vendor Central vs. Seller Central Migration: When to Move",
    category: "Amazon",
    image: "/images/Vendor Central vs. Seller Central Migration When to Move and How an Agency Manages the Transition.webp",
    author: "Arvind Ajmera",
    date: "November 24, 2025",
    link: "/contact-us",
  },
  {
    id: 18,
    title: "Master Amazon Promotions: Coupons, Deals & Vouchers Explained",
    category: "Amazon",
    image: "/images/Master Amazon Promotions Coupons, Deals & Vouchers Explained.webp",
    author: "Arvind Ajmera",
    date: "November 24, 2025",
    link: "/contact-us",
  },
  {
    id: 19,
    title: "How to Optimise Amazon PPC Campaigns and Reduce ACoS",
    category: "Amazon",
    image: "/images/How to Optimise Amazon PPC Campaigns.webp",
    author: "Arvind Ajmera",
    date: "November 13, 2025",
    link: "/contact-us",
  },
  {
    id: 20,
    title: "Amazon Advertising Strategy: Proven Tactics to Maximize ROI",
    category: "Amazon",
    image: "/images/Amazon Advertising Strategy Proven Tactics to Maximize.webp",
    author: "Arvind Ajmera",
    date: "November 13, 2025",
    link: "/contact-us",
  },
  {
    id: 21,
    title: "Top Mistakes Sellers Make When Managing Their Amazon Account",
    category: "Amazon",
    image: "/blogs-img/Top Mistakes Sellers Make When Managing Their Amazon Account01.webp",
    author: "Arvind Ajmera",
    date: "September 10, 2025",
    link: "/contact-us",
  },
  {
    id: 22,
    title: "How to Increase Sales on Flipkart: Tips for New Sellers",
    category: "Flipkart",
    image: "/blogs-img/How to Increase Sales on Flipkart Tips for New Sellers.png",
    author: "Arvind Ajmera",
    date: "August 27, 2025",
    link: "/contact-us",
  },
];

const CATEGORIES = [
  'All',
  'Amazon',
  'Flipkart',
  'Blinkit',
  'Zepto',
  'Meesho',
  'Shopify',
  'Myntra',
  'Sell Online',
  'Etsy',
  'Ajio',
];

export default function BlogsPage() {
  const { content } = useCmsContent();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);

  const postsPerPage = 6;

  const allPosts = useMemo(() => {
    if (content.blogs && content.blogs.length > 0) {
      return content.blogs.map((b) => ({
        id: b.id,
        title: b.title,
        category: b.category,
        image: b.image,
        author: b.author,
        date: b.date,
        link: b.link || `/blogs`,
      }));
    }
    return ALL_BLOGS;
  }, [content.blogs]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchCat =
        selectedCategory === 'All' ||
        post.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchQuery =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20 bg-white">
        
        {/* HERO SECTION */}
        <section
          className="relative py-20 bg-gradient-to-r from-[#081325] via-[#0B1E36] to-[#07101E] text-white text-center overflow-hidden border-b border-blue-950"
          style={{
            backgroundImage: "linear-gradient(rgba(8, 19, 37, 0.92), rgba(7, 16, 30, 0.96)), url('/abt-img/second-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-[#00C2FF] text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-blue-400/30">
              Ecommerce Strategies &amp; Insights
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              EcomVanta Insights &amp; Blogs
            </h1>
            <p className="text-blue-100 text-sm sm:text-base italic max-w-2xl mx-auto leading-relaxed">
              Explore battle-tested strategies in our blog. With EcomVanta, you stay ahead of algorithmic updates, PPC trends, and catalog optimization techniques to scale GMV.
            </p>
          </div>
        </section>

        {/* SEARCH & FILTER SECTION */}
        <section className="py-8 bg-gray-50/70 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Category Dropdown & Search Input */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-xs"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search Blog Ecommerce..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Counter */}
              <p className="text-xs text-gray-500 font-semibold whitespace-nowrap">
                Showing {filteredPosts.length} Articles
              </p>

            </div>
          </div>
        </section>

        {/* POSTS GRID SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {currentPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-base">No blog posts found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-[#0066FF] to-[#0052cc] text-white text-xs font-bold rounded-full hover:from-[#0052cc] hover:to-[#003d99]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#0066FF]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-[#0066FF] text-xs font-extrabold rounded-full shadow-xs">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-[#0066FF]" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#0066FF] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={post.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] group-hover:underline pt-3"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/30'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </section>

        <ContactSection sourcePage="Blogs Page" />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} sourcePage="Blogs Page" />
    </>
  );
}
