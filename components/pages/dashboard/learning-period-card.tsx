import type React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

export const LearningPeriodCard: React.FC<LearningPeriodCardProps> = ({
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
    <LearningPeriodCard
      title={title}
      track={<Skeleton className="w-full" />}
      fields={fields.map((field) => ({ ...field, skeleton: true, value: "" }))}
    />
  );
};
