'use client';

import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';
import { CASE_STUDIES_DATA } from '@/lib/caseStudyData';

export default function SaiGalleryCaseStudyPage() {
  const data = CASE_STUDIES_DATA['sai-gallery-agarbatti-brand-amazon-case-study'];
  return <CaseStudyTemplate data={data} />;
}
