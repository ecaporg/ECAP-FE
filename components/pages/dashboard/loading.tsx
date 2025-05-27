import { Skeleton } from '@/components/ui/skeleton';
import { LearningPeriodCardSkeleton } from './learning-period-card';
import { ProgressCardSkeleton } from './progress-card';
import { SectionWrapper } from './sections';
import { TrackArrow, TrackRowSkeleton } from './track-row';

export const CurrentLPSectionSkeleton = ({ children }: React.PropsWithChildren) => {
  return (
    <SectionWrapper>
      <SectionWrapper>
        <ProgressCardSkeleton title="Current LP Compliance" />
        {children}

        <div className="flex-1 sm:w-[25rem]">
          <TrackRowSkeleton />
          <TrackArrow />
          <TrackRowSkeleton />
          <TrackArrow />
          <TrackRowSkeleton />
          <TrackArrow />
          <TrackRowSkeleton />
        </div>
      </SectionWrapper>
    </SectionWrapper>
  );
};

export const LPCardSkeletonSection = ({ children }: React.PropsWithChildren) => {
  return (
    <SectionWrapper>
      {children}
      <LearningPeriodCardSkeleton title="Current Learning Period" />
      <LearningPeriodCardSkeleton title="Upcoming Learning Period" />
    </SectionWrapper>
  );
};

export const PageLoadingWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="dashboard py-14 px-12 flex gap-10 flex-col items-center ">
      <section className="text-2xl font-bold flex w-full py-4 px-6">
        <p>Welcome back</p>
        <span className="ml-auto ">
          Academic Year: <Skeleton className="w-20 inline-block" />
        </span>
      </section>
      <div className="grid grid-cols-1 gap-10">{children}</div>
    </div>
  );
};
