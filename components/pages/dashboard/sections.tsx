import { DashboardStats } from "@/types";
import { LearningPeriodCard } from "./learning-period-card";
import { ProgressCard } from "./progress-card";
import { TrackArrow, TrackRow } from "./track-row";

export const SectionWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="flex gap-10 flex-wrap justify-center">
      {children}
    </section>
  );
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
        percentage={stats.currentLP.compliance}
      />
      {children}

      <div className="flex-1">
        {stats.beforeThePreviousOne.learningPeriods.length > 0 && (
          <>
            <TrackRow item={stats.beforeThePreviousOne} />
            <TrackArrow />
          </>
        )}
        {stats.previousLP.learningPeriods.length > 0 && (
          <>
            <TrackRow item={stats.previousLP} />
            <TrackArrow />
          </>
        )}
        <TrackRow item={stats.currentLP} />
        {stats.upcomingLP.learningPeriods.length > 0 && (
          <>
            <TrackArrow />
            <TrackRow item={stats.upcomingLP} />
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export const LPCardsSection = ({
  children,
  stats,
}: React.PropsWithChildren<{ stats: DashboardStats }>) => {
  return (
    <SectionWrapper>
      {children}
      <LearningPeriodCard
        title="Current Learning Period"
        stats={stats.currentLP}
        isCurrentLP={true}
      />
      {stats.upcomingLP.learningPeriods.length > 0 && (
        <LearningPeriodCard
          title="Upcoming Learning Period"
          stats={stats.upcomingLP}
        />
      )}
    </SectionWrapper>
  );
};
