import { rolePage } from '@/components/layouts/role-page';
import { ProgressCard } from '@/components/pages/dashboard/progress-card';
import {
  CurrentLPSection,
  LPCardsSection,
  PageWrapper,
} from '@/components/pages/dashboard/sections';
import { getDashboardStats } from '@/lib/api/statistic';
import { RolesEnum } from 'ecap-lib/dist/constants';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Director Dashboard',
};

const Dashboard = async () => {
  const stats = await getDashboardStats();

  return (
    <PageWrapper stats={stats}>
      <CurrentLPSection stats={stats} />
      <LPCardsSection stats={stats}>
        <ProgressCard title="Year to Date" percentage={stats?.yearToDateCompliance ?? 0} />
      </LPCardsSection>
    </PageWrapper>
  );
};

export default rolePage(Dashboard, [RolesEnum.DIRECTOR]);
