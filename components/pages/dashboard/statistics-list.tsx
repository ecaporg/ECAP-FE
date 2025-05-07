import type React from "react";
import { LinearProgress, Progress } from "@/components/ui/progress";
import type { AcademyStatItem } from "@/types";
import { Card } from "@/components/ui/card";

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
          <h3 className="font-bold col-start-1 row-start-1">
            {item.academy_name}
          </h3>

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
