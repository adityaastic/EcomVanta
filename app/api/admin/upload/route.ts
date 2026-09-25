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

function getFileMimeType(file: File): string {
  if (file.type && file.type !== 'application/octet-stream') {
    return file.type;
  }
  const ext = path.extname(file.name).toLowerCase();
  const mimeMap: Record<string, string> = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.ogg': 'video/ogg',
    '.ogv': 'video/ogg',
    '.mkv': 'video/x-matroska',
    '.avi': 'video/x-msvideo',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
  };
  return mimeMap[ext] || 'application/octet-stream';
}

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isSignRequest = searchParams.get('sign') === '1';
    const contentTypeHeader = req.headers.get('content-type') || '';

    // Handle Signed Upload URL Request (Bypasses Vercel 4.5MB Serverless Body Limit)
    if (isSignRequest || contentTypeHeader.includes('application/json')) {
      try {
        const body = await req.json();
        const { filename, contentType, size } = body;

        const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
        if (size && size > MAX_FILE_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: `File size (${(size / (1024 * 1024)).toFixed(1)}MB) exceeds 50MB upload limit.`,
            },
            { status: 413 }
          );
        }

        const safeFilename = filename ? `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}` : `${Date.now()}_asset`;
        const client = supabaseAdmin || supabase;

        if (client) {
          const { data: signData, error: signErr } = await client.storage
            .from('media')
            .createSignedUploadUrl(safeFilename);

          if (!signErr && signData) {
            const { data: pUrl } = client.storage.from('media').getPublicUrl(safeFilename);
            return NextResponse.json({
              success: true,
              signedUrl: signData.signedUrl,
              token: signData.token,
              path: safeFilename,
              publicUrl: pUrl.publicUrl,
            });
          }
        }
      } catch (signCatchErr) {
        console.warn('Signed upload URL generation exception:', signCatchErr);
      }
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form data' },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 50MB upload limit. Please compress or optimize the video.`,
        },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = getFileMimeType(file);
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${sanitizedOriginalName}`;
    let finalUrl = '';

    // 1. Upload to Supabase Storage (Public media bucket)
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        const { data: uploadData, error: uploadErr } = await client.storage
          .from('media')
          .upload(filename, buffer, {
            contentType: mimeType,
            upsert: true,
            cacheControl: '3600',
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

    // 2. Local filesystem write fallback (if Supabase upload did not produce a URL)
    if (!finalUrl) {
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        finalUrl = `/uploads/${filename}`;
      } catch (fsErr: any) {
        console.warn('Local file write fallback failed:', fsErr?.message);
      }
    }

    // 3. Fallback to base64 if both cloud & disk write fail
    if (!finalUrl) {
      finalUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
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
