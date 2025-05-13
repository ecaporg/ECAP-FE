import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsItem, Track } from '@/types';
import {
  formatLearningPeriodDate,
  getDueDate,
  getFormattedLP,
  getLearningPeriodDateRange,
  getLPNameForDashboard,
  getStatusColorForDashboard,
  getStatusForDashboard,
  mergeLearningPeriods,
} from '@/utils';
import { ArrowDown } from 'lucide-react';
import type React from 'react';

interface TrackRowProps {
  track: React.ReactNode;
  dateRange: React.ReactNode;
  status: React.ReactNode;
  statusColor: string;
}

export const TrackRow: React.FC<{
  item: StatsItem;
}> = ({ item }) => {
  const lp = mergeLearningPeriods(item.learningPeriods)[0];
  const status = getStatusForDashboard(item);
  const statusColor = getStatusColorForDashboard(status);
  return (
    <TrackRowView
      track={
        <h2
          dangerouslySetInnerHTML={{
            __html: getLPNameForDashboard(item.learningPeriods),
          }}
        ></h2>
      }
      dateRange={getLearningPeriodDateRange(lp)}
      status={status}
      statusColor={statusColor}
    />
  );
};

export const TrackRowView: React.FC<TrackRowProps> = ({
  track,
  dateRange,
  status,
  statusColor,
}) => {
  return (
    <Card className="p-2 text-lg">
      {track}
      <p className="flex justify-between mt-2">
        {dateRange} <b className={statusColor}>{status}</b>
      </p>
    </Card>
  );
};

export const TrackRowSkeleton = () => {
  return (
    <TrackRowView
      track={<Skeleton className="w-32" />}
      dateRange={<Skeleton className="w-40" />}
      status={<Skeleton className="w-20" />}
      statusColor={'statusColor'}
    />
  );
};

export const TrackArrow = () => {
  return <ArrowDown className="size-5 text-center justify-self-center" />;
};
