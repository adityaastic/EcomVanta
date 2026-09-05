'use client';

import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';
import { CASE_STUDIES_DATA } from '@/lib/caseStudyData';

export default function GatacaCaseStudyPage() {
  const data = CASE_STUDIES_DATA['gataca-performance-supplements-amazon-case-study'];
  return <CaseStudyTemplate data={data} />;
}
