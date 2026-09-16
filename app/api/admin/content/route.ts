import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, SiteContentData, DEFAULT_SITE_CONTENT } from '@/lib/cms';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data: row, error } = await client
          .from('site_content')
          .select('content')
          .eq('id', 'main')
          .maybeSingle();

        if (!error && row && row.content) {
          const merged: SiteContentData = {
            ...DEFAULT_SITE_CONTENT,
            ...row.content,
            branding: { ...DEFAULT_SITE_CONTENT.branding, ...(row.content.branding || {}) },
            homepage: { ...DEFAULT_SITE_CONTENT.homepage, ...(row.content.homepage || {}) },
            services: { ...DEFAULT_SITE_CONTENT.services, ...(row.content.services || {}) },
            caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(row.content.caseStudies || {}) },
            blogs: row.content.blogs || DEFAULT_SITE_CONTENT.blogs,
            careers: row.content.careers || DEFAULT_SITE_CONTENT.careers,
            aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(row.content.aboutUs || {}) },
            contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(row.content.contactFooter || {}) },
          };

          return NextResponse.json(
            { success: true, data: merged },
            {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
              },
            }
          );
        }
      } catch (sbErr) {
        console.warn('Supabase site_content query warning:', sbErr);
      }
    }

    const content = getSiteContent();
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

    const currentContent = getSiteContent();
    let updatedContent: SiteContentData;

    if (section && data) {
      updatedContent = {
        ...currentContent,
        [section]: data,
      };
    } else if (body.content) {
      updatedContent = {
        ...currentContent,
        ...body.content,
      };
    } else {
      updatedContent = {
        ...currentContent,
        ...body,
      };
    }

    // 1. Try saving to Supabase Database
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        await client.from('site_content').upsert(
          {
            id: 'main',
            content: updatedContent,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      } catch (sbErr: any) {
        console.warn('Supabase site_content upsert warning:', sbErr?.message);
      }
    }

    // 2. Save to local storage cache / local disk if writable
    saveSiteContent(updatedContent);

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      data: updatedContent,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}
