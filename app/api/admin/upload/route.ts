import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let mediaList: any[] = [];
    const client = supabaseAdmin || supabase;

    if (client) {
      try {
        const { data: files, error } = await client.storage.from('media').list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        });
        if (!error && files && files.length > 0) {
          mediaList = files
            .filter((f) => f.name !== '.emptyFolderPlaceholder')
            .map((f) => {
              const { data: pUrl } = client.storage.from('media').getPublicUrl(f.name);
              return {
                name: f.name,
                url: pUrl.publicUrl,
                size: f.metadata?.size || 0,
                createdAt: f.created_at || new Date(),
              };
            });
          return NextResponse.json({ success: true, media: mediaList });
        }
      } catch (sbErr) {
        console.warn('Failed to list from Supabase storage:', sbErr);
      }
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        mediaList = files.map((filename) => {
          try {
            const filePath = path.join(uploadDir, filename);
            const stats = fs.statSync(filePath);
            return {
              name: filename,
              url: `/uploads/${filename}`,
              size: stats.size,
              createdAt: stats.birthtime,
            };
          } catch {
            return {
              name: filename,
              url: `/uploads/${filename}`,
              size: 0,
              createdAt: new Date(),
            };
          }
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    } catch (fsErr) {
      console.warn('Cannot read uploads directory (serverless environment):', fsErr);
    }

    return NextResponse.json({ success: true, media: mediaList });
  } catch (error: any) {
    return NextResponse.json({ success: true, media: [] });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form data' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || 'image/png';
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${sanitizedOriginalName}`;
    let finalUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

    // 1. Upload to Supabase Storage (Public media bucket)
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data: uploadData, error: uploadErr } = await client.storage
          .from('media')
          .upload(filename, buffer, {
            contentType: mimeType,
            upsert: true,
          });

        if (!uploadErr && uploadData) {
          const { data: publicUrlData } = client.storage
            .from('media')
            .getPublicUrl(filename);

          if (publicUrlData?.publicUrl) {
            finalUrl = publicUrlData.publicUrl;
          }
        } else if (uploadErr) {
          console.warn('Supabase storage upload warning:', uploadErr.message);
        }
      } catch (sbErr: any) {
        console.warn('Supabase storage upload exception:', sbErr?.message);
      }
    }

    // 2. Local filesystem write fallback
    if (finalUrl.startsWith('data:')) {
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        finalUrl = `/uploads/${filename}`;
      } catch (fsErr: any) {
        console.warn('Using base64 fallback for upload:', fsErr?.message);
      }
    }

    return NextResponse.json({
      success: true,
      url: finalUrl,
      filename,
      size: file.size,
      type: mimeType,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('file');

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Filename parameter is required' },
        { status: 400 }
      );
    }

    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        await client.storage.from('media').remove([filename]);
      } catch (sbErr) {
        console.warn('Supabase remove failed:', sbErr);
      }
    }

    try {
      const safeName = path.basename(filename);
      const filePath = path.join(process.cwd(), 'public', 'uploads', safeName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fsErr) {
      console.warn('Could not unlink file:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: `File processed successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'File deletion failed' },
      { status: 500 }
    );
  }
}
