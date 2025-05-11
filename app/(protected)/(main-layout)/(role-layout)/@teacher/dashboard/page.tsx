import React from "react";
import {
  CurrentLPSection,
  LPCardsSection,
  PageWrapper,
} from "@/components/pages/dashboard/sections";
import { getUser } from "@/lib/get-user";
import { getDashboardStats } from "@/lib/api/statistic";
import { rolePage } from "@/components/layouts/role-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
};

async function Dashboard() {
  const user = await getUser();
  const stats = await getDashboardStats();

  return (
    <PageWrapper user={user!} stats={stats}>
      <CurrentLPSection stats={stats} />
      <LPCardsSection stats={stats} />
    </PageWrapper>
  );
}

export default rolePage(Dashboard, ["TEACHER"]);
