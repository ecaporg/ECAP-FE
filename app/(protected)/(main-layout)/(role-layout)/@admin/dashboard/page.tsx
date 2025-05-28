import { rolePage } from '@/components/layouts/role-page';
import { ProgressCard } from '@/components/pages/dashboard/progress-card';
import {
  CurrentLPSection,
  LPCardsSection,
  PageWrapper,
} from '@/components/pages/dashboard/sections';
import { StatisticsList } from '@/components/pages/dashboard/statistics-list';
import { getDashboardStats } from '@/lib/api/statistic';
import { getUser } from '@/lib/get-user';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

async function Dashboard() {
  const user = await getUser();
  const stats = await getDashboardStats();

  return (
    <PageWrapper user={user!} stats={stats}>
      <CurrentLPSection stats={stats}>
        <ProgressCard title="Year to Date" percentage={stats.yearToDateCompliance ?? 0} />
      </CurrentLPSection>
      <LPCardsSection stats={stats}>
        <StatisticsList items={stats.academies ?? []} />
      </LPCardsSection>
    </PageWrapper>
  );
}

export default rolePage(Dashboard, ['ADMIN', 'SUPER_ADMIN']);
