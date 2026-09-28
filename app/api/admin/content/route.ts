import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, SiteContentData, DEFAULT_SITE_CONTENT, getLatestContentFromCloud, mergeWithDefaults } from '@/lib/cms';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      } else if (section === 'careerPage') {
        updatedContent = {
          ...current,
          careerPage: {
            ...current.careerPage,
            ...data,
          },
        };
      } else if (section === 'careers') {
        if (Array.isArray(data)) {
          updatedContent = {
            ...current,
            careers: data,
          };
        } else if (typeof data === 'object') {
          updatedContent = {
            ...current,
            careers: data.careers || current.careers,
            careerPage: data.careerPage ? { ...current.careerPage, ...data.careerPage } : current.careerPage,
          };
        } else {
          updatedContent = {
            ...current,
            careers: data,
          };
        }
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
