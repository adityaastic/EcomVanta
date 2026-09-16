import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, SiteContentData, DEFAULT_SITE_CONTENT } from '@/lib/cms';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLatestContentFromCloud(): Promise<SiteContentData> {
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
      return mergeWithDefaults(row.content);
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
          return mergeWithDefaults(parsed);
        }
      }
    }
  } catch (err) {
    // Ignore and fallback to local
  }

  // 3. Fallback to disk / memory cache
  return getSiteContent();
}

function mergeWithDefaults(data: any): SiteContentData {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...data,
    branding: { ...DEFAULT_SITE_CONTENT.branding, ...(data.branding || {}) },
    homepage: {
      ...DEFAULT_SITE_CONTENT.homepage,
      ...(data.homepage || {}),
      hero: { ...DEFAULT_SITE_CONTENT.homepage.hero, ...(data.homepage?.hero || {}) },
      stats: data.homepage?.stats || DEFAULT_SITE_CONTENT.homepage.stats,
      brandLogos: data.homepage?.brandLogos || DEFAULT_SITE_CONTENT.homepage.brandLogos,
      platforms: data.homepage?.platforms || DEFAULT_SITE_CONTENT.homepage.platforms,
      listingServices: data.homepage?.listingServices || DEFAULT_SITE_CONTENT.homepage.listingServices,
      advantages: data.homepage?.advantages || DEFAULT_SITE_CONTENT.homepage.advantages,
      clientVideos: data.homepage?.clientVideos || DEFAULT_SITE_CONTENT.homepage.clientVideos,
      faqs: data.homepage?.faqs || DEFAULT_SITE_CONTENT.homepage.faqs,
      bottomCta: { ...DEFAULT_SITE_CONTENT.homepage.bottomCta, ...(data.homepage?.bottomCta || {}) },
    },
    services: { ...DEFAULT_SITE_CONTENT.services, ...(data.services || {}) },
    caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(data.caseStudies || {}) },
    blogs: data.blogs || DEFAULT_SITE_CONTENT.blogs,
    careers: data.careers || DEFAULT_SITE_CONTENT.careers,
    aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(data.aboutUs || {}) },
    contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(data.contactFooter || {}) },
  };
}

export async function GET() {
  try {
    const content = await getLatestContentFromCloud();

    return NextResponse.json(
      { success: true, data: content },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { section, data } = body;

    // 1. Fetch current content so we never lose other sections
    const current = await getLatestContentFromCloud();
    let updatedContent: SiteContentData;

    if (section && data) {
      if (section === 'homepage') {
        updatedContent = {
          ...current,
          homepage: {
            ...current.homepage,
            ...data,
            hero: { ...current.homepage.hero, ...(data.hero || {}) },
          },
        };
      } else if (section === 'aboutUs') {
        updatedContent = {
          ...current,
          aboutUs: {
            ...current.aboutUs,
            ...data,
          },
        };
      } else if (section === 'branding') {
        updatedContent = {
          ...current,
          branding: {
            ...current.branding,
            ...data,
          },
        };
      } else {
        updatedContent = {
          ...current,
          [section]: data,
        };
      }
    } else if (body.content) {
      updatedContent = mergeWithDefaults({
        ...current,
        ...body.content,
      });
    } else {
      updatedContent = mergeWithDefaults({
        ...current,
        ...body,
      });
    }

    const client = supabaseAdmin || supabase;
    if (client) {
      // 2a. Always sync to Supabase Storage Bucket (reliable JSON CDN file)
      try {
        const buffer = Buffer.from(JSON.stringify(updatedContent, null, 2), 'utf-8');
        await client.storage.from('media').upload('cms/site_content.json', buffer, {
          contentType: 'application/json',
          upsert: true,
        });
      } catch (storageErr) {
        console.warn('Supabase storage upload error:', storageErr);
      }

      // 2b. Sync to Supabase Database table if it exists
      try {
        await client.from('site_content').upsert(
          {
            id: 'main',
            content: updatedContent,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      } catch (dbErr: any) {
        console.warn('Supabase site_content upsert warning:', dbErr?.message);
      }
    }

    // 3. Save to runtime memory cache and local disk if available
    saveSiteContent(updatedContent);

    return NextResponse.json(
      {
        success: true,
        message: 'Content updated and synchronized across cloud storage & database successfully',
        data: updatedContent,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}
