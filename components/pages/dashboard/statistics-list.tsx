import { Card } from '@/components/ui/card';
import { LinearProgress, Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import type { AcademyStatItem } from '@/types';
import type React from 'react';

interface StatisticsListProps {
  items: AcademyStatItem[];
}

export const StatisticsList: React.FC<StatisticsListProps> = ({ items }) => {
  if (!items?.length) return null;

  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-4">
      {items.map((item) => (
        <div
          key={item.academy_id}
          className="grid w-full grid-cols-[120px_minmax(150px,2fr)_200px] grid-rows-2 gap-4"
        >
          <h3 className="col-start-1 row-start-1 font-bold">{item.academy_name}</h3>

          <LinearProgress
            value={Math.round(item.yearToDateCompliance)}
            className="col-start-2 row-start-1 h-6 w-full"
          />
          <LinearProgress
            value={Math.round(item.compliance)}
            className="col-start-2 row-start-2 h-6 w-full"
          />

          <p className="col-start-3 row-start-1 truncate">
            <b>{item.yearToDateCompliance?.toFixed(2)}%</b> (To Date)
          </p>
          <p className="col-start-3 row-start-2 truncate">
            <b>{item.compliance.toFixed(2)}%</b> (Current LP)
          </p>
        </div>
      ))}
    </Card>
  );
};

export const StatisticsListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`academy-skeleton-${index}`}
          className="grid w-full grid-cols-[120px_minmax(150px,2fr)_200px] grid-rows-2 gap-4"
        >
          <h3 className="col-start-1 row-start-1 font-bold">
            <Skeleton className="h-6 w-full" />
          </h3>
          <LinearProgress
            value={20 * index}
            className="col-start-2 row-start-1 h-6 w-full animate-pulse"
          />
          <LinearProgress
            value={20 * index + 5}
            className="col-start-2 row-start-2 h-6 w-full animate-pulse"
          />
          <Skeleton className="col-start-3 row-start-1 h-6" />
          <Skeleton className="col-start-3 row-start-2 h-6" />
        </div>
      ))}
    </Card>
  );
};
