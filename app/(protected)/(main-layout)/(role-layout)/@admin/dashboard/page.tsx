import React from "react";
import { ProgressCard } from "@/components/pages/dashboard/progress-card";
import {
  CurrentLPSection,
  LPCardsSection,
  PageWrapper,
} from "@/components/pages/dashboard/sections";
import { getUser } from "@/lib/get-user";
import { getDashboardStats } from "@/lib/statistic";
import { rolePage } from "@/components/layouts/role-page";
import { StatisticsList } from "@/components/pages/dashboard/statistics-list";

async function Dashboard() {
  const user = await getUser();
  const stats = await getDashboardStats();

  return (
    <PageWrapper user={user!} stats={stats}>
      <CurrentLPSection stats={stats}>
        <ProgressCard
          className="md:w-[19.75rem]"
          title="Year to Date"
          percentage={stats.yearToDateCompliance ?? 0}
        />
      </CurrentLPSection>
      <LPCardsSection stats={stats}>
        <StatisticsList items={stats.academies ?? []} />
      </LPCardsSection>
    </PageWrapper>
  );
}

export default rolePage(Dashboard, ["ADMIN", "SUPER_ADMIN"]);
