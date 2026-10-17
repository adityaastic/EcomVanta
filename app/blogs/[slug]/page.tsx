import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLatestContentFromCloud } from '@/lib/cms';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import { isScheduledBlogLive } from '@/lib/seoEngine';
import {
  extractHeadingsAndToc,
  injectHeadingIdsIntoHtml,
  calculateWordCountAndReadingTime,
} from '@/lib/seoAnalyzer';
import SeoJsonLd from '@/components/SeoJsonLd';
import BlogArticleClientView from '@/components/BlogArticleClientView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const isPreview = sp?.preview === 'true';
  return buildNextMetadataForRoute(`/blogs/${slug}`, { isPreview });
}

export default async function BlogArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const isPreview = sp?.preview === 'true';

  const content = await getLatestContentFromCloud();
  const blogs = content.blogs || [];
  const blog = blogs.find((b) => b.slug === slug || b.id === slug);

  // Prevent drafts and future scheduled posts from leaking publicly unless in preview mode
  if (!blog || (!isScheduledBlogLive(blog) && !isPreview)) {
    notFound();
  }

  const rawHtml = blog.content || `<p>${blog.excerpt || ''}</p>`;
  const headings = extractHeadingsAndToc(rawHtml);
  const processedHtml = injectHeadingIdsIntoHtml(rawHtml);
  const { wordCount, readingTimeMinutes } = calculateWordCountAndReadingTime(
    `${blog.excerpt || ''} ${rawHtml}`
  );

  // Resolve related published articles
  const publishedBlogs = blogs.filter(
    (b) => b.slug !== blog.slug && isScheduledBlogLive(b)
  );
  let relatedBlogs = publishedBlogs.filter((b) =>
    (blog.relatedSlugs || []).includes(b.slug)
  );
  if (relatedBlogs.length < 3) {
    const sameCat = publishedBlogs.filter(
      (b) =>
        !relatedBlogs.some((r) => r.slug === b.slug) &&
        b.category?.toLowerCase() === blog.category?.toLowerCase()
    );
    relatedBlogs = [...relatedBlogs, ...sameCat];
  }
  if (relatedBlogs.length < 3) {
    const others = publishedBlogs.filter(
      (b) => !relatedBlogs.some((r) => r.slug === b.slug)
    );
    relatedBlogs = [...relatedBlogs, ...others].slice(0, 3);
  }

  return (
    <>
      {!isPreview && <SeoJsonLd urlPath={`/blogs/${blog.slug}`} />}
      <BlogArticleClientView
        blog={blog}
        processedHtml={processedHtml}
        headings={headings}
        wordCount={blog.wordCount || wordCount}
        readingTimeMinutes={blog.readingTime || readingTimeMinutes}
        relatedBlogs={relatedBlogs.slice(0, 3)}
        isPreview={isPreview}
      />
    </>
  );
}
