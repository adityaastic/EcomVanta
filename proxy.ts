import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSiteContent } from '@/lib/cms';
import { DEFAULT_SEO_CONFIG } from '@/lib/seoTypes';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static assets, Next.js internals, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Always protect admin routes from search indexing
  if (pathname.startsWith('/admin')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  try {
    const content = getSiteContent();
    const cfg = content.seoConfig || DEFAULT_SEO_CONFIG;
    const redirects = cfg.redirects || DEFAULT_SEO_CONFIG.redirects || [];

    const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    // 1. Check explicit Redirect Manager rules (with loop protection up to 3 hops)
    let matchedRule = redirects.find(
      (r) => r.enabled && (r.source === normalizedPath || r.source === pathname)
    );

    if (matchedRule && matchedRule.destination && matchedRule.destination !== normalizedPath) {
      let finalDestination = matchedRule.destination.trim();
      let status: 301 | 302 = matchedRule.type === 302 ? 302 : 301;

      // Resolve any 1-hop chain safely
      const visited = new Set<string>([normalizedPath]);
      for (let i = 0; i < 3; i++) {
        if (visited.has(finalDestination)) break;
        visited.add(finalDestination);
        const nextHop = redirects.find((r) => r.enabled && r.source === finalDestination);
        if (nextHop && nextHop.destination && !visited.has(nextHop.destination)) {
          finalDestination = nextHop.destination.trim();
        } else {
          break;
        }
      }

      const targetUrl = finalDestination.startsWith('http')
        ? new URL(finalDestination)
        : new URL(finalDestination, request.url);

      return NextResponse.redirect(targetUrl, status);
    }

    // 2. Check automatic blog slug change redirects (previousSlugs)
    if (normalizedPath.startsWith('/blogs/')) {
      const requestedSlug = normalizedPath.replace(/^\/blogs\//, '');
      const movedBlog = (content.blogs || []).find(
        (b) => b.slug !== requestedSlug && Array.isArray(b.previousSlugs) && b.previousSlugs.includes(requestedSlug)
      );
      if (movedBlog && movedBlog.slug) {
        return NextResponse.redirect(new URL(`/blogs/${movedBlog.slug}`, request.url), 301);
      }
    }

    // 3. Apply X-Robots-Tag for global noindex or pagination/filtered URL controls
    const response = NextResponse.next();
    if (cfg.globalNoindex) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }

    const pageParam = searchParams.get('page');
    const hasFilterParams = Array.from(searchParams.keys()).some(
      (k) => k !== 'page' && k !== 'preview'
    );

    if (cfg.paginationControl?.noindexPaginated && pageParam && pageParam !== '1') {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
    } else if (cfg.paginationControl?.noindexFiltered && hasFilterParams) {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
    }

    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
