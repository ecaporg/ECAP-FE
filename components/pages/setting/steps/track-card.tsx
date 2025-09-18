import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ITrack } from '@/types';
import { cn, formatTrackDateWithLongMonth } from '@/utils';
import { Calendar1, CheckCircle, TriangleAlert } from 'lucide-react';

export const TrackCard = ({
  track,
  children,
  className,
  isCompleted,
}: React.PropsWithChildren<{
  track: ITrack;
  className?: string;
  isCompleted: boolean;
}>) => {
  return (
    <div
      className={cn(
        'p-4 w-80 space-y-5 rounded-sm border-2 border-border',
        isCompleted && 'border-success-foreground',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{track.name}</h3>
        <Badge variant={isCompleted ? 'success' : 'red'} className="gap-1">
          {isCompleted ? <CheckCircle className="size-4" /> : <TriangleAlert className="size-4" />}
          {isCompleted ? 'Completed' : 'Incomplete'}
        </Badge>
      </div>
      <p className="text-base font-semibold">
        {formatTrackDateWithLongMonth(track.start_date)} -{' '}
        {formatTrackDateWithLongMonth(track.end_date)}
      </p>
      {children}
    </div>
  );
};

export const SetupCalendarButton = ({
  onClick,
  isCompleted,
}: {
  onClick: () => void;
  isCompleted: boolean;
}) => {
  return (
    <Button className="w-full" onClick={onClick}>
      <Calendar1 className="size-4 mr-2" />
      {isCompleted ? 'Edit Day Types' : 'Set Up Day Types'}
    </Button>
  );
};

export const SetupLearningPeriodButton = ({
  onClick,
  isCompleted,
}: {
  onClick: () => void;
  isCompleted: boolean;
}) => {
  return (
    <Button className="w-full" onClick={onClick}>
      <Calendar1 className="size-4 mr-2" />
      {isCompleted ? 'Edit Learning Periods' : 'Set Up Learning Periods'}
    </Button>
  );
};

export const SetupSemesterButton = ({
  onClick,
  isCompleted,
}: {
  onClick: () => void;
  isCompleted: boolean;
}) => {
  return (
    <Button className="w-full" onClick={onClick}>
      <Calendar1 className="size-4 mr-2" />
      {isCompleted ? 'Edit Semesters' : 'Set Up Semesters'}
    </Button>
  );
};
