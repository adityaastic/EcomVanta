import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return buildNextMetadataForRoute('/nut-o-nut-dry-fruits-brand-amazon-case-study');
}

export default function NutONutCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd urlPath="/nut-o-nut-dry-fruits-brand-amazon-case-study" />
      {children}
    </>
  );
}
