import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return buildNextMetadataForRoute('/portfolio');
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd urlPath="/portfolio" />
      {children}
    </>
  );
}
