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
        'flex flex-col items-center justify-between h-800:justify-start lg:px-6 px-5 h-800:py-6 py-5 h-800:gap-8 gap-2 h-[18rem] h-800:h-[22.25rem] lg:w-[19.75rem] w-64',
        className
      )}
    >
      <h2 className="font-bold truncate text-base text-left w-full">{title}</h2>
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
