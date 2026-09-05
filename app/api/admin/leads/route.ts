import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

const INITIAL_DEMO_LEADS = [
  {
    id: 'lead-1',
    name: 'Rajesh Sharma',
    email: 'rajesh@sharmatraders.com',
    phone: '+91 98112 34567',
    city: 'New Delhi',
    service: 'Amazon Account Management',
    message: 'Looking to optimize our Amazon listing and run sponsored brand ads for home textile brand.',
    source_page: 'Homepage Consultation Form',
    type: 'Inquiry',
    status: 'New',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Pooja Verma',
    email: 'pooja.verma@organicglow.in',
    phone: '+91 97123 45678',
    city: 'Mumbai',
    service: 'Blinkit & Zepto Onboarding',
    message: 'We have an Ayurvedic skincare line with 15 SKUs. Need quick commerce listing across Mumbai & Pune.',
    source_page: 'Blinkit Service Page',
    type: 'Inquiry',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'lead-3',
    name: 'Vikram Mehta',
    email: 'vmehta@nutrifit.co.in',
    phone: '+91 99887 76655',
    city: 'Bangalore',
    service: 'Flipkart Account Management',
    message: 'Want to scale our protein supplements GMV on Flipkart Big Billion Days.',
    source_page: 'Popup Modal',
    type: 'Popup Modal',
    status: 'Converted',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  }
];

declare global {
  var __LEADS_CACHE__: any[] | undefined;
}

function readLeads(): any[] {
  if (globalThis.__LEADS_CACHE__ && globalThis.__LEADS_CACHE__.length > 0) {
    return globalThis.__LEADS_CACHE__;
  }

  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      globalThis.__LEADS_CACHE__ = parsed;
      return parsed;
    }
  } catch (err) {
    console.error('Error reading leads:', err);
  }

  globalThis.__LEADS_CACHE__ = INITIAL_DEMO_LEADS;
  return INITIAL_DEMO_LEADS;
}

function writeLeads(leads: any[]): boolean {
  globalThis.__LEADS_CACHE__ = leads;
  try {
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Serverless environment (read-only fs). Leads saved in runtime memory:', err);
  }
  return true;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const leads = readLeads();

    if (searchParams.get('export') === 'csv') {
      const headers = 'Date,Name,Email,Phone,City,Service,Status,Source,Message\n';
      const rows = leads.map((l: any) => {
        const date = l.created_at ? new Date(l.created_at).toLocaleDateString() : '';
        const sanitize = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
        return [
          sanitize(date),
          sanitize(l.name),
          sanitize(l.email),
          sanitize(l.phone),
          sanitize(l.city),
          sanitize(l.service),
          sanitize(l.status),
          sanitize(l.source_page),
          sanitize(l.message),
        ].join(',');
      }).join('\n');

      return new Response(headers + rows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="leads_export_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const leads = readLeads();
    const index = leads.findIndex((l: any) => l.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    leads[index].status = status;
    writeLeads(leads);

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      lead: leads[index],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    let leads = readLeads();
    leads = leads.filter((l: any) => l.id !== id);
    writeLeads(leads);

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
