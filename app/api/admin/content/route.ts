import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent, SiteContentData } from '@/lib/cms';

export async function GET() {
  try {
    const content = getSiteContent();
    return NextResponse.json({ success: true, data: content });
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

    const saved = saveSiteContent(updatedContent);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Failed to write content to disk' },
        { status: 500 }
      );
    }

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
