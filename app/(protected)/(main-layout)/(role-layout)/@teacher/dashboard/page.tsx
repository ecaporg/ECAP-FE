import React from "react";
import {
  CurrentLPSection,
  LPCardsSection,
  PageWrapper,
} from "@/components/pages/dashboard/sections";
import { getUser } from "@/lib/get-user";
import { getDashboardStats } from "@/lib/statistic";
import { WelcomeBack } from "@/components/pages/dashboard/welcome-back";

export default async function TeacherDashboard() {
  const user = await getUser();
  const stats = await getDashboardStats();

  return (
    <PageWrapper user={user!} stats={stats}>
      <CurrentLPSection stats={stats} />
      <LPCardsSection stats={stats} />
    </PageWrapper>
  );
}
