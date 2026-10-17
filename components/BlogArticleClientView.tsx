'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ContactPopupModal from '@/components/ContactPopupModal';
import ContactSection from '@/components/ContactSection';
import { BlogPostItem } from '@/lib/cmsTypes';
import { TocHeadingItem } from '@/lib/seoAnalyzer';
import {
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
  List,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  Eye,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface BlogArticleClientViewProps {
  blog: BlogPostItem;
  processedHtml: string;
  headings: TocHeadingItem[];
  wordCount: number;
  readingTimeMinutes: number;
  relatedBlogs: BlogPostItem[];
  isPreview?: boolean;
}

export default function BlogArticleClientView({
  blog,
  processedHtml,
  headings,
  wordCount,
  readingTimeMinutes,
  relatedBlogs,
  isPreview = false,
}: BlogArticleClientViewProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const tocItems = headings.filter((h) => h.level === 2 || h.level === 3);
  const showToc = blog.showToc !== false && tocItems.length > 0;
  const faqs = blog.seo?.customFaqs || [];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <Header onOpenPopup={() => setPopupOpen(true)} />

      <main className="min-h-screen pt-20 bg-white">
        {/* Draft / Scheduled Preview Banner */}
        {isPreview && (
          <div className="bg-amber-500 text-slate-950 py-2.5 px-4 text-center text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm">
            <Eye className="w-4 h-4" />
            <span>
              ADMIN PREVIEW MODE — Status: <span className="uppercase underline">{blog.status || 'published'}</span>
              {blog.status === 'scheduled' && blog.scheduledAt ? ` (Scheduled for ${new Date(blog.scheduledAt).toLocaleString()})` : ''}
            </span>
            <Link
              href={`/admin/blogs/${blog.slug}`}
              className="ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Return to Editor
            </Link>
          </div>
        )}

        {/* HERO & BREADCRUMB HEADER */}
        <section className="relative py-14 lg:py-20 bg-gradient-to-b from-[#081325] via-[#0B1E36] to-[#07101E] text-white border-b border-blue-950 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-blue-200/80 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <Link href="/blogs" className="hover:text-white transition-colors">
                Blogs
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="text-[#00C2FF] font-semibold truncate max-w-xs sm:max-w-md">
                {blog.seo?.breadcrumbTitle || blog.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#0066FF] text-white text-xs font-extrabold uppercase tracking-wider">
                {blog.category || 'eCommerce'}
              </span>
              {blog.featured && (
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                  ★ Featured Guide
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs text-blue-200 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span>{readingTimeMinutes} min read ({wordCount} words)</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* Author & Date Meta Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-100">
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00C2FF] flex items-center justify-center font-black text-white text-sm">
                    {(blog.author || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-white">{blog.author || 'Arvind Ajmera'}</p>
                    <p className="text-[11px] text-blue-300">{blog.authorRole || 'Marketplace Growth Strategist'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-blue-200">
                  <Calendar className="w-3.5 h-3.5 text-[#00C2FF]" />
                  <span>Published: {blog.date}</span>
                </div>

                {blog.updatedAt && (
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      Updated:{' '}
                      {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY & SIDEBAR */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Article Column */}
              <article className="lg:col-span-8 space-y-8">
                {/* Featured Image */}
                {blog.image && (
                  <figure className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md">
                    <img
                      src={blog.image}
                      alt={blog.imageAlt || blog.title}
                      title={blog.imageTitle || blog.title}
                      className="w-full max-h-[460px] object-cover"
                    />
                    {blog.imageCaption && (
                      <figcaption className="px-5 py-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-200 italic text-center">
                        {blog.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Custom Introduction Highlight */}
                {blog.customIntro && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border-l-4 border-[#0066FF] text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                    {blog.customIntro}
                  </div>
                )}

                {/* Automatic Table of Contents */}
                {showToc && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                      <List className="w-4 h-4 text-[#0066FF]" />
                      <span>Table of Contents</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {tocItems.map((item, idx) => (
                        <li
                          key={`${item.id}-${idx}`}
                          className={item.level === 3 ? 'pl-5' : ''}
                        >
                          <a
                            href={`#${item.id}`}
                            className="text-slate-700 hover:text-[#0066FF] font-medium flex items-center gap-2 transition-colors"
                          >
                            <span className="text-xs font-bold text-[#0066FF]">
                              {item.level === 2 ? '•' : '◦'}
                            </span>
                            <span>{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rich Text Content */}
                <div
                  className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-base [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-[#0066FF] [&_a]:font-semibold [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066FF] [&_blockquote]:bg-slate-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-100 [&_th]:p-2.5 [&_th]:text-left [&_td]:border [&_td]:border-slate-200 [&_td]:p-2.5"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />

                {/* Article FAQs if configured */}
                {faqs.length > 0 && (
                  <div className="pt-8 border-t border-slate-200 space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-[#0066FF]" />
                      <span>Frequently Asked Questions</span>
                    </h2>
                    <div className="space-y-3">
                      {faqs.map((faq, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                          <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                      <Tag className="w-3.5 h-3.5 text-[#0066FF]" />
                      Topics:
                    </span>
                    {blog.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blogs?category=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0066FF] text-xs font-semibold transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Author Bio Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00C2FF] flex items-center justify-center font-black text-xl shrink-0">
                    {(blog.author || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#00C2FF]">
                      Written By {blog.author || 'Arvind Ajmera'}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {blog.authorBio ||
                        'Senior eCommerce Growth Strategist at EcomVanta specializing in Amazon, Flipkart, Myntra, and Quick Commerce dark store scaling across India.'}
                    </p>
                  </div>
                </div>
              </article>

              {/* Right Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Free Audit CTA Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#081325] to-[#0B1E36] text-white border border-blue-900/50 shadow-xl space-y-4 sticky top-28">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-[#00C2FF] text-[11px] font-extrabold uppercase tracking-wider">
                    Free Marketplace Audit
                  </span>
                  <h3 className="text-xl font-black leading-snug">
                    Want to Scale Your Brand on {blog.category || 'Amazon & Flipkart'}?
                  </h3>
                  <p className="text-xs text-blue-100/80 leading-relaxed">
                    Get a personalized 1-on-1 catalog, listing SEO, and PPC advertising audit from EcomVanta’s senior account managers.
                  </p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book Free Strategy Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Related Articles in Sidebar */}
                  {relatedBlogs.length > 0 && (
                    <div className="pt-5 border-t border-white/10 space-y-3">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                        Related Guides
                      </p>
                      <div className="space-y-3">
                        {relatedBlogs.map((rel) => (
                          <Link
                            key={rel.id}
                            href={`/blogs/${rel.slug}`}
                            className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                          >
                            <span className="text-[10px] font-bold text-[#00C2FF] uppercase">
                              {rel.category}
                            </span>
                            <h4 className="text-xs font-bold text-white group-hover:text-[#00C2FF] transition-colors line-clamp-2 mt-0.5">
                              {rel.title}
                            </h4>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* RELATED ARTICLES GRID */}
        {relatedBlogs.length > 0 && (
          <section className="py-14 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Related Articles &amp; Guides</h2>
                  <p className="text-xs text-slate-500 mt-1">Continue exploring marketplace growth playbooks</p>
                </div>
                <Link
                  href="/blogs"
                  className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Articles</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        <img
                          src={post.image || '/arvian-blogs.jpeg'}
                          alt={post.imageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-[#0066FF] text-[10px] font-extrabold rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <p className="text-[11px] text-slate-400">{post.date}</p>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-4 text-xs font-bold text-[#0066FF] flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactSection sourcePage={`Blog: ${blog.title}`} />
      </main>

      <Footer />
      <FloatingActions />
      <ContactPopupModal
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        sourcePage={`Blog: ${blog.title}`}
      />
    </>
  );
}
