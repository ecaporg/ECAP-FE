import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Track } from "@/types";
import { ArrowDown } from "lucide-react";
import type React from "react";

interface TrackRowProps {
  track: React.ReactNode;
  dateRange: React.ReactNode;
  status: React.ReactNode;
  statusColor: string;
}

// export const TrackRow: React.FC<{
//   tracks: Track[];
// }> = ({ tracks }) => {
//   // add trnsform logic here

//   return (
//     <TrackRowView
//       track={""}
//       dateRange={""}
//       status={""}
//       statusColor={"statusColor"}
//     />
//   );
// };

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  dateRange,
  status,
  statusColor,
}) => {
  return (
    <Card className="p-2 text-lg">
      <h2 className="font-bold">{track}</h2>
      <p className="flex justify-between mt-2">
        {dateRange} <b className={statusColor}>{status}</b>
      </p>
    </Card>
  );
};

export const TrackRowSkeleton = () => {
  return (
    <TrackRow
      track={<Skeleton className="w-32" />}
      dateRange={<Skeleton className="w-40" />}
      status={<Skeleton className="w-20" />}
      statusColor={"statusColor"}
    />
  );
};

export const TrackArrow = () => {
  return <ArrowDown className="size-5 text-center justify-self-center" />;
};
