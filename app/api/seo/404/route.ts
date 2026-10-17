import { NextResponse } from 'next/server';
import { getLatestContentFromCloud, saveSiteContent } from '@/lib/cms';
import { DEFAULT_SEO_CONFIG, NotFoundLogItem } from '@/lib/seoTypes';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawPath = String(body.path || '').trim();
    if (!rawPath || rawPath.startsWith('/_next') || rawPath.startsWith('/api')) {
      return NextResponse.json({ success: true });
    }

    const content = await getLatestContentFromCloud();
    const cfg = content.seoConfig || DEFAULT_SEO_CONFIG;
    const logs: NotFoundLogItem[] = Array.isArray(cfg.notFoundLogs) ? [...cfg.notFoundLogs] : [];

    const now = new Date().toISOString();
    const existingIdx = logs.findIndex((l) => l.path === rawPath);

    if (existingIdx >= 0) {
      logs[existingIdx] = {
        ...logs[existingIdx],
        hits: (logs[existingIdx].hits || 1) + 1,
        lastSeen: now,
        referrer: body.referrer || logs[existingIdx].referrer,
      };
    } else {
      logs.unshift({
        id: `404-${Date.now()}`,
        path: rawPath,
        referrer: body.referrer || 'Direct',
        hits: 1,
        firstSeen: now,
        lastSeen: now,
      });
    }

    // Keep most recent 100 404 logs
    const trimmed = logs.slice(0, 100);
    const updatedSeoConfig = {
      ...cfg,
      notFoundLogs: trimmed,
    };

    saveSiteContent({
      ...content,
      seoConfig: updatedSeoConfig,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
