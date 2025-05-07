import React from "react";
import { LearningPeriodCard } from "@/components/pages/dashboard/learning-period-card";
import { ProgressCard } from "@/components/pages/dashboard/progress-card";
import { StatisticsList } from "@/components/pages/dashboard/statistics-list";
import { TrackArrow, TrackRow } from "@/components/pages/dashboard/track-row";
import {
  CurrentLPSection,
  LPCardsSection,
} from "@/components/pages/dashboard/sections";
import { getUser } from "@/lib/get-user";
import { getDashboardStats } from "@/lib/statistic";
import { WelcomeBack } from "@/components/pages/dashboard/welcome-back";

export default async function TeacherDashboard() {
  const user = await getUser();
  const stats = await getDashboardStats();

  return (
    <div className="dashboard py-14 px-12 flex gap-10 flex-col items-center ">
      <WelcomeBack user={user!} academicYear={stats.academicYear} />
      <div className="grid grid-cols-1 gap-10">
        <CurrentLPSection stats={stats} />
        <LPCardsSection stats={stats}>
          <ProgressCard
            className="md:w-[19.75rem]"
            title="Year to Date"
            percentage={stats.yearToDateCompliance ?? 0}
          />
        </LPCardsSection>
      </div>
    </div>
  );
}
