import type { Metadata } from 'next';
import { getLatestContentFromCloud } from './cms';
import { DEFAULT_SEO_CONFIG } from './seoTypes';
import { resolveEffectiveSeoMeta } from './seoAnalyzer';
import { isScheduledBlogLive, generateJsonLdForRoute } from './seoEngine';
import { SERVICES_DATABASE } from './serviceData';

export async function buildNextMetadataForRoute(
  urlPath: string,
  options?: {
    fallbackTitle?: string;
    fallbackDescription?: string;
    isPreview?: boolean;
  }
): Promise<Metadata> {
  const content = await getLatestContentFromCloud();
  const cfg = content.seoConfig || DEFAULT_SEO_CONFIG;
  const siteUrl = (cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '');
  const cleanPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;

  // Check if this is a blog post route
  if (cleanPath.startsWith('/blogs/') && cleanPath !== '/blogs') {
    const slug = cleanPath.replace(/^\/blogs\//, '');
    const blog = (content.blogs || []).find((b) => b.slug === slug || b.id === slug);

    if (!blog || (!isScheduledBlogLive(blog) && !options?.isPreview)) {
      return {
        title: `Article Not Found | ${content.branding?.siteName || 'EcomVanta'}`,
        robots: { index: false, follow: false },
      };
    }

    const resolved = resolveEffectiveSeoMeta({
      contentType: 'blog',
      title: blog.title,
      excerpt: blog.excerpt || '',
      urlPath: `/blogs/${blog.slug}`,
      category: blog.category,
      author: blog.author,
      featuredImage: blog.image,
      seo: blog.seo,
      seoConfig: cfg,
    });

    const isDraftOrScheduled = !isScheduledBlogLive(blog);
    const shouldIndex = !isDraftOrScheduled && resolved.effectiveRobotsIndex === 'index';
    const shouldFollow = !isDraftOrScheduled && resolved.effectiveRobotsFollow === 'follow';

    const keywordsList = [
      blog.seo?.focusKeyword,
      ...(blog.seo?.secondaryKeywords || []),
      ...(blog.tags || []),
      blog.category,
    ].filter(Boolean) as string[];

    return {
      metadataBase: new URL(siteUrl),
      title: resolved.effectiveTitle,
      description: resolved.effectiveDescription,
      keywords: keywordsList.length > 0 ? keywordsList : undefined,
      authors: [{ name: blog.author || 'Arvind Ajmera' }],
      alternates: {
        canonical: resolved.effectiveCanonical,
      },
      robots: {
        index: shouldIndex,
        follow: shouldFollow,
        googleBot: {
          index: shouldIndex,
          follow: shouldFollow,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },
      openGraph: {
        title: blog.seo?.ogTitle || resolved.effectiveOgTitle,
        description: blog.seo?.ogDescription || resolved.effectiveOgDescription,
        url: resolved.effectiveCanonical,
        siteName: content.branding?.siteName || 'EcomVanta',
        type: 'article',
        publishedTime: blog.publishedAt || undefined,
        modifiedTime: blog.updatedAt || blog.publishedAt || undefined,
        authors: [blog.author || 'Arvind Ajmera'],
        images: [
          {
            url: resolved.effectiveOgImage,
            alt: blog.imageAlt || blog.title,
          },
        ],
      },
      twitter: {
        card: blog.seo?.twitterCard || 'summary_large_image',
        title: blog.seo?.twitterTitle || blog.seo?.ogTitle || resolved.effectiveOgTitle,
        description: blog.seo?.twitterDescription || blog.seo?.ogDescription || resolved.effectiveOgDescription,
        images: [blog.seo?.twitterImage || resolved.effectiveOgImage],
        creator: cfg.twitterHandle || '@ecomvanta',
      },
    };
  }

  // Check if this is a service route or case study or static page
  const rawSlug = cleanPath.slice(1);
  const dbSrv = SERVICES_DATABASE[rawSlug];
  const cmsSrv = content.services?.[rawSlug];
  const amazonFallback = {
    title: 'Amazon Seller Account Management Services',
    subtitle: 'Scale your Amazon business with end-to-end Seller Central handling, A+ cataloging, FBA inventory planning, and Sponsored Ads PPC optimization.',
    heroImage: '/home-img/Amazon-account-management.webp',
  };
  const serviceMatch: Partial<typeof amazonFallback & { seoTitle?: string; metaDescription?: string }> | undefined =
    rawSlug === 'amazon-seller-account-management-services'
      ? {
          ...amazonFallback,
          ...(dbSrv || {}),
          ...(cmsSrv || {}),
        }
      : dbSrv || cmsSrv
      ? { ...(dbSrv || {}), ...(cmsSrv || {}) }
      : undefined;
  const caseStudyMatch = content.caseStudies?.[rawSlug];
  const rawPageSeo = cfg.pageSeo?.[cleanPath];
  const pageSeo = {
    ...(serviceMatch?.seoTitle ? { seoTitle: serviceMatch.seoTitle } : {}),
    ...(serviceMatch?.metaDescription ? { metaDescription: serviceMatch.metaDescription } : {}),
    ...(rawPageSeo || {}),
  };

  const contentType = serviceMatch ? 'service' : caseStudyMatch ? 'caseStudy' : 'staticPage';
  const baseTitle =
    options?.fallbackTitle ||
    serviceMatch?.seoTitle ||
    serviceMatch?.title ||
    caseStudyMatch?.title ||
    pageSeo?.breadcrumbTitle ||
    content.branding?.siteName ||
    'EcomVanta';
  const baseDesc =
    options?.fallbackDescription ||
    serviceMatch?.metaDescription ||
    serviceMatch?.subtitle ||
    caseStudyMatch?.subtitle ||
    content.branding?.metaDescription ||
    '';
  const baseImage =
    serviceMatch?.heroImage ||
    caseStudyMatch?.dashboardImage ||
    cfg.defaultOgImage ||
    '/ecomvanta-logo.png';

  const resolved = resolveEffectiveSeoMeta({
    contentType,
    title: baseTitle,
    excerpt: baseDesc,
    urlPath: cleanPath,
    brandName: caseStudyMatch?.brandName || content.branding?.siteName,
    featuredImage: baseImage,
    seo: pageSeo,
    seoConfig: cfg,
  });

  const shouldIndex = resolved.effectiveRobotsIndex === 'index';
  const shouldFollow = resolved.effectiveRobotsFollow === 'follow';
  const keywordsList = [
    pageSeo?.focusKeyword,
    ...(pageSeo?.secondaryKeywords || []),
  ].filter(Boolean) as string[];

  const verificationOther: Record<string, string> = {};
  if (cfg.integrations?.verificationMetaTag) {
    verificationOther['google-site-verification'] = cfg.integrations.verificationMetaTag;
  }
  if (cfg.integrations?.bingVerificationMetaTag) {
    verificationOther['msvalidate.01'] = cfg.integrations.bingVerificationMetaTag;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: resolved.effectiveTitle,
    description: resolved.effectiveDescription,
    keywords:
      keywordsList.length > 0
        ? keywordsList
        : ['EcomVanta', 'Ecommerce Account Management', 'Amazon Account Management', 'Flipkart Account Management'],
    authors: [{ name: content.branding?.siteName || 'EcomVanta' }],
    alternates: {
      canonical: resolved.effectiveCanonical,
      types: {
        'application/xml': [{ url: `${siteUrl}/sitemap.xml`, title: 'Sitemap' }],
      },
    },
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: pageSeo?.ogTitle || resolved.effectiveOgTitle,
      description: pageSeo?.ogDescription || resolved.effectiveOgDescription,
      url: resolved.effectiveCanonical,
      siteName: content.branding?.siteName || 'EcomVanta',
      type: pageSeo?.ogType || (caseStudyMatch ? 'article' : 'website'),
      images: [
        {
          url: resolved.effectiveOgImage,
          alt: baseTitle,
        },
      ],
    },
    twitter: {
      card: pageSeo?.twitterCard || 'summary_large_image',
      title: pageSeo?.twitterTitle || pageSeo?.ogTitle || resolved.effectiveOgTitle,
      description: pageSeo?.twitterDescription || pageSeo?.ogDescription || resolved.effectiveOgDescription,
      images: [pageSeo?.twitterImage || resolved.effectiveOgImage],
      site: cfg.twitterHandle || '@ecomvanta',
    },
    ...(Object.keys(verificationOther).length > 0
      ? {
          verification: {
            google: cfg.integrations?.verificationMetaTag || undefined,
            other: verificationOther,
          },
        }
      : {}),
  };
}

export async function getRouteJsonLdScripts(urlPath: string): Promise<Record<string, any>[]> {
  const content = await getLatestContentFromCloud();
  return generateJsonLdForRoute(urlPath, content);
}
