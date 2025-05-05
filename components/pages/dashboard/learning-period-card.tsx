import type React from "react";
import { Card } from "@/components/ui/card";

interface LearningPeriodCardProps {
  title: string;
  track: string;
  fields: {
    label: string;
    value: string;
    className?: string;
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
            <input
              type="text"
              readOnly
              id={field.label}
              value={field.value}
              className={`outline-none text-end ${field.className}`}
            />
          </div>
        ))}
      </form>
    </Card>
  );
};
