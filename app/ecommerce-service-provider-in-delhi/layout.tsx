import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return buildNextMetadataForRoute('/ecommerce-service-provider-in-delhi');
}

export default function EcommerceDelhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd urlPath="/ecommerce-service-provider-in-delhi" />
      {children}
    </>
  );
}
