import { Card } from '@/components/ui/card';
import { LinearProgress, Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import type { AcademyStatItem } from '@/types';
import type React from 'react';

interface StatisticsListProps {
  items: AcademyStatItem[];
}

export const StatisticsList: React.FC<StatisticsListProps> = ({ items }) => {
  return (
    <Card className="flex flex-col items-center justify-center py-4 px-6 gap-6 flex-1">
      {items.map((item) => (
        <div
          key={item.academy_id}
          className="grid grid-rows-2 grid-cols-[120px_minmax(150px,2fr)_200px] gap-y-4 w-full"
        >
          <h3 className="font-bold col-start-1 row-start-1">{item.academy_name}</h3>

          <LinearProgress
            value={Math.round(item.yearToDateCompliance)}
            className="col-start-2 row-start-1 w-full h-6"
          />
          <LinearProgress
            value={Math.round(item.compliance)}
            className="col-start-2 row-start-2 w-full h-6"
          />

          <p className="col-start-3 row-start-1 truncate">
            <b>{item.yearToDateCompliance.toFixed(2)}%</b> (To Date)
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
    <Card className="flex flex-col items-center justify-center py-4 px-6 gap-6 flex-1">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`academy-skeleton-${index}`}
          className="grid grid-rows-2 grid-cols-[120px_minmax(150px,2fr)_200px] gap-y-4 w-full"
        >
          <h3 className="font-bold col-start-1 row-start-1">
            <Skeleton className="w-full h-6" />
          </h3>
          <LinearProgress
            value={20 * index}
            className="col-start-2 row-start-1 w-full h-6 animate-pulse"
          />
          <LinearProgress
            value={20 * index + 5}
            className="col-start-2 row-start-2 w-full h-6 animate-pulse"
          />
          <Skeleton className="col-start-3 row-start-1 h-6" />
          <Skeleton className="col-start-3 row-start-2 h-6" />
        </div>
      ))}
    </Card>
  );
};
