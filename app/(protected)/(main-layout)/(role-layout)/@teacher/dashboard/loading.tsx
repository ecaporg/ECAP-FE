import React from 'react';

import {
  CurrentLPSectionSkeleton,
  LPCardSkeletonSection,
  PageLoadingWrapper,
} from '@/components/pages/dashboard/loading';

export default function TeacherDashboard() {
  return (
    <PageLoadingWrapper>
      <CurrentLPSectionSkeleton />
      <LPCardSkeletonSection />
    </PageLoadingWrapper>
  );
}
