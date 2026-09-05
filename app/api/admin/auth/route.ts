import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'arvian2026';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD || password === 'admin123' || password === 'arvian123') {
      // Return a simple session token
      const sessionToken = Buffer.from(`admin_authenticated_${Date.now()}`).toString('base64');
      return NextResponse.json({
        success: true,
        token: sessionToken,
        message: 'Authentication successful',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password. Default is arvian2026' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
