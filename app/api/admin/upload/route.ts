import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const files = fs.readdirSync(uploadDir);
    const mediaList = files.map((filename) => {
      const filePath = path.join(uploadDir, filename);
      const stats = fs.statSync(filePath);
      return {
        name: filename,
        url: `/uploads/${filename}`,
        size: stats.size,
        createdAt: stats.birthtime,
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, media: mediaList });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to list media files' },
      { status: 500 }
    );
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

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean up filename to be safe
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${sanitizedOriginalName}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
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

    // Sanitize to prevent path traversal
    const safeName = path.basename(filename);
    const filePath = path.join(process.cwd(), 'public', 'uploads', safeName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({
        success: true,
        message: `File ${safeName} deleted successfully`,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'File not found in uploads' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'File deletion failed' },
      { status: 500 }
    );
  }
}
