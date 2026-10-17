import { NextResponse } from 'next/server';
import { getLatestContentFromCloud } from '@/lib/cms';
import { DEFAULT_SEO_CONFIG } from '@/lib/seoTypes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const content = await getLatestContentFromCloud();
  const cfg = content.seoConfig || DEFAULT_SEO_CONFIG;
  const siteUrl = (cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '');
  const rCfg = cfg.robotsTxt || DEFAULT_SEO_CONFIG.robotsTxt;

  let bodyText = '';

  if (cfg.globalNoindex) {
    bodyText = `User-agent: *\nDisallow: /\n\n# Global Search Engine Visibility is currently disabled in SEO Settings\nSitemap: ${siteUrl}/sitemap.xml\n`;
  } else if (rCfg.useCustom && rCfg.customContent?.trim()) {
    bodyText = rCfg.customContent.trim() + '\n';
  } else {
    const allows = Array.from(new Set(['/', ...(rCfg.extraAllows || [])])).filter(Boolean);
    const disallows = Array.from(new Set(['/admin/', '/api/', ...(rCfg.extraDisallows || [])])).filter(Boolean);

    const lines: string[] = ['User-agent: *'];
    for (const a of allows) {
      lines.push(`Allow: ${a}`);
    }
    for (const d of disallows) {
      lines.push(`Disallow: ${d}`);
    }
    if (rCfg.crawlDelay && rCfg.crawlDelay > 0) {
      lines.push(`Crawl-delay: ${rCfg.crawlDelay}`);
    }
    lines.push('');
    lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
    bodyText = lines.join('\n') + '\n';
  }

  return new NextResponse(bodyText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
