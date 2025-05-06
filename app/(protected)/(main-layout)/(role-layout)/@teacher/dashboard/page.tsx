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

export default async function TeacherDashboard() {
  const user = await getUser();
  // const stats = getDashboardStats();
  await new Promise((resolve) => setTimeout(resolve, 100000));

  return (
    <div className="dashboard py-14 px-12 flex gap-10 flex-col items-center ">
      <section className="text-2xl font-bold flex w-full py-4 px-6">
        <p>Welcome back, [Teacher Name]</p>
        <span className="ml-auto ">Academic Year: [2024-2025]</span>
      </section>
      {/* <WelcomeBack user={user} academicYear={academicYear} /> */}
      <div className="grid grid-cols-1 gap-10">
        <CurrentLPSection />
        <LPCardsSection />
      </div>
    </div>
  );
}
