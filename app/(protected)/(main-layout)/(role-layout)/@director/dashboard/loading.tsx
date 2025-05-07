import React from "react";

import {
  CurrentLPSectionSkeleton,
  LPCardSkeletonSection,
} from "@/components/pages/dashboard/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressCardSkeleton } from "@/components/pages/dashboard/progress-card";

export default function TeacherDashboard() {
  return (
    <div className="dashboard py-14 px-12 flex gap-10 flex-col items-center ">
      <section className="text-2xl font-bold flex w-full py-4 px-6">
        <p>Welcome back</p>
        <span className="ml-auto ">
          Academic Year: <Skeleton className="w-20 inline-block" />
        </span>
      </section>
      <div className="grid grid-cols-1 gap-10">
        <CurrentLPSectionSkeleton />
        <LPCardSkeletonSection>
          <ProgressCardSkeleton
            className="md:w-[19.75rem]"
            title="Year to Date"
          />
        </LPCardSkeletonSection>
      </div>
    </div>
  );
}
