import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const cleanSlug = (serviceSlug || '').replace(/\.php$/i, '');
  return buildNextMetadataForRoute(`/${cleanSlug}`);
}

export default async function DynamicServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const cleanSlug = (serviceSlug || '').replace(/\.php$/i, '');
  return (
    <>
      <SeoJsonLd urlPath={`/${cleanSlug}`} />
      {children}
    </>
  );
}
