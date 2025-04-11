import React from 'react';
import { Card } from '../../../../components/ui/card';
import { Progress } from '../../../../components/ui/progress';

interface ProgressCardProps {
  title: string;
  percentage: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ title, percentage }) => {
  return (
    <Card className="flex flex-col items-center justify-center p-4">
      <div className="text-lg font-bold mb-2">{title}</div>
      <Progress value={percentage} className="w-24 h-24" />
      <div className="text-xl font-bold mt-2">{percentage}%</div>
    </Card>
  );
};
