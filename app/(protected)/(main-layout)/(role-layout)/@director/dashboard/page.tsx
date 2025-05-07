import React from "react";
import { ProgressCard } from "@/components/pages/dashboard/progress-card";
import {
  CurrentLPSection,
  LPCardsSection,
  PageWrapper,
} from "@/components/pages/dashboard/sections";
import { getUser } from "@/lib/get-user";
import { getDashboardStats } from "@/lib/statistic";

export default async function TeacherDashboard() {
  const user = await getUser();
  const stats = await getDashboardStats();

  return (
    <PageWrapper user={user!} stats={stats}>
      <CurrentLPSection stats={stats} />
      <LPCardsSection stats={stats}>
        <ProgressCard
          className="md:w-[19.75rem]"
          title="Year to Date"
          percentage={stats.yearToDateCompliance ?? 0}
        />
      </LPCardsSection>
    </PageWrapper>
  );
}
