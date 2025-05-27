import type { DashboardStats, TrackLearningPeriod, User } from '@/types';
import { cn } from '@/utils';
import { LearningPeriodCard } from './learning-period-card';
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
        'flex lg:gap-10 gap-9 flex-wrap justify-center lg:min-w-[47.75rem] md:min-w-[43rem] w-full',
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
      <ProgressCard title="Current LP Compliance" percentage={stats.currentLP.compliance} />
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
    <SectionWrapper className="items-center">
      {children}
      {hasLPs(stats.currentLP) && (
        <LearningPeriodCard
          title="Current Learning Period"
          stats={stats.currentLP}
          isCurrentLP={true}
        />
      )}
      {hasLPs(stats.upcomingLP) && (
        <LearningPeriodCard title="Upcoming Learning Period" stats={stats.upcomingLP} />
      )}
    </SectionWrapper>
  );
};

export const PageWrapper = ({
  children,
  user,
  stats,
}: React.PropsWithChildren<{ user: User; stats: DashboardStats }>) => {
  return (
    <div className="dashboard py-6 px-12 flex justify-center">
      <div className="flex w-fit gap-10 flex-col items-center">
        <WelcomeBack user={user!} academicYear={stats.academicYear} />
        {children}
      </div>
    </div>
  );
};
