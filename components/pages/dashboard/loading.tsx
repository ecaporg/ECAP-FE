import { LearningPeriodCardSkeleton } from "./learning-period-card";
import { ProgressCardSkeleton } from "./progress-card";
import { SectionWrapper } from "./sections";
import { TrackArrow, TrackRowSkeleton } from "./track-row";

export const CurrentLPSectionSkeleton = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <SectionWrapper>
      <SectionWrapper>
        <ProgressCardSkeleton
          className="md:w-[19.75rem]"
          title="Current LP Compliance"
        />
        {children}

        <div className="flex-1">
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

export const LPCardSkeletonSection = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <SectionWrapper>
      {children}
      <LearningPeriodCardSkeleton title="Current Learning Period" />
      <LearningPeriodCardSkeleton title="Upcoming Learning Period" />
    </SectionWrapper>
  );
};
