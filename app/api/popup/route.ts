import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

function saveLocalLead(lead: any) {
  try {
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
    }
    leads.unshift({
      id: Date.now().toString(),
      ...lead,
      status: 'New',
      created_at: new Date().toISOString(),
    });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
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
