'use client';

import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';
import { CASE_STUDIES_DATA } from '@/lib/caseStudyData';

export default function KayKayCaseStudyPage() {
  const data = CASE_STUDIES_DATA['kay-kay-industries-amazon-case-study'];
  return <CaseStudyTemplate data={data} />;
}
