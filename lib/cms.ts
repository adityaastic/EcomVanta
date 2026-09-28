import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT, SiteContentData } from './cmsTypes';
import { supabaseAdmin, supabase } from './supabase';

export * from './cmsTypes';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'site-content.json');

// Declare global type for serverless memory cache
declare global {
  var __SITE_CONTENT_CACHE__: SiteContentData | undefined;
}

export function mergeWithDefaults(data: any): SiteContentData {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...data,
    branding: { ...DEFAULT_SITE_CONTENT.branding, ...(data?.branding || {}) },
    homepage: {
      ...DEFAULT_SITE_CONTENT.homepage,
      ...(data?.homepage || {}),
      hero: { ...DEFAULT_SITE_CONTENT.homepage.hero, ...(data?.homepage?.hero || {}) },
      stats: data?.homepage?.stats || DEFAULT_SITE_CONTENT.homepage.stats,
      brandLogos: data?.homepage?.brandLogos || DEFAULT_SITE_CONTENT.homepage.brandLogos,
      platforms: data?.homepage?.platforms || DEFAULT_SITE_CONTENT.homepage.platforms,
      listingServices: data?.homepage?.listingServices || DEFAULT_SITE_CONTENT.homepage.listingServices,
      advantages: data?.homepage?.advantages || DEFAULT_SITE_CONTENT.homepage.advantages,
      clientVideos: data?.homepage?.clientVideos || DEFAULT_SITE_CONTENT.homepage.clientVideos,
      faqs: data?.homepage?.faqs || DEFAULT_SITE_CONTENT.homepage.faqs,
      bottomCta: { ...DEFAULT_SITE_CONTENT.homepage.bottomCta, ...(data?.homepage?.bottomCta || {}) },
    },
    services: { ...DEFAULT_SITE_CONTENT.services, ...(data?.services || {}) },
    caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(data?.caseStudies || {}) },
    blogs: data?.blogs || DEFAULT_SITE_CONTENT.blogs,
    careers: data?.careers || DEFAULT_SITE_CONTENT.careers,
    careerPage: { ...DEFAULT_SITE_CONTENT.careerPage, ...(data?.careerPage || {}) },
    aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(data?.aboutUs || {}) },
    contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(data?.contactFooter || {}) },
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
      return merged;
    }
  } catch (error) {
    console.error('Error reading site content from disk:', error);
  }

  globalThis.__SITE_CONTENT_CACHE__ = DEFAULT_SITE_CONTENT;
  return DEFAULT_SITE_CONTENT;
}

export async function getLatestContentFromCloud(): Promise<SiteContentData> {
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
    const updated: SiteContentData = {
      ...current,
      ...content,
    };
    
    // Always update the live runtime cache
    globalThis.__SITE_CONTENT_CACHE__ = updated;

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
