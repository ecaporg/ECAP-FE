import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/utils';
import type React from 'react';

interface ProgressCardProps {
  title: string;
  percentage: number;
  className?: string;
  progressClassName?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  percentage,
  className,
  progressClassName,
}) => {
  return (
    <Card
      className={cn(
        'flex h-auto min-h-fit w-64 flex-col items-center h-800:justify-start gap-4 h-800:gap-8 px-5 h-800:py-6 py-5 lg:w-[19.75rem] lg:px-6',
        className
      )}
    >
      <h2 className="w-full truncate text-left font-bold text-base">{title}</h2>
      <Progress
        value={Number(percentage.toFixed(0))}
        className={cn('size-[12.5rem]', progressClassName)}
      />
    </Card>
  );
};

export const ProgressCardSkeleton = ({
  title,
  className,
}: Pick<ProgressCardProps, 'title' | 'className'>) => {
  return (
    <ProgressCard
      title={title}
      percentage={30}
      className={className}
      progressClassName="animate-spin [&_text]:hidden [&_circle]:animate-pulse"
    />
  );
};
