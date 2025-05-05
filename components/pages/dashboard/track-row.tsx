import { Card } from "@/components/ui/card";
import { Track } from "@/types";
import { ArrowDown } from "lucide-react";
import type React from "react";

interface TrackRowProps {
  track: string;
  dateRange: string;
  status: string;
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

export const TrackArrow = () => {
  return <ArrowDown className="size-5 text-center justify-self-center" />;
};
