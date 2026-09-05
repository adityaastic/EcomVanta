import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

declare global {
  var __LEADS_CACHE__: any[] | undefined;
}

function saveLocalLead(lead: any) {
  try {
    let leads: any[] = [];
    if (globalThis.__LEADS_CACHE__ && Array.isArray(globalThis.__LEADS_CACHE__)) {
      leads = [...globalThis.__LEADS_CACHE__];
    } else if (fs.existsSync(LEADS_FILE)) {
      try {
        leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
      } catch {
        leads = [];
      }
    }

    leads.unshift({
      id: Date.now().toString(),
      ...lead,
      status: 'New',
      created_at: new Date().toISOString(),
    });

    globalThis.__LEADS_CACHE__ = leads;

    try {
      const dir = path.dirname(LEADS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Cannot write leads to disk on serverless:', fsErr);
    }
  } catch (err) {
    console.error('Error saving local popup lead:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, city, message, sourcePage } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and mobile number are required.' },
        { status: 400 }
      );
    }

    const leadData = {
      name,
      email,
      phone,
      city: city || '',
      message: message || '',
      source_page: sourcePage || 'Consultation Popup',
      type: 'Popup Modal',
    };

    saveLocalLead(leadData);

    if (supabase) {
      const { data, error } = await supabase.from('leads').insert([
        {
          name,
          email,
          phone,
          city: city || '',
          message: message || '',
          source_page: sourcePage || 'Consultation Popup',
        },
      ]);

      if (error) {
        console.error('Supabase insertion error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! Our ecommerce specialist will contact you soon.',
    });
  } catch (error) {
    console.error('Popup API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
