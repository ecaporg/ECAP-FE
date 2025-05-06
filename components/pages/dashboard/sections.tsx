import { DashboardStats } from "@/types";
import { LearningPeriodCard } from "./learning-period-card";
import { ProgressCard } from "./progress-card";
import { TrackArrow, TrackRow } from "./track-row";
import { getShortLearningPeriodName, mergeLearningPeriods } from "@/utils";

export const SectionWrapper = ({ children }: React.PropsWithChildren) => {
  return <section className="flex gap-10 flex-wrap">{children}</section>;
};

export const CurrentLPSection = ({
  children,
  stats,
}: React.PropsWithChildren<{ stats: DashboardStats }>) => {
  return (
    <SectionWrapper>
      <ProgressCard
        className="md:w-[19.75rem]"
        title="Current LP Compliance"
        percentage={stats.currentCompliance}
      />
      {children}

      <div className="flex-1">
        <TrackRow
          track={}
          dateRange="July 1 - Aug 3"
          status="Complete"
          statusColor="text-green-500"
        />
        <TrackArrow />
        <TrackRow
          track="Track A: LP3, Track B: LP1"
          dateRange="Aug 28 - Oct 4"
          status="Incomplete"
          statusColor="text-red-500"
        />
        <TrackArrow />
        <TrackRow
          track="Track A: LP4, Track B: LP2"
          dateRange="Oct 7 - Nov 22"
          status="In Progress"
          statusColor="text-blue-500"
        />
        <TrackArrow />
        <TrackRow
          track="Track A: LP5, Track B: LP3"
          dateRange="Dec 2 - Jan 17"
          status="Upcoming"
          statusColor="text-gray-500"
        />
      </div>
    </SectionWrapper>
  );
};

export const LPCardsSection = ({ children }: React.PropsWithChildren) => {
  return (
    <SectionWrapper>
      {children}
      <LearningPeriodCard
        title="Current Learning Period"
        track="Track A: LP5, Track B: LP3"
        fields={[
          { label: "Date:", value: "Dec 2 - Jan 17" },
          { label: "Deadline:", value: "Jan 24" },
          {
            label: "Status:",
            value: "In Progress",
            className: "text-primary",
          },
          { label: "Compliance:", value: "0%", className: "text-primary" },
        ]}
      />
      <LearningPeriodCard
        track="Track A: LP5, Track B: LP3"
        title="Upcoming Learning Period"
        fields={[
          { label: "Date:", value: "Dec 2 - Jan 17" },
          { label: "Deadline:", value: "Jan 24" },
          {
            label: "Status:",
            value: "In Progress",
            className: "text-darker-gray",
          },
          {
            label: "Compliance:",
            value: "0%",
            className: "text-darker-gray",
          },
        ]}
      />
    </SectionWrapper>
  );
};
