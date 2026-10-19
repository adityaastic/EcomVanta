import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import {
  createR2PresignedPutUrl,
  putR2Object,
  deleteR2Object,
  listR2Objects,
} from '@/lib/r2';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60;

export async function GET() {
  try {
    let mediaList: any[] = [];

    // 1. Primary: List from Cloudflare R2 bucket
    try {
      const r2Files = await listR2Objects(100);
      if (r2Files && r2Files.length > 0) {
        mediaList.push(...r2Files);
      }
    } catch (r2Err) {
      console.warn('Failed to list from Cloudflare R2:', r2Err);
    }

    // 2. Also include local /public/uploads files if present
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        const existingNames = new Set(mediaList.map((m) => m.name));
        const localFiles = files
          .filter((f) => !existingNames.has(f))
          .map((filename) => {
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
          });
        mediaList.push(...localFiles);
      }
    } catch (fsErr) {
      // Serverless environment
    }

    mediaList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  return mimeMap[ext] || 'application/octet-stream';
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isSignRequest = searchParams.get('sign') === '1';
    const contentTypeHeader = req.headers.get('content-type') || '';
    const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

    // 1. Handle Direct Presigned Upload URL Request (Bypasses Vercel 4.5MB Serverless Body Limit for large videos up to 500MB)
    if (isSignRequest || contentTypeHeader.includes('application/json')) {
      try {
        const body = await req.json();
        const { filename, contentType, size } = body;

        if (size && size > MAX_FILE_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: `File size (${(size / (1024 * 1024)).toFixed(1)}MB) exceeds 500MB upload limit.`,
            },
            { status: 413 }
          );
        }

        const safeFilename = filename
          ? `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`
          : `${Date.now()}_asset`;

        // Generate Cloudflare R2 S3 Presigned PUT URL
        const r2Sign = createR2PresignedPutUrl(
          safeFilename,
          contentType || 'application/octet-stream',
          3600
        );

        return NextResponse.json({
          success: true,
          provider: 'r2',
          signedUrl: r2Sign.signedUrl,
          path: r2Sign.key,
          publicUrl: r2Sign.publicUrl,
        });
      } catch (signCatchErr) {
        console.warn('R2 presigned upload URL generation exception:', signCatchErr);
      }

      return NextResponse.json(
        { success: false, error: 'Direct signed URL unavailable, use standard upload fallback' },
        { status: 200 }
      );
    }

    // 2. Standard Multipart Upload (Uploads directly to Cloudflare R2 via REST API v4)
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form data' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 500MB upload limit.`,
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

    // 2a. Primary Cloud Upload: Cloudflare R2 (Zero Egress, 10GB Free Storage)
    const r2Result = await putR2Object(filename, buffer, mimeType);
    if (r2Result.success && r2Result.publicUrl) {
      finalUrl = r2Result.publicUrl;
    } else if (r2Result.error) {
      console.warn('Cloudflare R2 upload warning:', r2Result.error);
    }

    // 2b. Local filesystem write fallback (if R2 upload did not produce a URL)
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

    // 2c. Fallback to base64 if both cloud & disk write fail
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

    // 1. Delete from Cloudflare R2
    try {
      await deleteR2Object(filename);
    } catch (r2Err) {
      console.warn('R2 remove warning:', r2Err);
    }

    // 2. Delete from Supabase if active
    const client = supabaseAdmin || supabase;
    if (client) {
      try {
        await client.storage.from('media').remove([filename]);
      } catch {}
    }

    // 3. Delete from local /public/uploads if present
    try {
      const safeName = path.basename(filename);
      const filePath = path.join(process.cwd(), 'public', 'uploads', safeName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'File deletion failed' },
      { status: 500 }
    );
  }
}
