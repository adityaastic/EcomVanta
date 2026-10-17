import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return buildNextMetadataForRoute('/founder');
}

export default function FounderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd urlPath="/founder" />
      {children}
    </>
  );
}
