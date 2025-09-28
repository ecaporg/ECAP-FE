import type { DashboardStats, ITrackLearningPeriod, IUser } from '@/types';
import { cn } from '@/utils';
import { LearningPeriodCard, LearningPeriodEmptyCard } from './learning-period-card';
import { ProgressCard } from './progress-card';
import { TrackArrow, TrackRow } from './track-row';
import { WelcomeBack } from './welcome-back';

export const SectionWrapper = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <section
      className={cn(
        'flex w-full flex-wrap justify-center gap-9 md:min-w-[43rem] lg:min-w-[47.75rem] lg:gap-10',
        className
      )}
    >
      {children}
    </section>
  );
};

const hasLPs = ({
  learningPeriods,
}: {
  learningPeriods: ITrackLearningPeriod[];
}) => {
  return learningPeriods.length > 0;
};

export const CurrentLPSection = ({
  children,
  stats,
}: React.PropsWithChildren<{ stats: DashboardStats }>) => {
  const showEmptyPeriods = [
    stats.beforeThePreviousOne,
    stats.previousLP,
    stats.currentLP,
    stats.upcomingLP,
  ].every((item) => !hasLPs(item));

  return (
    <SectionWrapper>
      <ProgressCard title="Current LP Compliance" percentage={stats.currentLP.compliance} />
      {children}

      <div className="flex-1 lg:min-w-96">
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
            {hasLPs(stats.currentLP) && <TrackArrow />}
            <TrackRow item={stats.upcomingLP} />
          </>
        )}

        {showEmptyPeriods && (
          <div className="text-center text-muted-foreground">
            Ops! No Learning Periods to display
          </div>
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
    <SectionWrapper className="items-center">
      {children}
      {hasLPs(stats.currentLP) ? (
        <LearningPeriodCard
          title="Current Learning Period"
          stats={stats.currentLP}
          isCurrentLP={true}
        />
      ) : (
        <LearningPeriodEmptyCard title="Current Learning Period" />
      )}
      {hasLPs(stats.upcomingLP) ? (
        <LearningPeriodCard title="Upcoming Learning Period" stats={stats.upcomingLP} />
      ) : (
        <LearningPeriodEmptyCard title="Upcoming Learning Period" />
      )}
    </SectionWrapper>
  );
};

export const PageWrapper = ({
  children,
  stats,
}: React.PropsWithChildren<{ stats: DashboardStats }>) => {
  return (
    <div className="dashboard flex justify-center py-6">
      <div className="flex w-fit flex-col items-center gap-10">
        <WelcomeBack academicYear={stats.academicYear} />
        {children}
      </div>
    </div>
  );
};
