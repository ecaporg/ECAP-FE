import React from 'react';

interface TrackRowProps {
  track: string;
  dateRange: string;
  status: string;
  statusColor: string;
}

export const TrackRow: React.FC<TrackRowProps> = ({ track, dateRange, status, statusColor }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex flex-col">
        <span className="font-bold">{track}</span>
        <span className="text-sm text-gray-500">{dateRange}</span>
      </div>
      <span className={`text-sm font-bold ${statusColor}`}>{status}</span>
    </div>
  );
};
