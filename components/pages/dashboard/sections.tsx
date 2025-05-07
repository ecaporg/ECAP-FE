import { DashboardStats, TrackLearningPeriod } from "@/types";
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

const hasLPs = ({
  learningPeriods,
}: {
  learningPeriods: TrackLearningPeriod[];
}) => {
  return learningPeriods.length > 0;
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

      <div className="flex-1 md:min-w-96">
        {hasLPs(stats.beforeThePreviousOne) && (
          <>
            <TrackRow item={stats.beforeThePreviousOne} />
            <TrackArrow />
          </>
        )}
        {hasLPs(stats.previousLP) && (
          <>
            <TrackRow item={stats.previousLP} />
            <TrackArrow />
          </>
        )}
        {hasLPs(stats.currentLP) && <TrackRow item={stats.currentLP} />}
        {hasLPs(stats.upcomingLP) && (
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
      {hasLPs(stats.currentLP) && (
        <LearningPeriodCard
          title="Current Learning Period"
          stats={stats.currentLP}
          isCurrentLP={true}
        />
      )}
      {hasLPs(stats.upcomingLP) && (
        <LearningPeriodCard
          title="Upcoming Learning Period"
          stats={stats.upcomingLP}
        />
      )}
    </SectionWrapper>
  );
};
