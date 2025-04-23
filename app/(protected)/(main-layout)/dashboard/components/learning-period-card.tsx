import type React from 'react';
import { Card } from '../../../../../components/ui/card';

interface LearningPeriodCardProps {
  track: string;
  date: string;
  deadline: string;
  status: string;
  compliance: number;
}

export const LearningPeriodCard: React.FC<LearningPeriodCardProps> = ({
  track,
  date,
  deadline,
  status,
  compliance,
}) => {
  return (
    <Card className="p-4">
      <div className="font-bold text-lg mb-2">{track}</div>
      <div className="text-sm text-gray-500 mb-1">Date: {date}</div>
      <div className="text-sm text-gray-500 mb-1">Deadline: {deadline}</div>
      <div className="text-sm mb-1">
        Status: <span className="font-bold">{status}</span>
      </div>
      <div className="text-sm">
        Compliance: <span className="font-bold">{compliance}%</span>
      </div>
    </Card>
  );
};
