import { NextResponse } from 'next/server';
import { AdminUserRole } from '@/lib/seoTypes';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ecomvanta2026';

const ROLE_PASSWORDS: Record<string, { role: AdminUserRole; name: string }> = {
  [ADMIN_PASSWORD]: { role: 'super_admin', name: 'Aditya (Super Admin)' },
  ecomvanta2026: { role: 'super_admin', name: 'Aditya (Super Admin)' },
  ecomvanta123: { role: 'super_admin', name: 'Aditya (Super Admin)' },
  arvian2026: { role: 'super_admin', name: 'Aditya (Super Admin)' },
  admin123: { role: 'super_admin', name: 'Aditya (Super Admin)' },
  arvian123: { role: 'super_admin', name: 'Aditya (Super Admin)' },
  seo2026: { role: 'seo_manager', name: 'SEO Lead' },
  editor2026: { role: 'content_editor', name: 'Content Editor' },
  techseo2026: { role: 'technical_seo', name: 'Technical SEO Specialist' },
  analyst2026: { role: 'seo_analyst', name: 'SEO Analyst' },
};

export async function POST(req: Request) {
  try {
    const { password, requestedRole } = await req.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    const matched = ROLE_PASSWORDS[password];
    if (matched) {
      const role: AdminUserRole = requestedRole || matched.role;
      const sessionPayload = {
        authenticated: true,
        role,
        name: matched.name,
        issuedAt: Date.now(),
      };
      const sessionToken = Buffer.from(JSON.stringify(sessionPayload)).toString('base64');
      return NextResponse.json({
        success: true,
        token: sessionToken,
        role,
        name: matched.name,
        message: 'Authentication successful',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error:
          'Invalid password. Use ecomvanta2026 (Super Admin), seo2026 (SEO Manager), editor2026 (Content Editor), or techseo2026 (Technical SEO).',
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
