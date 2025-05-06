import React from "react";

import { getUser } from "@/lib/get-user";
import {
  CurrentLPSectionSkeleton,
  LPCardSkeletonSection,
} from "@/components/pages/dashboard/loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeacherDashboard() {
  return (
    <div className="dashboard py-14 px-12 flex gap-10 flex-col items-center ">
      <section className="text-2xl font-bold flex w-full py-4 px-6">
        <p>Welcome back</p>
        <span className="ml-auto ">
          Academic Year: <Skeleton className="w-20 inline-block" />
        </span>
      </section>
      {/* <WelcomeBack user={user} academicYear={academicYear} /> */}
      <div className="grid grid-cols-1 gap-10">
        <CurrentLPSectionSkeleton />
        <LPCardSkeletonSection />
      </div>
    </div>
  );
}
