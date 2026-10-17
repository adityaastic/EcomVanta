import type { MetadataRoute } from 'next';
import { getLatestContentFromCloud } from '@/lib/cms';
import { DEFAULT_SEO_CONFIG } from '@/lib/seoTypes';
import { buildSiteSeoInventory } from '@/lib/seoEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getLatestContentFromCloud();
  const cfg = content.seoConfig || DEFAULT_SEO_CONFIG;
  const sCfg = cfg.sitemapConfig || DEFAULT_SEO_CONFIG.sitemapConfig;

  if (cfg.globalNoindex && sCfg.excludeNoindex) {
    return [];
  }

  const audit = buildSiteSeoInventory(content);
  const excludedSet = new Set((sCfg.excludedPaths || []).map((p) => p.trim()));

  const entries: MetadataRoute.Sitemap = [];

  for (const page of audit.pages) {
    // Exclude drafts and future scheduled posts
    if (page.status !== 'published') continue;

    // Exclude by content type toggle
    if (page.contentType === 'blog' && !sCfg.includeBlogs) continue;
    if (page.contentType === 'service' && !sCfg.includeServices) continue;
    if (page.contentType === 'caseStudy' && !sCfg.includeCaseStudies) continue;
    if (page.contentType === 'staticPage' && !sCfg.includeStaticPages) continue;

    // Exclude noindex pages if configured
    if (sCfg.excludeNoindex && page.effectiveRobotsIndex === 'noindex') continue;

    // Exclude explicitly excluded paths
    if (excludedSet.has(page.urlPath)) continue;

    let priority = 0.8;
    if (page.urlPath === '/') priority = 1.0;
    else if (page.contentType === 'service') priority = 0.9;
    else if (page.contentType === 'blog') priority = 0.75;
    else if (page.contentType === 'caseStudy') priority = 0.7;

    let parsedDate = new Date();
    if (page.updatedAt) {
      const d = new Date(page.updatedAt);
      if (!isNaN(d.getTime())) parsedDate = d;
    }

    entries.push({
      url: page.effectiveCanonical,
      lastModified: parsedDate,
      changeFrequency: sCfg.defaultChangeFreq || 'weekly',
      priority,
    });
  }

  return entries;
}
