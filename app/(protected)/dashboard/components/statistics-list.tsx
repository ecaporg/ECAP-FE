import React from 'react';
import { Progress } from '../../../../components/ui/progress';

interface StatisticItem {
  label: string;
  percentage: number;
}

interface StatisticsListProps {
  items: StatisticItem[];
}

export const StatisticsList: React.FC<StatisticsListProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="font-medium">{item.label}</span>
          <Progress value={item.percentage} className="w-32" />
          <span className="ml-2 font-bold">{item.percentage}%</span>
        </div>
      ))}
    </div>
  );
};
