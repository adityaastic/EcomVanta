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
    console.error('Error saving local lead:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawName = body.name || '';
    const firstName = (body.firstName || (rawName ? rawName.split(' ')[0] : '')).trim();
    const lastName = (body.lastName || (rawName ? rawName.split(' ').slice(1).join(' ') : '')).trim();
    const { email, phone, city, service, message, sourcePage } = body;

    if ((!firstName && !rawName) || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const leadData = {
      name: `${firstName} ${lastName || ''}`.trim(),
      first_name: firstName,
      last_name: lastName || '',
      email,
      phone,
      city: city || '',
      service: service || '',
      message: message || '',
      source_page: sourcePage || 'Contact Form',
      type: 'Inquiry',
    };

    saveLocalLead(leadData);

    if (supabase) {
      const { data, error } = await supabase.from('inquiries').insert([
        {
          first_name: firstName,
          last_name: lastName || '',
          email,
          phone,
          city: city || '',
          service: service || '',
          message: message || '',
          source_page: sourcePage || 'Contact Form',
        },
      ]);

      if (error) {
        console.error('Supabase insertion error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been successfully submitted.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
