import React from 'react';

import {
  CurrentLPSectionSkeleton,
  LPCardSkeletonSection,
  PageLoadingWrapper,
} from '@/components/pages/dashboard/loading';
import { ProgressCardSkeleton } from '@/components/pages/dashboard/progress-card';
import { StatisticsListSkeleton } from '@/components/pages/dashboard/statistics-list';

export default function TeacherDashboard() {
  return (
    <PageLoadingWrapper>
      <CurrentLPSectionSkeleton>
        <ProgressCardSkeleton title="Year to Date" />
      </CurrentLPSectionSkeleton>
      <LPCardSkeletonSection>
        <StatisticsListSkeleton />
      </LPCardSkeletonSection>
    </PageLoadingWrapper>
  );
}
