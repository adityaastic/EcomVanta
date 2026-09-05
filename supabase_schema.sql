-- ========================================================
-- Supabase Schema for Arvian eCommerce Solutions Clone
-- Run this in your Supabase SQL Editor: https://app.supabase.com
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Leads Table (For Modal / Quick Book Popups)
create table if not exists public.leads (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    phone text not null,
    city text,
    message text,
    source_page text default 'Website Popup',
    status text default 'new'
);

-- 2. Inquiries Table (For Detailed Contact & Lead Gen Forms)
create table if not exists public.inquiries (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    first_name text not null,
    last_name text,
    email text not null,
    phone text not null,
    city text,
    service text,
    message text,
    source_page text default 'Contact Section',
    status text default 'new'
);

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;
alter table public.inquiries enable row level security;

-- Create policy to allow anonymous inserts (lead submissions from frontend)
create policy "Allow anonymous inserts to leads"
    on public.leads for insert
    to anon, authenticated
    with check (true);

create policy "Allow anonymous inserts to inquiries"
    on public.inquiries for insert
    to anon, authenticated
    with check (true);

-- Create policy for authenticated admins to read leads
create policy "Allow authenticated users to read leads"
    on public.leads for select
    to authenticated
    using (true);

create policy "Allow authenticated users to read inquiries"
    on public.inquiries for select
    to authenticated
    using (true);
