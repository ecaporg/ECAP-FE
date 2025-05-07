import React from "react";
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
        <LPCardsSection stats={stats} />
      </div>
    </div>
  );
}
