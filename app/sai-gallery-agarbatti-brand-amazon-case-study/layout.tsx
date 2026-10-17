import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return buildNextMetadataForRoute('/sai-gallery-agarbatti-brand-amazon-case-study');
}

export default function SaiGalleryCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd urlPath="/sai-gallery-agarbatti-brand-amazon-case-study" />
      {children}
    </>
  );
}
