import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    let mediaList: any[] = [];

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
    const base64DataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${sanitizedOriginalName}`;
    let finalUrl = base64DataUrl;

    // Attempt to write to public/uploads (works in local dev, may be read-only in serverless/Vercel)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);
      finalUrl = `/uploads/${filename}`;
    } catch (fsErr: any) {
      // In serverless (Vercel Lambda), filesystem is read-only.
      // Base64 Data URL is used directly and works universally in all browsers and <img> tags!
      console.warn('Using Base64 Data URL fallback for upload on serverless:', fsErr?.message);
      finalUrl = base64DataUrl;
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
