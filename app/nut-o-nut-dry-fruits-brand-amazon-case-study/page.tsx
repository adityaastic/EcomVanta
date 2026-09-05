'use client';

import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';
import { CASE_STUDIES_DATA } from '@/lib/caseStudyData';

export default function NutONutCaseStudyPage() {
  const data = CASE_STUDIES_DATA['nut-o-nut-dry-fruits-brand-amazon-case-study'];
  return <CaseStudyTemplate data={data} />;
}
