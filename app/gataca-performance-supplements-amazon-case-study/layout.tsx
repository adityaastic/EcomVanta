import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadataForRoute } from '@/lib/seoServer';
import SeoJsonLd from '@/components/SeoJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return buildNextMetadataForRoute('/gataca-performance-supplements-amazon-case-study');
}

export default function GatacaCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd urlPath="/gataca-performance-supplements-amazon-case-study" />
      {children}
    </>
  );
}
