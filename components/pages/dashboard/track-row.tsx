import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { routes } from "@/constants/routes";
import { StatsItem } from "@/types";
import {
  formatLearningPeriodDate,
  getCardColorForDashboard,
  getDueDate,
  getFormattedLP,
  getLearningPeriodDateRange,
  getLPNameForDashboard,
  getStatusColorForDashboard,
  getStatusForDashboard,
  mergeLearningPeriods,
} from "@/utils";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import type React from "react";

interface TrackRowProps {
  track: React.ReactNode;
  dateRange: React.ReactNode;
  status: React.ReactNode;
  statusColor: string;
  cardColor?: string;
  href?: string;
}

export const TrackRow: React.FC<{
  item: StatsItem;
}> = ({ item }) => {
  const lp = mergeLearningPeriods(item.learningPeriods)[0];
  const status = getStatusForDashboard(item);
  const statusColor = getStatusColorForDashboard(status);
  const cardColor = getCardColorForDashboard(status);

  return (
    <TrackRowView
      track={
        <h2
          dangerouslySetInnerHTML={{
            __html: getLPNameForDashboard(item.learningPeriods),
          }}
        ></h2>
      }
      dateRange={getLearningPeriodDateRange(lp)}
      status={status}
      statusColor={statusColor}
      cardColor={cardColor}
      href={
        routes.compliance.root +
        `?${DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID}=${lp?.id}`
      }
    />
  );
};

export const TrackRowView: React.FC<TrackRowProps> = ({
  track,
  dateRange,
  status,
  statusColor,
  cardColor = "",
  href = "#",
}) => {
  return (
    <Link href={href}>
      <Card
        className={`h-800:p-2 p-1.5 h-800:text-lg lg:text-lg text-sm h-800:h-[4.625rem] ${cardColor}`}
      >
        {track}
        <p className="flex justify-between h-800:mt-2 mt-1">
          {dateRange} <b className={statusColor}>{status}</b>
        </p>
      </Card>
    </Link>
  );
};

export const TrackRowSkeleton = () => {
  return (
    <TrackRowView
      track={<Skeleton className="w-32" />}
      dateRange={<Skeleton className="w-40" />}
      status={<Skeleton className="w-20" />}
      statusColor={"statusColor"}
    />
  );
};

export const TrackArrow = () => {
  return (
    <ArrowDown className="h-800:size-5 size-4 text-center justify-self-center" />
  );
};
