import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT, SiteContentData } from './cmsTypes';

export * from './cmsTypes';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'site-content.json');

// Declare global type for serverless memory cache
declare global {
  var __SITE_CONTENT_CACHE__: SiteContentData | undefined;
}

export function getSiteContent(): SiteContentData {
  if (globalThis.__SITE_CONTENT_CACHE__) {
    return globalThis.__SITE_CONTENT_CACHE__;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      const merged: SiteContentData = {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
        homepage: { ...DEFAULT_SITE_CONTENT.homepage, ...(parsed.homepage || {}) },
        services: { ...DEFAULT_SITE_CONTENT.services, ...(parsed.services || {}) },
        caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(parsed.caseStudies || {}) },
        blogs: parsed.blogs || DEFAULT_SITE_CONTENT.blogs,
        careers: parsed.careers || DEFAULT_SITE_CONTENT.careers,
        aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(parsed.aboutUs || {}) },
        contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(parsed.contactFooter || {}) },
      };
      globalThis.__SITE_CONTENT_CACHE__ = merged;
      return merged;
    }
  } catch (error) {
    console.error('Error reading site content from disk:', error);
  }

  globalThis.__SITE_CONTENT_CACHE__ = DEFAULT_SITE_CONTENT;
  return DEFAULT_SITE_CONTENT;
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
      // On serverless platforms (e.g. Vercel), disk is read-only.
      // We gracefully log and keep content active in runtime memory.
      console.warn('Serverless environment detected (read-only fs). Content updated in live runtime memory:', fsError?.message);
    }

    return true;
  } catch (error) {
    console.error('Error saving site content:', error);
    return false;
  }
}
