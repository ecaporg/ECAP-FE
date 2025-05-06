import type React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsItem } from "@/types";
import {
  formatLearningPeriodDate,
  getDueDate,
  getLearningPeriodDateRange,
  getStatusColorForDashboard,
  getStatusForDashboard,
  mergeLearningPeriods,
} from "@/utils";

interface LearningPeriodCardProps {
  title: React.ReactNode;
  track: React.ReactNode;
  fields?: {
    label: string;
    value: string;
    className?: string;
    skeleton?: boolean;
  }[];
}

export const LearningPeriodCard = ({
  title,
  stats,
  isCurrentLP = false,
}: {
  title: string;
  stats: StatsItem;
  isCurrentLP?: boolean;
}) => {
  const lp = mergeLearningPeriods(stats.learningPeriods)[0];
  const status = getStatusForDashboard(stats);
  const statusColor = getStatusColorForDashboard(status);
  return (
    <LearningPeriodCardView
      title={title}
      track={lp.name}
      fields={[
        { label: "Date:", value: getLearningPeriodDateRange(lp) },
        {
          label: isCurrentLP ? "Deadline:" : "Due:",
          value: formatLearningPeriodDate(getDueDate(lp)),
        },
        { label: "Status:", value: status, className: statusColor },
        {
          label: "Compliance:",
          value: `${stats.compliance.toFixed(2)}%`,
          className: statusColor,
        },
      ]}
    />
  );
};

export const LearningPeriodCardView: React.FC<LearningPeriodCardProps> = ({
  title,
  track,
  fields = [],
}) => {
  return (
    <Card className="p-2 pb-8">
      <h2 className="p-2 font-bold">{title}</h2>
      <form className="p-2 space-y-4 mt-10">
        <h3>{track}</h3>

        {fields.map((field) => (
          <div
            key={field.label + field.value}
            className="flex items-center justify-between"
          >
            <label htmlFor={field.label} className="font-bold">
              {field.label}
            </label>
            {field.skeleton ? (
              <Skeleton className="w-20" />
            ) : (
              <input
                type="text"
                readOnly
                id={field.label}
                value={field.value}
                className={`outline-none text-end ${field.className}`}
              />
            )}
          </div>
        ))}
      </form>
    </Card>
  );
};

export const LearningPeriodCardSkeleton = ({
  title,
  fields = [
    { label: "Date:" },
    { label: "Deadline:" },
    { label: "Status:" },
    { label: "Compliance:" },
  ] as any,
}: Pick<LearningPeriodCardProps, "title" | "fields">) => {
  return (
    <LearningPeriodCardView
      title={title}
      track={<Skeleton className="w-full" />}
      fields={fields.map((field) => ({ ...field, skeleton: true, value: "" }))}
    />
  );
};
