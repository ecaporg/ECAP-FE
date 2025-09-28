import { rolePage } from '@/components/layouts/role-page';
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
  title: 'Teacher Dashboard',
};

async function Dashboard() {
  const stats = await getDashboardStats();

  return (
    <PageWrapper stats={stats}>
      <CurrentLPSection stats={stats} />
      <LPCardsSection stats={stats} />
    </PageWrapper>
  );
}

export default rolePage(Dashboard, [RolesEnum.TEACHER]);
