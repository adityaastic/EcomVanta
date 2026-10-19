import fs from 'fs';
import path from 'path';
import {
  DEFAULT_SITE_CONTENT,
  SiteContentData,
  INITIAL_BLOGS,
  DEFAULT_SEO_CONFIG,
  BlogPostItem,
  SeoSystemConfig,
  sanitizeRestrictedMediaUrls,
  LEGACY_BLOG_LOGO_IMAGES,
} from './cmsTypes';
import { supabaseAdmin, supabase } from './supabase';

export * from './cmsTypes';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'site-content.json');

// Declare global type for serverless memory cache
declare global {
  var __SITE_CONTENT_CACHE__: SiteContentData | undefined;
  var __SITE_CONTENT_CACHE_TIME__: number | undefined;
}

export function normalizeBlogs(rawBlogs?: BlogPostItem[]): BlogPostItem[] {
  const inputList = Array.isArray(rawBlogs) && rawBlogs.length > 0 ? [...rawBlogs] : [...INITIAL_BLOGS];

  // If the stored list only had the old 6 blogs (before all 22 original blogs were unified), append the missing original blogs
  if (inputList.length <= 6) {
    const existingKeys = new Set(
      inputList.flatMap((b) => [b.id, b.slug, b.title?.toLowerCase().trim()].filter(Boolean))
    );
    for (const ib of INITIAL_BLOGS) {
      if (!existingKeys.has(ib.id) && !existingKeys.has(ib.slug) && !existingKeys.has(ib.title.toLowerCase().trim())) {
        inputList.push(ib);
      }
    }
  }

  return inputList.map((rawItem) => {
    const b = sanitizeRestrictedMediaUrls(rawItem);
    const defaultMatch = INITIAL_BLOGS.find(
      (ib) => ib.slug === b.slug || ib.id === b.id || ib.title?.toLowerCase() === b.title?.toLowerCase()
    );
    const slug = b.slug || defaultMatch?.slug || b.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || b.id;

    // Upgrade old generic marketplace logo placeholders on blogs 1-6 to their real blog cover images
    const resolvedImage =
      !b.image || (defaultMatch && LEGACY_BLOG_LOGO_IMAGES.has(b.image))
        ? defaultMatch?.image || b.image
        : b.image;

    const resolvedOgImage =
      !b.seo?.ogImage || (defaultMatch && LEGACY_BLOG_LOGO_IMAGES.has(b.seo.ogImage))
        ? resolvedImage
        : b.seo.ogImage;

    const resolvedTwitterImage =
      !b.seo?.twitterImage || (defaultMatch && LEGACY_BLOG_LOGO_IMAGES.has(b.seo.twitterImage))
        ? resolvedImage
        : b.seo.twitterImage;

    return {
      ...(defaultMatch || {}),
      ...b,
      slug,
      image: resolvedImage,
      status: b.status || 'published',
      content: b.content && b.content.trim().length > 0 ? b.content : (defaultMatch?.content || ''),
      imageAlt: b.imageAlt ?? defaultMatch?.imageAlt ?? b.title,
      imageTitle: b.imageTitle ?? defaultMatch?.imageTitle ?? b.title,
      tags: b.tags ?? defaultMatch?.tags ?? (b.category ? [b.category] : []),
      showToc: b.showToc !== undefined ? b.showToc : true,
      link: `/blogs/${slug}`,
      seo: {
        ...(defaultMatch?.seo || {
          focusKeyword: '',
          secondaryKeywords: [],
          seoTitle: '',
          metaDescription: '',
          canonicalUrl: '',
          robotsIndex: 'index',
          robotsFollow: 'follow',
          robotsAdvanced: ['max-snippet:-1', 'max-image-preview:large'],
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          ogType: 'article',
          twitterCard: 'summary_large_image',
          twitterTitle: '',
          twitterDescription: '',
          twitterImage: '',
          breadcrumbTitle: b.title || '',
          schemaType: 'BlogPosting',
        }),
        ...(b.seo || {}),
        ogImage: resolvedOgImage,
        twitterImage: resolvedTwitterImage,
      },
    };
  });
}

export function mergeSeoConfig(raw?: Partial<SeoSystemConfig>): SeoSystemConfig {
  if (!raw) return DEFAULT_SEO_CONFIG;
  return {
    ...DEFAULT_SEO_CONFIG,
    ...raw,
    paginationControl: {
      ...DEFAULT_SEO_CONFIG.paginationControl,
      ...(raw.paginationControl || {}),
    },
    publishPreChecks: {
      ...DEFAULT_SEO_CONFIG.publishPreChecks,
      ...(raw.publishPreChecks || {}),
    },
    templates: {
      ...DEFAULT_SEO_CONFIG.templates,
      ...(raw.templates || {}),
    },
    pageSeo: {
      ...DEFAULT_SEO_CONFIG.pageSeo,
      ...(raw.pageSeo || {}),
    },
    redirects: Array.isArray(raw.redirects) ? raw.redirects : DEFAULT_SEO_CONFIG.redirects,
    robotsTxt: {
      ...DEFAULT_SEO_CONFIG.robotsTxt,
      ...(raw.robotsTxt || {}),
    },
    sitemapConfig: {
      ...DEFAULT_SEO_CONFIG.sitemapConfig,
      ...(raw.sitemapConfig || {}),
    },
    schemaOrg: {
      ...DEFAULT_SEO_CONFIG.schemaOrg,
      ...(raw.schemaOrg || {}),
    },
    integrations: {
      ...DEFAULT_SEO_CONFIG.integrations,
      ...(raw.integrations || {}),
    },
    notFoundLogs: Array.isArray(raw.notFoundLogs) ? raw.notFoundLogs : DEFAULT_SEO_CONFIG.notFoundLogs,
    seoTasks: Array.isArray(raw.seoTasks) ? raw.seoTasks : DEFAULT_SEO_CONFIG.seoTasks,
    analyzerWeights: {
      ...DEFAULT_SEO_CONFIG.analyzerWeights,
      ...(raw.analyzerWeights || {}),
    },
    rolePermissions: {
      ...DEFAULT_SEO_CONFIG.rolePermissions,
      ...(raw.rolePermissions || {}),
    },
  };
}

export function mergeWithDefaults(rawData: any): SiteContentData {
  const data = sanitizeRestrictedMediaUrls(rawData || {});
  return {
    ...DEFAULT_SITE_CONTENT,
    ...data,
    branding: { ...DEFAULT_SITE_CONTENT.branding, ...(data?.branding || {}) },
    homepage: {
      ...DEFAULT_SITE_CONTENT.homepage,
      ...(data?.homepage || {}),
      videoHero: { ...DEFAULT_SITE_CONTENT.homepage.videoHero, ...(data?.homepage?.videoHero || {}) },
      hero: { ...DEFAULT_SITE_CONTENT.homepage.hero, ...(data?.homepage?.hero || {}) },
      stats: data?.homepage?.stats || DEFAULT_SITE_CONTENT.homepage.stats,
      brandLogos: data?.homepage?.brandLogos || DEFAULT_SITE_CONTENT.homepage.brandLogos,
      platforms: data?.homepage?.platforms || DEFAULT_SITE_CONTENT.homepage.platforms,
      listingServices: data?.homepage?.listingServices || DEFAULT_SITE_CONTENT.homepage.listingServices,
      advantages: data?.homepage?.advantages || DEFAULT_SITE_CONTENT.homepage.advantages,
      clientVideos: data?.homepage?.clientVideos || DEFAULT_SITE_CONTENT.homepage.clientVideos,
      faqs: data?.homepage?.faqs || DEFAULT_SITE_CONTENT.homepage.faqs,
      bottomCta: { ...DEFAULT_SITE_CONTENT.homepage.bottomCta, ...(data?.homepage?.bottomCta || {}) },
      seoContentBlocks: data?.homepage?.seoContentBlocks || DEFAULT_SITE_CONTENT.homepage.seoContentBlocks,
      showFounderSection: data?.homepage?.showFounderSection !== undefined ? data.homepage.showFounderSection : true,
    },
    services: { ...DEFAULT_SITE_CONTENT.services, ...(data?.services || {}) },
    caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(data?.caseStudies || {}) },
    blogs: normalizeBlogs(data?.blogs),
    careers: data?.careers || DEFAULT_SITE_CONTENT.careers,
    careerPage: { ...DEFAULT_SITE_CONTENT.careerPage, ...(data?.careerPage || {}) },
    aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(data?.aboutUs || {}) },
    founder: { ...DEFAULT_SITE_CONTENT.founder, ...(data?.founder || {}) },
    contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(data?.contactFooter || {}) },
    seoConfig: mergeSeoConfig(data?.seoConfig || data?.seoSystem),
    seoSystem: mergeSeoConfig(data?.seoSystem || data?.seoConfig),
  };
}

export function getSiteContent(): SiteContentData {
  if (globalThis.__SITE_CONTENT_CACHE__) {
    return globalThis.__SITE_CONTENT_CACHE__;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      const merged = mergeWithDefaults(parsed);
      globalThis.__SITE_CONTENT_CACHE__ = merged;
      globalThis.__SITE_CONTENT_CACHE_TIME__ = Date.now();
      return merged;
    }
  } catch (error) {
    console.error('Error reading site content from disk:', error);
  }

  globalThis.__SITE_CONTENT_CACHE__ = DEFAULT_SITE_CONTENT;
  globalThis.__SITE_CONTENT_CACHE_TIME__ = Date.now();
  return DEFAULT_SITE_CONTENT;
}

export async function getLatestContentFromCloud(): Promise<SiteContentData> {
  // Use in-memory cache if refreshed within the last 30 seconds to avoid hammering Supabase when quota is restricted
  if (
    globalThis.__SITE_CONTENT_CACHE__ &&
    globalThis.__SITE_CONTENT_CACHE_TIME__ &&
    Date.now() - globalThis.__SITE_CONTENT_CACHE_TIME__ < 30_000
  ) {
    return globalThis.__SITE_CONTENT_CACHE__;
  }

  const client = supabaseAdmin || supabase;
  if (!client) {
    return getSiteContent();
  }

  // 1. Try Supabase Database table
  try {
    const { data: row, error: dbErr } = await client
      .from('site_content')
      .select('content')
      .eq('id', 'main')
      .maybeSingle();

    if (!dbErr && row && row.content) {
      const merged = mergeWithDefaults(row.content);
      globalThis.__SITE_CONTENT_CACHE__ = merged;
      globalThis.__SITE_CONTENT_CACHE_TIME__ = Date.now();
      return merged;
    }
  } catch (err) {
    // Ignore and fallback to storage
  }

  // 2. Try Supabase Storage bucket (media/cms/site_content.json) with cache busting
  try {
    const { data: pubData } = client.storage.from('media').getPublicUrl('cms/site_content.json');
    if (pubData?.publicUrl) {
      const res = await fetch(`${pubData.publicUrl}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' },
      });
      if (res.ok) {
        const parsed = await res.json();
        if (parsed && typeof parsed === 'object') {
          const merged = mergeWithDefaults(parsed);
          globalThis.__SITE_CONTENT_CACHE__ = merged;
          globalThis.__SITE_CONTENT_CACHE_TIME__ = Date.now();
          return merged;
        }
      }
    }
  } catch (err) {
    // Ignore and fallback to local
  }

  // 3. Fallback to disk / memory cache
  return getSiteContent();
}

export function saveSiteContent(content: Partial<SiteContentData>): boolean {
  try {
    const current = getSiteContent();
    const updated: SiteContentData = mergeWithDefaults({
      ...current,
      ...content,
    });

    // Always update the live runtime cache
    globalThis.__SITE_CONTENT_CACHE__ = updated;
    globalThis.__SITE_CONTENT_CACHE_TIME__ = Date.now();

    // Try saving to local disk if writable
    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (fsError: any) {
      console.warn('Serverless environment detected (read-only fs). Content updated in live runtime memory:', fsError?.message);
    }

    return true;
  } catch (error) {
    console.error('Error saving site content:', error);
    return false;
  }
}

